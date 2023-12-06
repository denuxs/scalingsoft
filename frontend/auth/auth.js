import { API } from '../environment.js';

export function isLoggedIn() {
  const auth = JSON.parse(localStorage.getItem('auth'));

  if (!auth || !auth['token']) {
    window.location.href = 'login.html';
  }
}

export async function loginUser(payload) {
  document.getElementById('login-error').innerHTML = '';

  try {
    const response = await fetch(`${API}/auth/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case 400:
          document.getElementById('login-error').innerHTML = data.error;
          break;
        default:
          throw new Error(response.statusText);
      }
      return;
    }

    localStorage.setItem('auth', JSON.stringify(data));
    window.location.href = 'index.html';
  } catch (error) {
    console.log('An error occurred:', error);
  }
}

export function logoutSession(element) {
  element.addEventListener('click', (event) => {
    event.preventDefault();

    localStorage.clear();
    window.location.href = 'login.html';
  });
}
