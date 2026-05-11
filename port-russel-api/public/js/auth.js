const form = document.getElementById('loginForm');

        form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    document.getElementById('error').textContent = data.message;
                    return;
                }

                // Save le token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Rediriger vers la page d'accueil
                window.location.href = '/dashboard.html';

            } catch (error) {
                document.getElementById('error').textContent = 'Erreur de connexion. Veuillez réessayer.';
            }
        });