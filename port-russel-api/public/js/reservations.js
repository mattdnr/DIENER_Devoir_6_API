const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/';
}

async function loadReservations() {

  const list = document.getElementById('reservationsList');

  list.innerHTML = '';

  const catwaysRes = await fetch('/api/catways', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const catways = await catwaysRes.json();

  // Puis les réservations de chaque catway
  for (const catway of catways) {

    const res = await fetch(
      `/api/catways/${catway.catwayNumber}/reservations`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );

    const reservations = await res.json();

    reservations.forEach(r => {

      const li = document.createElement('li');

      li.innerHTML = `
        <strong>${r.clientName}</strong>
        - ${r.boatName}
        - Catway ${r.catwayNumber}

        <button onclick="detailsReservation('${r._id}', ${r.catwayNumber})">
          Détails
        </button>

        <button onclick="updateReservation('${r._id}', ${r.catwayNumber})">
          Modifier
        </button>

        <button onclick="deleteReservation('${r._id}', ${r.catwayNumber})">
          Supprimer
        </button>
      `;

      list.appendChild(li);
    });
  }
}

loadReservations();


// CREATE
document.getElementById('reservationForm')
.addEventListener('submit', async (e) => {

  e.preventDefault();

  const catwayNumber =
    document.getElementById('catwayNumber').value;

  const body = {
    clientName:
      document.getElementById('clientName').value,

    boatName:
      document.getElementById('boatName').value,

    startDate:
      document.getElementById('startDate').value,

    endDate:
      document.getElementById('endDate').value
  };

  await fetch(
    `/api/catways/${catwayNumber}/reservations`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    }
  );

  loadReservations();
});


// DETAILS
async function detailsReservation(id, catway) {

  const res = await fetch(
    `/api/catways/${catway}/reservations/${id}`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );

  const reservation = await res.json();

  alert(`
Client : ${reservation.clientName}
Bateau : ${reservation.boatName}
Début : ${reservation.startDate}
Fin : ${reservation.endDate}
  `);
}


// UPDATE
async function updateReservation(id, catway) {

  const newClient =
    prompt('Nouveau nom client :');

  await fetch(
    `/api/catways/${catway}/reservations/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        clientName: newClient
      })
    }
  );

  loadReservations();
}


// DELETE
async function deleteReservation(id, catway) {

  if (!confirm('Supprimer réservation ?')) return;

  await fetch(
    `/api/catways/${catway}/reservations/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );

  loadReservations();
}