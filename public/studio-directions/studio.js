(() => {
  const stage = document.querySelector('.stage')
  const scenes = Array.from(stage.children)
  const modes = { atelier:'omega', notes:'frank', sound:'music' }
  const controls = Array.from(document.querySelectorAll('[data-go]'))
  const directionControls = Array.from(document.querySelectorAll('button[data-mode]'))
  const prev = document.querySelector('#prev')
  const next = document.querySelector('#next')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  let active = 0
  let frame = 0
  let animation
  function select(index, animate) {
    const scene = scenes[index]
    if (!scene) return
    const changed = active !== index
    active = index
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.go === scene.dataset.id)))
    scenes.forEach(item => item.inert = item !== scene)
    prev.disabled = index === 0
    next.disabled = index === scenes.length - 1
    if (changed) document.querySelector('#announcement').textContent = scene.getAttribute('aria-label') + ', chapter ' + (index + 1) + ' of ' + scenes.length
    if (!changed || !animate || reduced.matches || !window.gsap) return
    animation?.revert()
    animation = window.gsap.context(() => {
      const tl = window.gsap.timeline({ defaults:{ ease:'power3.out', clearProps:'transform,opacity' } })
      tl.from(scene.querySelector('.art img'), {scale:1.035,duration:.64})
        .from(scene.querySelector('h2'), {y:10,opacity:.7,duration:.36},.04)
        .from(scene.querySelector('.dek'), {y:6,duration:.28},.12)
    }, scene)
  }
  function go(index, smooth=true) {
    if (!scenes[index]) return
    stage.scrollTo({left:scenes[index].offsetLeft - scenes[0].offsetLeft, behavior:smooth && !reduced.matches ? 'smooth':'instant'})
    if (!smooth || reduced.matches) select(index,false)
  }
  function sync() {
    frame = 0
    const left = stage.getBoundingClientRect().left
    let nearest = 0
    scenes.forEach((scene,i) => {
      if (Math.abs(scene.getBoundingClientRect().left-left) < Math.abs(scenes[nearest].getBoundingClientRect().left-left)) nearest = i
    })
    select(nearest,true)
  }
  stage.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(sync) }, {passive:true})
  prev.addEventListener('click', () => go(active-1))
  next.addEventListener('click', () => go(active+1))
  controls.forEach(button => button.addEventListener('click', () => go(scenes.findIndex(s => s.dataset.id === button.dataset.go))))
  function setMode(mode) {
    if (!Object.hasOwn(modes,mode)) return
    animation?.revert()
    document.body.dataset.mode = mode
    directionControls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)))
    go(scenes.findIndex(s => s.dataset.id === modes[mode]),false)
  }
  directionControls.forEach(button => button.addEventListener('click', () => {
    setMode(button.dataset.mode)
    history.replaceState(null,'','#'+button.dataset.mode)
  }))
  stage.addEventListener('keydown', e => {
    const dest = {ArrowLeft:active-1, ArrowRight:active+1, Home:0, End:scenes.length-1}[e.key]
    if (dest === undefined) return
    e.preventDefault()
    stage.focus({preventScroll:true})
    go(dest)
  })
  reduced.addEventListener('change',() => animation?.revert())
  new ResizeObserver(() => go(active,false)).observe(stage)
  setMode(Object.hasOwn(modes,location.hash.slice(1)) ? location.hash.slice(1) : 'atelier')
})()
