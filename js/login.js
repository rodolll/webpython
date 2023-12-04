const url = 'http://127.0.0.1:8000'

const error = document.getElementById('error')

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  username.addEventListener('input', () => {
    error.innerHTML = ''
  })
  password.addEventListener('input', () => {
    error.innerHTML = ''
  })

 
  const response = await fetch(`${url}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.value, password: password.value})
    });
    const data = await response.json()
    console.log("Data", data);

    if(!response.ok) {
      console.log("Error",`${data?.detail}`);
      error.innerHTML = `${data?.detail}`
      return
    }

    alert('Usuario logeado correctamente')
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    window.location.href = '../index.html'
});

