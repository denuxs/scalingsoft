import { API } from '../environment.js';

function createInput(type, name) {
  const input = document.createElement('input');
  input.name = name;
  input.type = type;
  input.placeholder = name;
  input.className = 'form-control mt-2';
  input.required = true;
  return input;
}

function createDropdown(data, form) {
  const select = document.createElement('select');
  select.name = 'role';
  select.placeholder = 'role';
  select.className = 'form-control mt-2';
  select.required = true;

  data.map((item) => {
    var option = document.createElement('option');
    option.text = item.name;
    option.value = item.id;
    select.add(option);
  });

  form.appendChild(select);
}

async function fetchRoles(form, button) {
  try {
    const response = await fetch(`${API}/roles`);

    if (!response.ok) {
      throw new Error('something went error');
    }

    const data = await response.json();
    createDropdown(data, form);
    form.appendChild(button);
  } catch (error) {
    console.error(error);
  }
}

async function saveUser(payload) {
  try {
    const response = await fetch(`${API}/users/create.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('something went error');
    }

    const data = await response.json();
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

export default function UserForm(app) {
  const title = document.createElement('h4');
  title.textContent = 'Create User';
  title.className = 'text-center';

  const form = document.createElement('form');

  const row = document.createElement('div');
  row.className = 'row';

  const column = document.createElement('div');
  column.className = 'col-md-4 mx-auto pt-4';

  const username = createInput('text', 'username');
  const password = createInput('password', 'password');
  const firstname = createInput('text', 'firstname');
  const lastname = createInput('text', 'lastname');

  // create checkbox
  const label = document.createElement('label');
  label.textContent = 'status';
  label.className = 'form-label m-2';

  const status = document.createElement('input');
  status.name = 'status';
  status.type = 'checkbox';
  status.checked = true;
  status.className = 'mt-2';

  const submit = document.createElement('button');
  submit.className = 'btn btn-primary mt-2';
  submit.type = 'submit';
  submit.textContent = 'Save';

  form.appendChild(title);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(firstname);
  form.appendChild(lastname);
  form.appendChild(label);
  form.appendChild(status);

  fetchRoles(form, submit);

  // handle save user
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    if (
      data.get('username') == '' ||
      data.get('password') == '' ||
      data.get('firstname') == '' ||
      data.get('lastname') == ''
    ) {
      alert('some fields are required');
      return;
    }

    const payload = {
      username: data.get('username'),
      password: data.get('password'),
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      role: +data.get('role'),
      status: status.checked,
    };

    saveUser(payload);
  });

  column.appendChild(form);
  row.appendChild(column);
  app.appendChild(row);
}
