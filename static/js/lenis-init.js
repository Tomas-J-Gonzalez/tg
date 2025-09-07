document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ENABLE_LENIS = false;
  if (!ENABLE_LENIS) return;

  function init() {
    if (typeof window.Lenis !== 'function') return;
    const lenis = new Lenis({
      // Subtle smoothing via lerp; higher is snappier/closer to native
      lerp: 0.2,
      smoothWheel: true,
      normalizeWheel: true,
      gestureDirection: 'vertical',
      // Smooth, non-inertial touch scrolling
      syncTouch: true,
      syncTouchLerp: 0.2,
      touchInertiaMultiplier: 0,
      wheelMultiplier: 1,
      touchMultiplier: 1
    });
    if (console && console.info) console.info('[lenis] initialized');
    if (typeof lenis.start === 'function') lenis.start();

    const root = document.documentElement;
    root.classList.add('lenis', 'lenis-smooth');
    let timer;
    lenis.on('scroll', () => {
      root.classList.add('lenis-scrolling');
      clearTimeout(timer);
      timer = setTimeout(() => root.classList.remove('lenis-scrolling'), 120);
    });

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  if (typeof window.Lenis === 'function') { init(); }
});


