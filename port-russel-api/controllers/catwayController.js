const Catway = require('../models/Catway');


// GET ALL
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ONE
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CREATE
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;

    const existing = await Catway.findOne({ catwayNumber });
    if (existing) {
      return res.status(400).json({ message: 'Catway déjà existant' });
    }

    const catway = new Catway({
      catwayNumber,
      catwayType,
      catwayState
    });

    await catway.save();

    res.status(201).json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE 
exports.updateCatway = async (req, res) => {
  try {
    const { catwayState } = req.body;

    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState },
      { new: true }
    );

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    res.json({ message: 'Catway supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
