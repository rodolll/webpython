const url = 'http://127.0.0.1:8000'

// access y decodificarToken vienen de header.js
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

    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const photo = document.getElementById('photo').files[0];

    username.addEventListener('input', () => {
      error.innerHTML = ''
    })
    email.addEventListener('input', () => {
      error.innerHTML = ''
    })

    let formData = new FormData();
    formData.append('email', email.value)
    formData.append('username', username.value)
    formData.append('first_name', first_name)
    formData.append('last_name', last_name)
    if(photo) {
      formData.append('photo', photo)
    }

    const response = await fetch(`${url}/users/${token.user_id}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + access
      },
      body: formData
    });
    const data = await response.json()

    if(!response.ok) {
      console.log(`${data.detail}`, `${data.error?.username ? `username: ${data.error.username}` : '' || data.error?.email ? `email: ${data.error.email}` : '' }`)
      error.innerHTML = `${data.error?.username ? `username: ${data.error.username}` : '' || data.error?.email ? `email: ${data.error.email}` : '' || data.error?.photo ? `photo: ${data.error.photo}` : '' }`
      return
    }
    
    alert('Usuario actualizado correctamente')
    window.location.href = '../../webpython/index.html'

  });


  // Eliminar usuario
  document.getElementById('deleteForm').addEventListener('click', async () => {

    const deleteUser = confirm("Estas seguro que deseas eliminar este usuario?")

    if (deleteUser) {
      const response = await fetch(`${url}/users/${token.user_id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + access,
            'Content-Type': 'application/json',
          },
        });
  
        alert('Usuario eliminado correctamente')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        window.location.href = '../../webpython/index.html'
    }
  });

} else {
  window.location.href = '../../webpython/index.html'
}