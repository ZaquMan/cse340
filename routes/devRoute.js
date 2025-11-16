const express = require("express");
const router = new express.Router();
const devController = require("../controllers/devController");
const utilities = require("../utilities/");

// Routes for development testing
router.get("/error", utilities.handleErrors(devController.errorExample));

module.exports = router;