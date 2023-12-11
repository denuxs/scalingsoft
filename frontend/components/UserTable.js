import { API } from '../environment.js';
import { getUser } from '../auth/Auth.js';

const table = document.createElement('table');

async function updateStatus(payload) {
  try {
    const response = await fetch(`${API}/users/update.php`, {
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
function createCell(title) {
  const cell = document.createElement('td');
  const cellText = document.createTextNode(title);
  cell.appendChild(cellText);
  return cell;
}

function buildHeadTable() {
  table.className = 'table table-striped';
  const thead = document.createElement('thead');

  const tr = document.createElement('tr');
  const usernameTd = createCell('Username');
  tr.appendChild(usernameTd);

  const roleTd = createCell('Role');
  tr.appendChild(roleTd);

  const statusTd = createCell('Status');
  tr.appendChild(statusTd);

  const actionTd = createCell('');
  tr.appendChild(actionTd);

  thead.appendChild(tr);
  table.appendChild(thead);
}

function buildBodyTable(data) {
  const tbody = document.createElement('tbody');

  data.map((item) => {
    const tr = document.createElement('tr');
    const userTd = createCell(`${item.fullName} (${item.username})`);
    tr.appendChild(userTd);

    const roleTd = createCell(item.roleName);
    tr.appendChild(roleTd);

    const statusTd = createCell(item.status);
    tr.appendChild(statusTd);

    const cell = document.createElement('td');

    const button = document.createElement('button');
    button.className = 'btn btn-light mt-2';
    button.type = 'button';
    button.textContent = 'Unblock';

    const { role } = getUser();

    if (role !== 'ADMIN') {
      button.disabled = true;
    }

    // handle udpate status
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const status = +item.status;

      const payload = {
        id: +item.id,
        status: !status,
      };

      updateStatus(payload);
    });

    cell.appendChild(button);
    tr.appendChild(cell);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  app.appendChild(table);
}

async function fetchUsers() {
  try {
    const response = await fetch(`${API}/users`);
    if (!response.ok) {
      throw new Error('something went error');
    }

    const data = await response.json();
    buildBodyTable(data);
  } catch (error) {
    console.error(error);
  }
}

export default function UserTable(app) {
  const row = document.createElement('div');
  row.className = 'd-flex justify-content-between mt-4';

  const title = document.createElement('h4');
  title.textContent = 'Usuarios';

  row.appendChild(title);
  app.appendChild(row);

  buildHeadTable();

  fetchUsers();
}
