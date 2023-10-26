const form = document.getElementById("myForm");
const id = "moqorkrz"
form.setAttribute("action", `https://formspree.io/f/${id}`);

const nombre = form.elements.namedItem('fullName')
const correo = form.elements.namedItem('_replyto');
const mensaje = form.elements.namedItem('message');

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


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { elements } = event.currentTarget
  
  const telefono = elements.namedItem("phone")
  const honeypot = elements.namedItem("_gotcha")
  // Validar el campo honeypot, para evitar bots de spam
  if (honeypot.value) {
    return false;
  }
  // Válidando campos del formulario
  const nombreRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
  if (!nombreRegex.test(nombre.value)) {
    nombre.classList.add("invalid")
    alert("Nombre inválido")
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo.value)) {
    correo.classList.add("invalid")
    alert("Correo inválido\nEscriba un correo válido")
    return false
  }
  if (mensaje.value.length < 15) {
    mensaje.classList.add("invalid")
    alert('El campo de mensaje es inválido.\nEl mensaje debe contener por lo menos 15 carácteres.');
    return false
  }

  // Si todos los campos del formulario son válidos
  nombre.value = ""
  correo.value = ""
  mensaje.value = ""
  telefono.value = ""  
  alert("Formulario enviado correctamente, gracias por su mensaje")
  event.currentTarget.requestSubmit()
  return true
});

