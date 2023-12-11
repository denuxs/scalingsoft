import { loginUser } from '../auth/Auth.js';

export default function LoginPage(app) {
  const form = document.createElement('form');

  const row = document.createElement('div');
  row.className = 'row';

  const column = document.createElement('div');
  column.className = 'col-md-4 mx-auto pt-4';

  const createInput = (type, name) => {
    const input = document.createElement('input');
    input.name = name;
    input.type = type;
    input.placeholder = 'Username';
    input.className = 'form-control mt-2';
    input.required = true;
    return input;
  };

  const username = createInput('text', 'username');
  const password = createInput('password', 'password');

  const submit = document.createElement('button');
  submit.className = 'btn btn-primary mt-2';
  submit.type = 'submit';
  submit.textContent = 'Log in';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    if (data.get('username') == '' || data.get('password') == '') {
      alert('some fields are required');
      return;
    }

    const payload = {
      username: data.get('username'),
      password: data.get('password'),
    };

    loginUser(payload);
  });

  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);

  column.appendChild(form);
  row.appendChild(column);
  app.appendChild(row);
}
