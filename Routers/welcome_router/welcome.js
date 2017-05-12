
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const welcome_router = express.Router();
const path = require('path');
const express_jwt = require('express-jwt');
const {SECRET} = require(path.join(process.cwd() + '/config_variables.js'));


welcome_router.use(bodyParser.json());

welcome_router.use('/', express.static(process.cwd() + '/public/login_registration'));
welcome_router.use('/dashboard/:username', express.static(process.cwd() + '/public/dashboard'));
welcome_router.get('/', (req, res) => {
  // console.log(process.cwd());
  console.log(SECRET)
  // res.status(200).sendFile(path.join(process.cwd() +  '/public/login_registration/index.html'));
});


welcome_router.get('/dashboard/:username',express_jwt({
  secret: SECRET
}), (req,res) => {
  // res.status(200).sendFile(path.join(process.cwd() + '/public/dashboard/index.html'));
})

module.exports = welcome_router;