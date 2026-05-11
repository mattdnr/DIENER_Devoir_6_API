const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/';
}

async function loadCatways() {

  const res = await fetch('/api/catways', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const data = await res.json();

  const list = document.getElementById('catwaysList');

  list.innerHTML = '';

  data.forEach(catway => {

    const li = document.createElement('li');

    li.innerHTML = `
      <strong>${catway.catwayNumber}</strong>
      - ${catway.catwayType}
      - ${catway.catwayState}

      <button onclick="getDetails(${catway.catwayNumber})">Détails</button>

      <button onclick="updateCatway(${catway.catwayNumber})">
        Modifier
      </button>

      <button onclick="deleteCatway(${catway.catwayNumber})">
        Supprimer
      </button>
    `;

    list.appendChild(li);
  });
}

loadCatways();


// CREATE
document.getElementById('catwayForm')
.addEventListener('submit', async (e) => {

  e.preventDefault();

  const body = {
    catwayNumber: document.getElementById('number').value,
    catwayType: document.getElementById('type').value,
    catwayState: document.getElementById('state').value
  };

  await fetch('/api/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(body)
  });

  loadCatways();
});


// DETAILS
async function getDetails(id) {

  const res = await fetch(`/api/catways/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const catway = await res.json();

  alert(`
Catway : ${catway.catwayNumber}
Type : ${catway.catwayType}
État : ${catway.catwayState}
  `);
}


// UPDATE
async function updateCatway(id) {

  const newState = prompt('Nouvel état :');

  await fetch(`/api/catways/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      catwayState: newState
    })
  });

  loadCatways();
}


// DELETE
async function deleteCatway(id) {

  if (!confirm('Supprimer ce catway ?')) return;

  await fetch(`/api/catways/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  loadCatways();
}