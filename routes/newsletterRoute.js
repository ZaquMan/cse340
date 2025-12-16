const express = require("express");
const router = new express.Router();
const newsletterController = require("../controllers/newsletterController");
const utilities = require("../utilities/");
const reqValidation = require("../utilities/newsletter-validation");

// Default route - Newsletter View
router.get("/",
	utilities.handleErrors(newsletterController.buildNewsletterList)
);

// Route for viewing newsletter creation
router.get("/create",
	utilities.checkAccountType,
	utilities.handleErrors(newsletterController.buildNewsletterCreation)
);

// Route for handling newsletter creation POST
router.post("/create",
	utilities.checkAccountType,
	reqValidation.addNewsletterCreationRules(),
	reqValidation.addNewsletter,
	utilities.handleErrors(newsletterController.createNewsletter)
);

// Route for viewing an individual newsletter
router.get("/view/:newsletter_id",
	utilities.handleErrors(newsletterController.buildNewsletterDetails)
);

// Route for building the newsletter update view
router.get("/update/:newsletter_id",
	utilities.checkAccountType,
	utilities.handleErrors(newsletterController.buildNewsletterModification)
);

// Route for handling newsletter update POST
router.post("/update",
	utilities.checkAccountType,
	reqValidation.addNewsletterUpdateRules(),
	reqValidation.updateNewsletter,
	utilities.handleErrors(newsletterController.updateNewsletter)
);

// Route for building the newsletter delete view
router.get("/delete/:newsletter_id",
	utilities.checkAccountType,
	utilities.handleErrors(newsletterController.buildNewsletterDeleteConf)
);

// Route for handling newsletter delete POST
router.post("/delete",
	utilities.checkAccountType,
	utilities.handleErrors(newsletterController.deleteNewsletter)
);

module.exports = router;