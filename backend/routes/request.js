const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/', requestController.createRequest);
router.get('/:category', requestController.getRequestsByCategory);

module.exports = router;
