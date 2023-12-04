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
      console.log(data);
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
    const photo = document.getElementById('photo').files[0];

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
        console.log("Error",`${data.detail || data.error?.username || data.error?.email}`);
        error.innerHTML = `${data.detail || data.error?.username || data.error?.email }`
        return
      }

      alert('Usuario actualizado correctamente')
      window.location.href = '../index.html'
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
        window.location.href = '../index.html'
    }
  });

} else {
  window.location.href = '../index.html'
}