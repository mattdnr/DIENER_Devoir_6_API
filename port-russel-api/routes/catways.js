const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const catwayController = require('../controllers/catwayController');

router.get('/', auth, catwayController.getAllCatways);
router.get('/:id', auth, catwayController.getCatwayById);
router.post('/', auth, catwayController.createCatway);
router.put('/:id', auth, catwayController.updateCatway);
router.delete('/:id', auth, catwayController.deleteCatway);

module.exports = router;
