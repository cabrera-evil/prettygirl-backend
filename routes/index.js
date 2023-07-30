var express = require('express');
var router = express.Router();
require ('dotenv').config();

// Connecting to MongoDB
const {connect} = require('../config/database');
connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PrettyGirl - API' });
});

module.exports = router;
