// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const reqValidate = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// Route to build details page for an inventory item
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));
// Route to manage inventory
router.get("/", utilities.checkAccountType, utilities.handleErrors(invController.buildInventoryManagement));
// Route to build add classification view
router.get("/add/classification", utilities.checkAccountType, utilities.handleErrors(invController.buildAddClassification));
// Route to accept form submission from add classification view
router.post("/add/classification",
	reqValidate.addClassificationRules(),
	reqValidate.checkAddClassification,
	utilities.checkAccountType,
	utilities.handleErrors(invController.addClassification)
);
// Route to build add inventory view
router.get("/add/inventory", utilities.checkAccountType, utilities.handleErrors(invController.buildAddInventory));
// Route to accept form submission from add inventory view
router.post("/add/inventory",
	reqValidate.addInventoryRules(),
	reqValidate.checkAddInventory,
	utilities.checkAccountType,
	utilities.handleErrors(invController.addInventory),
);

router.get("/delete/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.buildDeleteConfirmation));
router.post("/delete", utilities.checkAccountType, utilities.handleErrors(invController.deleteInventoryItem));

// API route to get inventory for items matching classification.
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// Route to build inventory modification view
router.get("/edit/:inventory_id", utilities.checkAccountType, utilities.handleErrors(invController.buildInventoryModification));
// Route to accept modified inventory form
router.post("/update",
	reqValidate.addInventoryRules(),
	reqValidate.checkUpdateInventory,
	utilities.checkAccountType,
	utilities.handleErrors(invController.updateInventory));

module.exports = router;