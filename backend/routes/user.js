const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user controller');

//SignUp
router.post('/signup', userCtrl.userSignup);

//Login
router.post('/login', userCtrl.userLogin);

//Logout
router.post('/logout', userCtrl.userLogout);

module.exports = router;