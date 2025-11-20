// Needed Resources
const express = require('express');
const router = new express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities/');

// Route to build account login page
router.get('/login', utilities.handleErrors(accountController.buildLogin));
// Route to build registration page
router.get('/register', utilities.handleErrors(accountController.buildRegister));
module.exports = router;