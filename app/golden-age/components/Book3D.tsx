'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Seeded random for deterministic particles
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Premium floating particles with depth
function Particles({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        position: [
          (seededRandom(i * 3) - 0.5) * 10,
          (seededRandom(i * 3 + 1) - 0.5) * 8,
          (seededRandom(i * 3 + 2) - 0.5) * 6 - 2,
        ],
        speed: seededRandom(i * 7) * 0.3 + 0.15,
        offset: seededRandom(i * 11) * Math.PI * 2,
        scale: seededRandom(i * 13) * 0.03 + 0.015,
      })),
    [count]
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      const t = clock.elapsedTime * particle.speed + particle.offset;
      dummy.position.set(
        particle.position[0] + Math.sin(t) * 0.4,
        particle.position[1] + Math.cos(t * 0.7) * 0.5,
        particle.position[2] + Math.sin(t * 0.5) * 0.3
      );
      dummy.scale.setScalar(particle.scale + Math.sin(t * 2) * 0.005);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color="#fbbf24" transparent opacity={0.5} />
    </instancedMesh>
  );
}

// Premium leather-bound book
function PremiumBook() {
  const groupRef = useRef<THREE.Group>(null);

  // Book dimensions
  const width = 2.4;
  const height = 3.4;
  const depth = 0.4;
  const spineWidth = 0.15;
  const pageDepth = depth - 0.12;

  // Leather brown gradient colors
  const coverColor = new THREE.Color('#8B4513');
  const spineDarkColor = new THREE.Color('#5D3A1A');
  const goldColor = new THREE.Color('#D4AF37');
  const pageColor = new THREE.Color('#FFF8E7');

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    // Subtle rotation based on mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.25 + Math.sin(clock.elapsedTime * 0.4) * 0.08,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.08 + 0.05,
      0.04
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Book spine - curved */}
        <mesh position={[-width / 2 + spineWidth / 2, 0, 0]}>
          <cylinderGeometry args={[spineWidth, spineWidth, height, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial
            color={spineDarkColor}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>

        {/* Front cover */}
        <mesh position={[0, 0, depth / 2 - 0.03]}>
          <RoundedBox args={[width, height, 0.06]} radius={0.02} smoothness={4}>
            <meshStandardMaterial
              color={coverColor}
              roughness={0.55}
              metalness={0.15}
            />
          </RoundedBox>
        </mesh>

        {/* Back cover */}
        <mesh position={[0, 0, -depth / 2 + 0.03]}>
          <RoundedBox args={[width, height, 0.06]} radius={0.02} smoothness={4}>
            <meshStandardMaterial
              color={coverColor}
              roughness={0.55}
              metalness={0.15}
            />
          </RoundedBox>
        </mesh>

        {/* Pages block */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[width - 0.2, height - 0.1, pageDepth]} />
          <meshStandardMaterial
            color={pageColor}
            roughness={0.9}
            metalness={0}
          />
        </mesh>

        {/* Page edges - gilded effect */}
        <mesh position={[width / 2 - 0.08, 0, 0]}>
          <boxGeometry args={[0.02, height - 0.12, pageDepth + 0.01]} />
          <meshStandardMaterial
            color={goldColor}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Gold embossed border - top */}
        <mesh position={[0, height / 2 - 0.15, depth / 2 - 0.02]}>
          <boxGeometry args={[width - 0.3, 0.03, 0.01]} />
          <meshStandardMaterial
            color={goldColor}
            roughness={0.25}
            metalness={0.85}
            emissive={goldColor}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Gold embossed border - bottom */}
        <mesh position={[0, -height / 2 + 0.15, depth / 2 - 0.02]}>
          <boxGeometry args={[width - 0.3, 0.03, 0.01]} />
          <meshStandardMaterial
            color={goldColor}
            roughness={0.25}
            metalness={0.85}
            emissive={goldColor}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Gold embossed border - left */}
        <mesh position={[-width / 2 + 0.2, 0, depth / 2 - 0.02]}>
          <boxGeometry args={[0.03, height - 0.35, 0.01]} />
          <meshStandardMaterial
            color={goldColor}
            roughness={0.25}
            metalness={0.85}
            emissive={goldColor}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Gold embossed border - right */}
        <mesh position={[width / 2 - 0.2, 0, depth / 2 - 0.02]}>
          <boxGeometry args={[0.03, height - 0.35, 0.01]} />
          <meshStandardMaterial
            color={goldColor}
            roughness={0.25}
            metalness={0.85}
            emissive={goldColor}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Center emblem - decorative circle */}
        <mesh position={[0, 0.3, depth / 2 - 0.01]}>
          <ringGeometry args={[0.35, 0.42, 48]} />
          <meshStandardMaterial
            color={goldColor}
            roughness={0.2}
            metalness={0.9}
            side={THREE.DoubleSide}
            emissive={goldColor}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Inner circle accent */}
        <mesh position={[0, 0.3, depth / 2 - 0.01]}>
          <ringGeometry args={[0.15, 0.22, 32]} />
          <meshStandardMaterial
            color={goldColor}
            roughness={0.2}
            metalness={0.9}
            side={THREE.DoubleSide}
            emissive={goldColor}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Star/sparkle in center */}
        <mesh position={[0, 0.3, depth / 2]}>
          <circleGeometry args={[0.08, 6]} />
          <meshStandardMaterial
            color={goldColor}
            roughness={0.15}
            metalness={0.95}
            emissive={goldColor}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Title area - slightly raised */}
        <mesh position={[0, -0.6, depth / 2 - 0.015]}>
          <boxGeometry args={[1.6, 0.08, 0.01]} />
          <meshStandardMaterial
            color={goldColor}
            roughness={0.25}
            metalness={0.85}
            emissive={goldColor}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Spine decorative lines */}
        {[-0.9, -0.3, 0.3, 0.9].map((yPos, i) => (
          <mesh key={i} position={[-width / 2 + 0.02, yPos, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[depth * 0.6, 0.02, 0.02]} />
            <meshStandardMaterial
              color={goldColor}
              roughness={0.25}
              metalness={0.85}
              emissive={goldColor}
              emissiveIntensity={0.12}
            />
          </mesh>
        ))}

        {/* Corner accents - decorative corners */}
        {[
          { x: -width / 2 + 0.25, y: height / 2 - 0.2 },
          { x: width / 2 - 0.25, y: height / 2 - 0.2 },
          { x: -width / 2 + 0.25, y: -height / 2 + 0.2 },
          { x: width / 2 - 0.25, y: -height / 2 + 0.2 },
        ].map((pos, i) => (
          <mesh key={i} position={[pos.x, pos.y, depth / 2 - 0.01]}>
            <circleGeometry args={[0.06, 6]} />
            <meshStandardMaterial
              color={goldColor}
              roughness={0.2}
              metalness={0.9}
              emissive={goldColor}
              emissiveIntensity={0.15}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Ambient glow behind the book
function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const scale = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.08;
    meshRef.current.scale.set(scale, scale, 1);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <circleGeometry args={[3.5, 64]} />
      <meshBasicMaterial
        color="#f59e0b"
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

// Secondary glow ring
function GlowRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = clock.elapsedTime * 0.1;
    const scale = 1 + Math.sin(clock.elapsedTime * 0.3) * 0.05;
    meshRef.current.scale.set(scale, scale, 1);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2.5]}>
      <ringGeometry args={[2.8, 3.2, 64]} />
      <meshBasicMaterial
        color="#fbbf24"
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

// Loading fallback
function BookFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-36 h-52 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 rounded-lg shadow-2xl transform rotate-2">
          <div className="absolute inset-2 border border-amber-500/30 rounded" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-amber-400/40 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-amber-400/30 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        <div className="absolute -inset-12 bg-amber-500/15 rounded-full blur-3xl -z-10 animate-pulse" />
      </div>
    </div>
  );
}

// Main Book3D component
export default function Book3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] book-glow-effect">
      <Suspense fallback={<BookFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Lighting setup for premium look */}
          <ambientLight intensity={0.5} />

          {/* Key light - warm, from top-right */}
          <directionalLight
            position={[4, 5, 4]}
            intensity={1.2}
            color="#fff7ed"
          />

          {/* Fill light - soft, from left */}
          <directionalLight
            position={[-4, 2, 3]}
            intensity={0.6}
            color="#fef3c7"
          />

          {/* Rim light - accent from behind */}
          <pointLight
            position={[0, 0, -4]}
            intensity={1}
            color="#fbbf24"
          />

          {/* Bottom fill - subtle */}
          <pointLight
            position={[0, -4, 2]}
            intensity={0.4}
            color="#ea580c"
          />

          {/* Environment for realistic reflections */}
          <Environment preset="studio" />

          {/* Scene elements */}
          <AmbientGlow />
          <GlowRing />
          <PremiumBook />
          <Particles count={50} />
        </Canvas>
      </Suspense>
    </div>
  );
}
