const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/';
}

async function loadUsers() {

  const res = await fetch('/api/users', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const users = await res.json();

  const list = document.getElementById('usersList');

  list.innerHTML = '';

  users.forEach(user => {

    const li = document.createElement('li');

    li.innerHTML = `
      <strong>${user.username}</strong>
      - ${user.email}

      <button onclick="detailsUser('${user.email}')">
        Détails
      </button>

      <button onclick="updateUser('${user.email}')">
        Modifier
      </button>

      <button onclick="deleteUser('${user.email}')">
        Supprimer
      </button>
    `;

    list.appendChild(li);
  });
}

loadUsers();


// CREATE
document.getElementById('userForm')
.addEventListener('submit', async (e) => {

  e.preventDefault();

  const body = {
    username:
      document.getElementById('username').value,

    email:
      document.getElementById('email').value,

    password:
      document.getElementById('password').value
  };

  await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(body)
  });

  loadUsers();
});


// DETAILS
async function detailsUser(email) {

  const res = await fetch(`/api/users/${email}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const user = await res.json();

  alert(`
Nom : ${user.username}
Email : ${user.email}
  `);
}


// UPDATE
async function updateUser(email) {

  const newName =
    prompt('Nouveau nom utilisateur :');

  await fetch(`/api/users/${email}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      username: newName
    })
  });

  loadUsers();
}


// DELETE
async function deleteUser(email) {

  if (!confirm('Supprimer utilisateur ?')) return;

  await fetch(`/api/users/${email}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  loadUsers();
}