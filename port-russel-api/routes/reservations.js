const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const reservationController = require('../controllers/reservationController');

router.get('/catways/:id/reservations', auth, reservationController.getReservationsByCatway);
router.get('/catways/:id/reservations/:idReservation', auth, reservationController.getReservation);
router.post('/catways/:id/reservations', auth, reservationController.createReservation);
router.put('/catways/:id/reservations/:idReservation', auth, reservationController.updateReservation);
router.delete('/catways/:id/reservations/:idReservation', auth, reservationController.deleteReservation);

module.exports = router;
