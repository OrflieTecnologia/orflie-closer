// Sombra no header quando a página sai do topo
function initHeaderScroll() {
  const header = document.querySelector("header");

  if (!header) return;

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

// Destaca no menu o link da seção que está na tela
function initActiveNav() {
  const links = document.querySelectorAll('.nav-menu a[href^="#"]');

  if (!links.length || !("IntersectionObserver" in window)) return;

  const linkById = new Map();

  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) linkById.set(section.id, link);
  });

  // Observa todas as seções: nas que não têm link no menu, nenhum fica ativo
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => link.classList.remove("is-active"));
        linkById.get(entry.target.id)?.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
}

// Elementos entram com fade + subida quando aparecem na tela
function initReveal() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const groups = [
    ".stats-text",
    ".stats-card",
    ".segments-text",
    ".segments-list li",
    ".how-it-works-text",
    ".how-it-works-card-image",
    ".service-text",
    ".service-card",
    ".process-text",
    ".process-list li",
    ".faq-text",
    ".accordion-item",
    ".contact-content",
    ".platforms-text",
    ".platforms-list li",
  ];

  const elements = document.querySelectorAll(groups.join(", "));

  // Itens irmãos entram em sequência, um pouco depois do anterior
  elements.forEach((element) => {
    const siblings = [...element.parentElement.children];
    const index = siblings.indexOf(element);

    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );

  document.documentElement.classList.add("js-reveal");
  elements.forEach((element) => observer.observe(element));
}
