import '../style.css';

import { isLoggedIn, logoutSession } from '../auth/auth.js';
import { registerUser, fetchRoles } from './http.js';

isLoggedIn();

const logoutBtn = document.getElementById('logout-btn');

logoutSession(logoutBtn);

const form = document.getElementById('register-form');
const dropdownRole = document.getElementById('role');

form.addEventListener('submit', handleSave);

fetchRoles(dropdownRole);

function handleSave(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const payload = Object.fromEntries(data.entries());

  // registerUser(payload);
}
