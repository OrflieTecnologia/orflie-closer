// Orflie CRM — captura dos formulários do site (banner e contato)
const CRM_WEBHOOK_URL =
  "https://orflia.ai/api/webhooks/formulario/3835f11f-a68e-4a82-8eca-6ebd79fb1311";

function initContactForm() {
  document
    .querySelectorAll(".contact-form form, .banner-form form")
    .forEach(initCrmForm);
}

// Envia os campos do formulário pro CRM e mostra o resultado no próprio form
function initCrmForm(form) {
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const submitLabel = submitButton.innerHTML;
  const status = form.querySelector(".form-status");

  let hideTimer;

  const clearStatus = () => {
    clearTimeout(hideTimer);
    status.className = "form-status";
  };

  // A mensagem de sucesso some sozinha depois de 3s (com fade)
  const showStatus = (type, text) => {
    clearStatus();
    status.textContent = text;
    status.className = `form-status is-${type}`;

    if (type === "success") {
      hideTimer = setTimeout(() => {
        status.classList.add("is-hiding");
        hideTimer = setTimeout(clearStatus, 400);
      }, 3000);
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {};
    new FormData(form).forEach((value, key) => {
      data[key] = value;
    });

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    clearStatus();

    try {
      const response = await fetch(CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!result.ok) throw new Error("Resposta do CRM sem ok");

      showStatus("success", "Obrigado! Entraremos em contato em breve.");
      form.reset();
    } catch (error) {
      console.error(error);
      showStatus(
        "error",
        "Não foi possível enviar agora. Tente novamente ou fale com a gente pelo WhatsApp."
      );
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = submitLabel;
    }
  });
}
