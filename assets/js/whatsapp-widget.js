// Botão flutuante do WhatsApp: abre/fecha o card com a mensagem inicial
function initWhatsappWidget() {
  const widget = document.querySelector(".whatsapp-widget");

  if (!widget) return;

  const toggle = widget.querySelector(".whatsapp-toggle");
  const popup = widget.querySelector(".whatsapp-popup");
  const closeButton = widget.querySelector(".whatsapp-popup-close");

  const setOpen = (isOpen) => {
    widget.classList.toggle("is-open", isOpen);
    popup.inert = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar conversa" : "Abrir conversa no WhatsApp"
    );
  };

  toggle.addEventListener("click", () => {
    setOpen(!widget.classList.contains("is-open"));
  });

  closeButton.addEventListener("click", () => {
    setOpen(false);
    toggle.focus();
  });

  // Fecha com Esc ou clicando fora do widget
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && widget.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!widget.contains(event.target)) setOpen(false);
  });
}
