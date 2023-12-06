import { API } from '../environment.js';

export async function fetchUsers(tBody) {
  try {
    const response = await fetch(`${API}/users`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const body = data
      .map((item) => {
        return `
      <tr>
      <td>${item.username}</td>
      <td>${item.fullName}</td>
      <td>${item.status}</td>
      <td>${item.roleName}</td>
      </tr>
      `;
      })
      .join('');

    tBody.innerHTML = body;
  } catch (error) {
    console.log('An error occurred:', error);
  }
}

export async function registerUser(payload) {
  document.getElementById('login-error').innerHTML = '';

  try {
    const response = await fetch(`${API}/users/create.php`, {
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

    window.location.href = 'index.html';
  } catch (error) {
    console.log('An error occurred:', error);
  }
}

export async function fetchRoles(dropdownRole) {
  try {
    const response = await fetch(`${API}/roles`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    data.map((item) => {
      var option = document.createElement('option');
      option.text = item.name;
      option.value = item.id;
      dropdownRole.add(option);
    });
  } catch (error) {
    console.log('An error occurred:', error);
  }
}
