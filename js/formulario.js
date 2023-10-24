document.getElementById("myForm").addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { elements } = event.currentTarget
  // Obtengo todos los inputs y el textarea
  const fullName = elements.namedItem("fullName")
  const email = elements.namedItem("email")
  const phone = elements.namedItem("phone")
  const message = elements.namedItem("message")

  // Eliminando clase invalid cuando el usurio vuelva a escribir en el campo correspondiente
  fullName.addEventListener("input", function(event) {
    fullName.classList.remove("invalid");
  });
  email.addEventListener("input", function(event) {
    email.classList.remove("invalid");
  });
  message.addEventListener("input", function(event) {
    message.classList.remove("invalid");
  });

  // Haciendo las válidaciones para cada campo
  const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/
  if (!nameRegex.test(fullName.value)) {
    fullName.classList.add("invalid");
    return false;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.value)) {
    email.classList.add("invalid");
    return false;
  }
  if (message.value.length < 15) {
    message.classList.add("invalid");
    alert("El mensaje debe contener por lo menos 15 carácteres")
    return false;
  }

  // Si todos los campos del formulario son válidos
  alert("Formulario enviado correctamente")
  fullName.value = ""
  email.value = ""
  message.value = ""
  phone.value = ""  
  return true
}


