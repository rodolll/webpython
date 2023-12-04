const url = 'http://127.0.0.1:8000'

document.getElementById('registerForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirm_password = document.getElementById('confirm_password').value;

  registerUser({username, email, password, confirm_password})
  console.log("despues");
});


const registerUser = async (userData) => {
  console.log("adentro");
  try {
    const response = await fetch(`${url}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    console.log("durante",response);
  } catch (error) {
    console.log("Error ",error);
  }
    /* console.log('res', response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert('Usuario creado correctamente')
      // Guardar los tokens en localStorage
      //localStorage.setItem('accessToken', data.access);
      //localStorage.setItem('refreshToken', data.refresh);
    } else {
      // Manejar errores de registro
      const errorData = await response.json();
      alert(`${errorData.message}: ${errorData.error?.non_field_errors || errorData.error?.username || errorData.error?.email}`)
    } */

}
