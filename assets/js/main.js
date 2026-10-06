function initOrflieSite() {
  initThemeToggle();
  initNavMenu();
  initContactForm();
  initHeaderScroll();
  initActiveNav();
  initReveal();
  initWhatsappWidget();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initOrflieSite);
} else {
  initOrflieSite();
}
