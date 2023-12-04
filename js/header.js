const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");
let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};

navbarToggle.addEventListener("click", toggleNavbarVisibility);

navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());
navbarMenu.addEventListener("click", toggleNavbarVisibility);

// Obteniendo token
const access = localStorage.getItem('access')

function decodificarToken(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const decoded = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
 
  return JSON.parse(decoded)

}


const user = document.querySelectorAll('.user')
const not_user = document.querySelectorAll('.not_user')

if (access) {

  const token = decodificarToken(access)
  for (let i = 0; i < not_user.length; i++) {
    not_user[i].style.display = 'none'
  }
  const img = document.getElementById('img_user')
  if (token.photo) {
    img.src = `http://127.0.0.1:8000${token.photo}/`
  } else {
    img.src = '../images/user.png'
  }

} else {
  console.log('Usuario no autenticado');
  for(let i = 0; i < user.length; i++) {
    user[i].style.display = 'none'
  }
}


// Logout