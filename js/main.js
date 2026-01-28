(() => {
  const hero = document.getElementById("hero");
  const img = document.getElementById("heroImg");

  if (!hero || !img) {
    console.warn("Hero elements not found. Check id='hero' and id='heroImg'.");
    return;
  }

  let current = 0;
  let target = 0;

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  function computeTarget() {
    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const total = rect.height;
    const passed = -rect.top;

    const denom = (total - vh * 0.35);
    const p = denom <= 0 ? 0 : clamp01(passed / denom);

    target = p;
  }

  function render() {
    current = lerp(current, target, 0.08);

    const scale = lerp(1.08, 0.92, current);
    const y = lerp(0, -26, current);
    const blur = lerp(0, 0.6, Math.max(0, current - 0.85) / 0.15);
    const copyA = lerp(1, 0.2, Math.max(0, current - 0.55) / 0.45);

    document.documentElement.style.setProperty("--p", current.toFixed(4));
    document.documentElement.style.setProperty("--scale", scale.toFixed(4));
    document.documentElement.style.setProperty("--y", `${y.toFixed(2)}px`);
    document.documentElement.style.setProperty("--blur", `${blur.toFixed(2)}px`);
    document.documentElement.style.setProperty("--copyA", copyA.toFixed(3));

    requestAnimationFrame(render);
  }

  computeTarget();
  window.addEventListener("scroll", computeTarget, { passive: true });
  window.addEventListener("resize", computeTarget);

  requestAnimationFrame(render);
})();
