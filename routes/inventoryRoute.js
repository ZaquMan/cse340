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
router.get("/", utilities.handleErrors(invController.buildInventoryManagement));
// Route to build add classification view
router.get("/add/classification", utilities.handleErrors(invController.buildAddClassification));
// Route to accept form submission from add classification view
router.post("/add/classification",
	reqValidate.addClassificationRules(),
	reqValidate.checkAddClassification,
	utilities.handleErrors(invController.addClassification)
);
// Route to build add inventory view
router.get("/add/inventory", utilities.handleErrors(invController.buildAddInventory));
// Route to accept form submission from add inventory view
router.post("/add/inventory",
	reqValidate.addInventoryRules(),
	reqValidate.checkAddInventory,
	utilities.handleErrors(invController.addInventory),
);

router.get("/delete/:inv_id", utilities.handleErrors(invController.buildDeleteConfirmation));
router.post("/delete", utilities.handleErrors(invController.deleteInventoryItem));

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

module.exports = router;