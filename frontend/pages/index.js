import '../style.css';
import { isLoggedIn, logoutSession } from '../auth/auth.js';
import { fetchUsers } from './http.js';

isLoggedIn();

const logoutBtn = document.getElementById('logout-btn');
const tBody = document.querySelector('tbody');

logoutSession(logoutBtn);

fetchUsers(tBody);
