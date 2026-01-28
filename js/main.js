function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.getAttribute("href").includes(path)) a.style.background = "rgba(255,255,255,.35)";
  });
}

document.addEventListener("DOMContentLoaded", setActiveNav);
