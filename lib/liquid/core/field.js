import {
  createFrameGovernor,
  devicePixelRatioCap,
  isCompactViewport,
  resolveTier,
} from './env.js';

const VERTEX = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

/**
 * Blobs are combined with a polynomial smooth-min so they fuse into one body
 * of liquid instead of reading as N overlapping circles. Everything downstream
 * (rim light, tint, grain) keys off that single merged distance field.
 */
const FRAGMENT = `#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_pointer;
uniform float u_pointerForce;
uniform float u_scroll;
uniform int   u_count;
uniform vec3  u_blobs[10];      // xy = centre (uv space), z = radius
uniform vec3  u_tintA;
uniform vec3  u_tintB;
uniform vec3  u_tintC;
uniform float u_intensity;
uniform float u_grain;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float fieldAt(vec2 p) {
  float d = 1e5;
  for (int i = 0; i < 10; i++) {
    if (i >= u_count) break;
    vec3 blob = u_blobs[i];
    float wobble = 0.035 * sin(u_time * 0.35 + float(i) * 1.7)
                 + 0.022 * cos(u_time * 0.21 + float(i) * 2.9);
    d = smin(d, length(p - blob.xy) - (blob.z + wobble), 0.28);
  }
  vec2 toPointer = p - u_pointer;
  float pointerBlob = length(toPointer) - (0.10 + 0.05 * u_pointerForce);
  d = smin(d, pointerBlob, 0.30);
  return d;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;
  p.y += u_scroll * 0.12;

  float d = fieldAt(p);

  // Body: soft interior falloff, never a hard edge.
  float body = smoothstep(0.14, -0.06, d);

  // Rim: the thin bright meniscus that sells "liquid" over "gradient blob".
  float rim = smoothstep(0.055, 0.0, abs(d + 0.012)) * 0.9;

  // Cheap surface normal from the distance field, used for a directional sheen.
  vec2 e = vec2(1.6 / u_res.y, 0.0);
  vec2 grad = vec2(
    fieldAt(p + e.xy) - fieldAt(p - e.xy),
    fieldAt(p + e.yx) - fieldAt(p - e.yx)
  );
  vec3 n = normalize(vec3(grad, 0.10));
  float sheen = pow(max(dot(n, normalize(vec3(0.4, 0.8, 0.45))), 0.0), 3.0);

  float depth = clamp(0.5 - d * 1.4, 0.0, 1.0);
  vec3 tint = mix(u_tintA, u_tintB, depth);
  tint = mix(tint, u_tintC, clamp(uv.y * 0.85 + sheen * 0.4, 0.0, 1.0));

  vec3 color = tint * (0.45 + 0.55 * depth);
  color += tint * sheen * 0.55;
  color += vec3(rim) * mix(tint, vec3(1.0), 0.55) * 0.8;

  float alpha = clamp(body * 0.82 + rim * 0.5, 0.0, 1.0) * u_intensity;

  // Grain keeps large flat gradients from banding on wide dark surfaces.
  float g = (hash(gl_FragCoord.xy + u_time) - 0.5) * u_grain;
  color += g;
  alpha += g * 0.35;

  outColor = vec4(color, clamp(alpha, 0.0, 1.0));
}`;

const DEFAULT_TINTS = ['#ab47c7', '#43bfe3', '#10b981'];

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const int = Number.parseInt(full, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`liquid-field shader: ${log}`);
  }
  return shader;
}

function seedBlobs(count) {
  return Array.from({ length: count }, (_, i) => {
    const golden = i * 2.399963;
    return {
      x: 0.5 + Math.cos(golden) * (0.16 + (i % 3) * 0.07),
      y: 0.45 + Math.sin(golden) * (0.14 + (i % 4) * 0.06),
      r: 0.10 + ((i * 37) % 11) / 130,
      driftX: (Math.cos(golden * 1.7) * 0.5 + 0.5) * 0.018 + 0.006,
      driftY: (Math.sin(golden * 2.3) * 0.5 + 0.5) * 0.014 + 0.005,
      phase: golden,
    };
  });
}

/**
 * Ambient liquid metaball field. Mounts a canvas into `host`, paints behind
 * content, and gets out of the way the moment it is offscreen, hidden,
 * over budget, or unwanted.
 *
 * Returns a handle: { destroy, pause, resume, tier }.
 */
