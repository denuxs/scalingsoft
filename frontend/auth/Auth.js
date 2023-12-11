import { API } from '../environment.js';

export function getUser() {
  const auth = JSON.parse(localStorage.getItem('auth'));

  return auth && auth.user;
}

export async function loginUser(payload) {
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
        case 404:
        case 400:
        case 401:
          alert(data.error);
          break;
        default:
          throw new Error(response.statusText);
      }
      return;
    }

    localStorage.setItem('auth', JSON.stringify(data));
    window.location.reload();
  } catch (error) {
    console.log('An error occurred:', error);
  }
}

export function logoutSession(element) {
  localStorage.clear();
  window.location.reload();
}
