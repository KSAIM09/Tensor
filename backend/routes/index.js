const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Customer Service Platform API');
});

module.exports = router;
