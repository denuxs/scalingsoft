import '../style.css';
import { loginUser } from '../auth/auth.js';

// const auth = JSON.parse(localStorage.getItem("auth"));

// if (auth && auth["token"]) {
//   window.location.href = "index.html";
// }

const form = document.getElementById('login-form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const payload = Object.fromEntries(data.entries());

  loginUser(payload);
}
