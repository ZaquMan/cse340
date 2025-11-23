// Needed Resources
const express = require('express');
const router = new express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities/');
const regValidate = require('../utilities/account-validation');

// Route to build account login page
router.get('/login', utilities.handleErrors(accountController.buildLogin));
// Route to build registration page
router.get('/register', utilities.handleErrors(accountController.buildRegister));
// Route to receive registration form POST
router.post(
	'/register',
	regValidate.registrationRules(),
	regValidate.checkRegData,
	utilities.handleErrors(accountController.registerAccount)
);

router.post("/login",
	regValidate.loginRules(),
	regValidate.checkLoginData,
	(req, res) => {
		res.status(200).send("login process");
	},
	utilities.handleErrors(accountController.buildLogin)
)

module.exports = router;