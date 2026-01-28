(() => {
  const hero = document.getElementById("hero");
  const img = document.getElementById("heroImg");

  if (!hero || !img) return;

  // smooth animation state
  let current = 0;   // eased progress
  let target = 0;    // raw progress

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  function computeTarget() {
    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    // progress when hero moves through viewport
    // start: hero top at 0, end: hero bottom at 0
    const total = rect.height;
    const passed = -rect.top; // how much we scrolled into hero
    const p = clamp01(passed / (total - vh * 0.35)); // tweak feel here

    target = p;
  }

  function render() {
    // easing (higher = snappier, lower = smoother)
    current = lerp(current, target, 0.08);

    // Motion mapping (Apple-ish: big -> slightly smaller, tiny lift)
    const scale = lerp(1.08, 0.92, current);
    const y = lerp(0, -26, current);

    // Micro blur at the start (makes the “settling” feel premium)
    const blur = lerp(0, 0.6, Math.max(0, current - 0.85) / 0.15);

    // Copy gently fades a bit as you leave hero
    const copyA = lerp(1, 0.2, Math.max(0, current - 0.55) / 0.45);

    // write CSS vars
    document.documentElement.style.setProperty("--p", current.toFixed(4));
    document.documentElement.style.setProperty("--scale", scale.toFixed(4));
    document.documentElement.style.setProperty("--y", `${y.toFixed(2)}px`);
    document.documentElement.style.setProperty("--blur", `${blur.toFixed(2)}px`);
    document.documentElement.style.setProperty("--copyA", copyA.toFixed(3));

    requestAnimationFrame(render);
  }

  // init
  computeTarget();
  window.addEventListener("scroll", computeTarget, { passive: true });
  window.addEventListener("resize", computeTarget);

  requestAnimationFrame(render);
})();
