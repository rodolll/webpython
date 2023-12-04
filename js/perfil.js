const url = 'http://127.0.0.1:8000'

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

if (access) {
  const token = decodificarToken(access)

  function obtenerUsuario (id) {
    fetch(`${url}/users/${id}/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access,
        'Content-Type': 'application/json'
      }
    })
    .then((respuesta) => respuesta.json())
    .then((data) => {
      document.getElementById("first_name").value = data.first_name;
      document.getElementById("last_name").value = data.last_name;
      document.getElementById("username").value = data.username;
      document.getElementById("email").value = data.email;
    })
    .catch(error => {
      console.error("Error:", error);
    })
  }

  obtenerUsuario(token.user_id)



  // Actualizar usuario
  const error = document.getElementById('error')

  document.getElementById('updateForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const file = document.getElementById('photo');
    const photo = file.files[0]

    username.addEventListener('input', () => {
      error.innerHTML = ''
    })
    email.addEventListener('input', () => {
      error.innerHTML = ''
    })

    const formData = new FormData()
    formData.append('first_name', first_name.value)
    formData.append('last_name', last_name.value)
    formData.append('username', username.value)
    formData.append('email', email.value)
    if(photo) {
      formData.append('photo', photo)
    }

    const response = await fetch(`${url}/users/${token.user_id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + access,
          'Content-Type': 'application/json',
        },
        body: formData
      });
      const data = await response.json()
      console.log("Data", data);

      if(!response.ok) {
        console.log("Error",`${data.error?.username || data.error?.email}`);
        error.innerHTML = `${data.error?.username || data.error?.email }`
        return
      }

      alert('Usuario actualizado correctamente')
      window.location.href = '../index.html'
  });

} else {
  window.location.href = '../index.html'
}