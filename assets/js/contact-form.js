function initContactForm() {
  const contactForms = document.querySelectorAll(
    ".contact-form form, .banner-form form"
  );

  contactForms.forEach((contactForm) => {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // O formulário do banner não tem campo de mensagem, então tudo
      // além de nome e email é opcional aqui
      const field = (fieldName) =>
        contactForm.elements[fieldName]?.value.trim() || "";

      const name = field("name");
      const email = field("email");
      const whatsapp = field("whatsapp");
      const message = field("message");

      const subject = `Contato via site — ${name}`;
      const contactLines = [name, email, whatsapp].filter(Boolean).join("\n");
      const body = message ? `${message}\n\n${contactLines}` : contactLines;

      window.location.href = `mailto:contato@orflie.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    });
  });
}
