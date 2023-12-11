import LoginPage from './pages/LoginPage.js';
import HomePage from './pages/HomePage.js';

import { getUser } from './auth/Auth.js';

const app = document.querySelector('#app');

const isAuth = getUser();

if (isAuth) {
  HomePage(app);
} else {
  LoginPage(app);
}
