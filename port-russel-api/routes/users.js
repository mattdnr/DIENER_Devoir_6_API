const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.get('/', auth, userController.getUsers);
router.get('/:email', auth, userController.getUserByEmail);
router.post('/', auth, userController.createUser);
router.put('/:email', auth, userController.updateUser);
router.delete('/:email', auth, userController.deleteUser);

module.exports = router;
