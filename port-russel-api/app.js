const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/catways', require('./routes/catways'));
app.use('/api/reservations', require('./routes/reservations'));

// Test route
app.get('/', (req, res) => {
  res.send('API en opération');
});

module.exports = app;