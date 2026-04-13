const User = require('../models/User');
const bcrypt = require('bcrypt');


// GET ALL
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ONE
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CREATE
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE
exports.updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
