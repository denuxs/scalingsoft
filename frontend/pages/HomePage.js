import { getUser, logoutSession } from '../auth/Auth.js';
import UserTable from '../components/UserTable.js';
import UserForm from '../components/UserForm.js';

function headerHtml(app) {
  const row = document.createElement('div');
  row.className = 'd-flex justify-content-between mt-4';

  const { username, role } = getUser();

  const title = document.createElement('h4');
  title.textContent = `Welcome, ${username}(${role})`;

  const button = document.createElement('button');
  button.className = 'btn btn-light';
  button.type = 'button';
  button.textContent = 'Logout';

  // logout session
  button.addEventListener('click', (event) => {
    event.preventDefault();

    logoutSession();
  });

  row.appendChild(title);
  row.appendChild(button);
  app.appendChild(row);
}

export default function HomePage(app) {
  headerHtml(app);
  UserForm(app);

  UserTable(app);
}
