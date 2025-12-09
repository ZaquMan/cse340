// Needed Resources
const express = require('express');
const router = new express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities/');
const validate = require('../utilities/account-validation');

// Route to build account login page
router.get('/login', utilities.handleErrors(accountController.buildLogin));
// Route to build registration page
router.get('/register', utilities.handleErrors(accountController.buildRegister));
// Route to receive registration form POST
router.post(
	'/register',
	validate.registrationRules(),
	validate.checkRegData,
	utilities.handleErrors(accountController.registerAccount)
);

router.post("/login",
	validate.loginRules(),
	validate.checkLoginData,
	utilities.handleErrors(accountController.accountLogin)
)

router.get("/logout",
	utilities.handleErrors(accountController.accountLogout)
);

router.get('/', utilities.checkLogin, utilities.handleErrors(accountController.buildAccount));

// Route to build account information update page
router.get('/update/:account_id', utilities.handleErrors(accountController.buildUpdate));
// Route to accept account information change
router.post('/update/info',
	validate.updateInfoRules(),
	validate.checkUpdateInfoData,
	utilities.handleErrors(accountController.updateAccount)
);
// Route to accept account password change
router.post('/update/password',
	validate.updatePasswordRules(),
	validate.checkUpdatePasswordData,
	utilities.handleErrors(accountController.updatePassword)
);

module.exports = router;