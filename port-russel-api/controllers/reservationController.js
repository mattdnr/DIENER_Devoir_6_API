const Reservation = require('../models/Reservation');


// GET ALL BY CATWAY
exports.getReservationsByCatway = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      catwayNumber: req.params.id
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ONE
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CREATE
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation({
      ...req.body,
      catwayNumber: req.params.id
    });

    await reservation.save();

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.idReservation,
      req.body,
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
