const url = 'http://127.0.0.1:8000'

const error = document.getElementById('error')

document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirm_password = document.getElementById('confirm_password');

  username.addEventListener('input', () => {
    error.innerHTML = ''
  })
  email.addEventListener('input', () => {
    error.innerHTML = ''
  })
  password.addEventListener('input', () => {
    error.innerHTML = ''
  })
  confirm_password.addEventListener('input', () => {
    error.innerHTML = ''
  })

 
  const response = await fetch(`${url}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.value, email: email.value,
                             password: password.value, confirm_password: confirm_password.value })
    });
    const data = await response.json()

    if(!response.ok) {
      console.log("Error",`${data.error?.non_field_errors || data.error?.username || data.error?.email}`);
      error.innerHTML = `${data.error?.non_field_errors || data.error?.username || data.error?.email }`
      return
    }

    alert('Usuario creado correctamente')
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    window.location.href = '/index.html'
});

