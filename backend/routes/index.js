var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Welcome');
});

// Include the user routes
router.use('/auth', require('../models/user'));

module.exports = router;
