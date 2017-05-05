const express = require('express');
const login_router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const secretKey = require('../config_variables');
const morgan = require('morgan');
login_router.use(morgan('combined'));

mongoose.Promise = global.Promise;

const {User} = require('../user_models/users');

login_router.use(bodyParser.json());
login_router.use(bodyParser.urlencoded({ extended: false}));

login_router.get('/authenticate', (req, res) => {
console.log(secretKey);






})




module.exports = login_router;