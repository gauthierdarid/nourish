function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

document.addEventListener("DOMContentLoaded", () => {
  const showcase = document.querySelector(".showcase");
  if (!showcase) return;

  const img = document.querySelector("#saladHeroImg");
  const title = document.querySelector("#saladTitle");
  const desc = document.querySelector("#saladDesc");
  const dots = Array.from(document.querySelectorAll(".dots span"));

  // Same image, different "variants" (text only for now)
  const variants = [
    { name: "Caprese fraîche", text: "Tomates, mozzarella, roquette. Simple, clean, efficace." },
    { name: "Pesto & Serrano", text: "Un kick salé + herbes. Placeholder visuel identique." },
    { name: "Chèvre & miel", text: "Doux / salé, un classique qui marche toujours." },
    { name: "Falafels & feta", text: "Plus gourmand, plus protéiné. Toujours le même visuel." },
  ];

  function updateVariant(i){
    const v = variants[i];
    title.textContent = v.name;
    desc.textContent = v.text;
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  }

  function onScroll(){
    const rect = showcase.getBoundingClientRect();
    const total = showcase.offsetHeight - window.innerHeight;
    const scrolled = clamp(-rect.top, 0, total);
    const p = total === 0 ? 0 : scrolled / total; // 0..1

    // "Apple-like" scale curve: small -> big -> small
    // peak at middle
    const peak = 1 - Math.abs(p - 0.5) * 2; // 0 at ends, 1 at middle
    const scale = 0.78 + peak * 0.42;       // 0.78..1.20
    const opacity = 0.55 + peak * 0.45;     // 0.55..1

    img.style.transform = `scale(${scale.toFixed(3)})`;
    img.style.opacity = opacity.toFixed(3);

    // Swap variant by scroll quartiles
    const idx = clamp(Math.floor(p * variants.length), 0, variants.length - 1);
    updateVariant(idx);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
