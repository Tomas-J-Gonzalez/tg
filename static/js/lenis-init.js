document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function init() {
    if (typeof window.Lenis !== 'function') return;
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 2), // easeOutQuad
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
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


