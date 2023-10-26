const form = document.querySelector("#myForm");
form.setAttribute("action", `https://formspree.io/f/moqorkrz`);

const nombre = form.elements.namedItem('fullName')
const correo = form.elements.namedItem('_replyto');
const mensaje = form.elements.namedItem('message');
const honeypot = form.elements.namedItem("_gotcha")

nombre.addEventListener('invalid', () => {
  nombre.classList.add("invalid");
});
correo.addEventListener('invalid', () => {
  correo.classList.add("invalid");
});
mensaje.addEventListener('invalid', () => {
  mensaje.classList.add("invalid");
});

// Eliminando clase invalid cuando el usuario vuelva a escribir en el campo correspondiente
nombre.addEventListener("input", function(event) {
  nombre.classList.remove("invalid");
});
correo.addEventListener("input", function(event) {
  correo.classList.remove("invalid");
});
mensaje.addEventListener("input", function(event) {
  mensaje.classList.remove("invalid");
});


form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  // Validar el campo honeypot, para evitar bots de spam
  if (honeypot.value) {
    return false;
  }
  // Válidando campos del formulario
  const nombreRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
  if (!nombreRegex.test(nombre.value)) {
    nombre.classList.add("invalid")
    alert("Nombre:\nSolo se aceptan letras y espacios")
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo.value)) {
    correo.classList.add("invalid")
    alert("Email:\nEscriba un correo válido")
    return false
  }

  const data = new FormData(this)
  const response = await fetch(this.action, {
    method: this.method,
    body: data,
    headers: {
      "Accept": "application/json"
    }
  }) 
  if(response.ok) {
    alert("Formulario envia correctamente\nGracias por su mensaje.")
    this.reset()
  } else {
    alert("Mensaje no enviado, ocurrió un problema con el servidor")
  }
};