export function createLiquidField(host, options = {}) {
  if (!host || typeof window === 'undefined') return { destroy() {}, pause() {}, resume() {}, tier: 'static' };

  const {
    tints = DEFAULT_TINTS,
    intensity = 0.55,
    grain = 0.012,
    blobCount,
    pointer = true,
    scrollResponse = true,
    className = 'liquid-field__canvas',
  } = options;

  let tier = resolveTier();
  const compact = isCompactViewport();
  const count = Math.min(10, blobCount ?? (compact ? 4 : tier === 'full' ? 7 : 4));

  const canvas = document.createElement('canvas');
  canvas.className = className;
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);

  const gl = tier === 'lite' ? null : canvas.getContext('webgl2', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
    premultipliedAlpha: false,
  });

  if (!gl) {
    // No WebGL, or the tier never earned it: hand the surface to CSS.
    canvas.remove();
    host.dataset.liquidTier = tier === 'full' ? 'lite' : tier;
    return { destroy() { delete host.dataset.liquidTier; }, pause() {}, resume() {}, tier: 'lite' };
  }

  host.dataset.liquidTier = tier;

  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? 'link failed');
    }
  } catch (error) {
    canvas.remove();
    host.dataset.liquidTier = 'lite';
    console.warn('[starlight-liquid]', error);
    return { destroy() { delete host.dataset.liquidTier; }, pause() {}, resume() {}, tier: 'lite' };
  }

  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(program, 'a_pos');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const u = Object.fromEntries(
    ['u_res', 'u_time', 'u_pointer', 'u_pointerForce', 'u_scroll', 'u_count', 'u_blobs', 'u_tintA', 'u_tintB', 'u_tintC', 'u_intensity', 'u_grain'].map(
      (name) => [name, gl.getUniformLocation(program, name)]
    )
  );

  const [tintA, tintB, tintC] = [0, 1, 2].map((i) => hexToRgb(tints[i] ?? DEFAULT_TINTS[i]));
  gl.uniform3fv(u.u_tintA, tintA);
  gl.uniform3fv(u.u_tintB, tintB);
  gl.uniform3fv(u.u_tintC, tintC);
  gl.uniform1i(u.u_count, count);
  gl.uniform1f(u.u_intensity, intensity);
  gl.uniform1f(u.u_grain, grain);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const blobs = seedBlobs(count);
  const flat = new Float32Array(count * 3);

  const pointerState = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, force: 0, tforce: 0 };
  let scroll = 0;
  let scrollTarget = 0;
  let raf = 0;
  let running = false;
  let visible = true;
  let lastFrame = 0;
  let elapsed = 0;

  const governor = createFrameGovernor({
    onBreach: () => {
      // Sustained overrun: freeze on the current frame rather than jank the page.
      stop();
      host.dataset.liquidTier = 'lite';
    },
  });

  function resize() {
    const dpr = devicePixelRatioCap(tier);
    const rect = host.getBoundingClientRect();
    // Pre-layout measurements lock in a degenerate buffer that only a later
    // resize can undo; skip them and let the observer call back.
    if (rect.width < 2 || rect.height < 2) return;
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u.u_res, w, h);
  }

  function draw(now) {
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0.016;
    const frameMs = lastFrame ? now - lastFrame : 16;
    lastFrame = now;
    elapsed += dt;

    if (governor(frameMs)) return;

    pointerState.x += (pointerState.tx - pointerState.x) * 0.08;
    pointerState.y += (pointerState.ty - pointerState.y) * 0.08;
    pointerState.force += (pointerState.tforce - pointerState.force) * 0.06;
    scroll += (scrollTarget - scroll) * 0.06;

    const aspect = canvas.width / canvas.height;
    for (let i = 0; i < count; i += 1) {
      const b = blobs[i];
      flat[i * 3] = (b.x + Math.sin(elapsed * b.driftX * 9 + b.phase) * 0.09) * aspect;
      flat[i * 3 + 1] = b.y + Math.cos(elapsed * b.driftY * 9 + b.phase * 1.3) * 0.07;
      flat[i * 3 + 2] = b.r;
    }

    gl.uniform3fv(u.u_blobs, flat);
    gl.uniform1f(u.u_time, elapsed);
    gl.uniform2f(u.u_pointer, pointerState.x * aspect, pointerState.y);
    gl.uniform1f(u.u_pointerForce, pointerState.force);
    gl.uniform1f(u.u_scroll, scroll);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (running) raf = requestAnimationFrame(draw);
  }

  function renderStill() {
    resize();
    lastFrame = 0;
    elapsed = 4.2; // an arbitrary but composed moment in the loop
    draw(performance.now());
  }

  function start() {
    if (running || !visible || tier === 'static') return;
    running = true;
    lastFrame = 0;
    raf = requestAnimationFrame(draw);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  const onPointerMove = (event) => {
    const rect = host.getBoundingClientRect();
    pointerState.tx = (event.clientX - rect.left) / rect.width;
    pointerState.ty = 1 - (event.clientY - rect.top) / rect.height;
    pointerState.tforce = 1;
  };
  const onPointerLeave = () => {
    pointerState.tforce = 0;
  };
  const onScroll = () => {
    const rect = host.getBoundingClientRect();
    scrollTarget = -rect.top / Math.max(window.innerHeight, 1);
  };
  const onVisibility = () => {
    if (document.hidden) stop();
    else start();
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (!running) renderStill();
  });
  resizeObserver.observe(host);

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    },
    { rootMargin: '120px' }
  );
  intersectionObserver.observe(host);

  if (pointer) {
    host.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onPointerLeave, { passive: true });
  }
  if (scrollResponse) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  document.addEventListener('visibilitychange', onVisibility);

  renderStill();
  if (tier !== 'static') start();

  return {
    tier,
    pause: stop,
    resume: start,
    destroy() {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      canvas.remove();
      delete host.dataset.liquidTier;
    },
  };
}
