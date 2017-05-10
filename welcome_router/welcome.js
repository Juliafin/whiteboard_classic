
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const welcome_router = express.Router();

welcome_router.use(bodyParser.json());


welcome_router.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

module.exports = welcome_router;