const utilities = require('.');
const { body, validationResult } = require("express-validator");
const inventoryModel = require("../models/inventory-model");
const validate = {};

/* **********************************
 * Add Classification Data Validation Rules
 * ******************************** */
validate.addClassificationRules = () => {
	return [
		// classification name is required
		body("classification_name")
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 1 })
			.isAlpha()
			.withMessage("Please provide a classification.")
			.custom(async (classification_name) => {
				const classificationExists = await inventoryModel.checkExistingClassificationByName(classification_name);
				if (classificationExists > 0) {
					throw new Error(`${classification_name} already exists.`);
				}
			}),
	];
};

/* ******************************
 * Check for validation errors and redisplay
 * page with error messages and sticky form
 * fields
 * ***************************** */

validate.checkAddClassification = async (req, res, next) => {
	const { classification_name } = req.body;
	let errors = [];
	errors = validationResult(req);
	if (!errors.isEmpty()) {
		let nav = await utilities.getNav();
		res.render("inventory/add-classification", {
			errors,
			title: "Add Classification",
			nav,
			classification_name
		});
		return;
	}
	next();
};

/* *************************
 * Validation Rules for Add Inventory form
 * *********************** */

validate.addInventoryRules = () => {
	return [
		// vehicle make is required and must be a string
		body("inv_make")
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 2 })
			.withMessage("Please provide a make (manufacturer)."),
		
		// vehicle model is required and must be a string
		body("inv_model")
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 2 })
			.withMessage("Please provide a vehicle model."),
		
		// vehicle year is required and must be a 4-digit number
		body("inv_year")
			.trim()
			.escape()
			.notEmpty()
			.isInt({gt: 1879, lt: 10000 })
			.isLength({ min: 4, max: 4 })
			.withMessage("Please provide an unabbreviated year."),
		
		// the description is required and must be a string
		body("inv_description")
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 3 })
			.withMessage("Please provide a short description of the vehicle."),
		
		// The inventory image needs to be a string matching /images/vehicles/
		body("inv_image")
			.trim()
			// .escape()
			.whitelist('[a-zA-Z\\\.]')
			.notEmpty()
			.isLength({ min: 18 })
			.contains("/images/vehicles/")
			// .contains("images")
			// .contains("vehicles")
			.withMessage("Please provide the full path to the vehicle image (/images/vehicles/image.png"),
		
		// The inventory thumbnail needs to be a string matching /images/vehicles/
		body("inv_thumbnail")
			.trim()
			// .escape()
			.whitelist('[a-zA-Z\\\.]')
			.notEmpty()
			.isLength({ min: 18 })
			.contains("/images/vehicles/")
			// .contains("images")
			// .contains("vehicles")
			.withMessage("Please provide the full path to the vehicle thumbnail (/images/vehicles/image.png"),
	
		// The price must be an integer at least 0 (ignoring cents)
		body("inv_price")
			.trim()
			.escape()
			.notEmpty()
			.isInt({ min: 0 })
			.withMessage("Please provide the vehicle price."),
	
		// The milage must be an integer greater than or equal to 0
		body("inv_miles")
			.trim()
			.escape()
			.notEmpty()
			.isInt({ min: 0 })
			.withMessage("Please provide the vehicle's odometer reading (mileage)."),
		
		// The color must be a string
		body("inv_color")
			.trim()
			.escape()
			.notEmpty()
			.isAlpha()
			.isLength({ min: 3 })
			.withMessage("Please provided the vehicle's color."),
		
		// The classification ID must be an existing id
		body("classification_id")
			.trim()
			.escape()
			.notEmpty()
			.isInt({ min: 0 })
			.custom(async (classification_id) => {
				const classificationExists = await inventoryModel.checkExistingClassificationById(classification_id);
				if (classificationExists == 0) {
					throw new Error("There is not a classification that matches your selection")
				}
			}),
	]
}

/* ******************************
 * Check for validation errors and redisplay
 * page with error messages and sticky form
 * fields
 * ***************************** */

validate.checkAddInventory = async (req, res, next) => {
	const { inv_make, inv_model, inv_year, inv_description,
		inv_image, inv_thumbnail, inv_price, inv_miles,
		inv_color, classification_id } = req.body;
	let errors = [];
	errors = validationResult(req);
	if (!errors.isEmpty()) {
		const nav = await utilities.getNav();
		const classificationList = await utilities.buildClassificationList(classification_id);
		res.render("inventory/add-inventory", {
			errors,
			title: "Add Inventory",
			nav,
			inv_make, 
			inv_model,
			inv_year,
			inv_description,
			inv_image,
			inv_thumbnail,
			inv_price,
			inv_miles,
			inv_color,
			classificationList,
		});
		return;
	}
	next();
};

/* ******************************
 * Check for validation errors and redisplay
 * page with error messages and sticky form
 * fields for the Update Inventory Form
 * ***************************** */

validate.checkUpdateInventory = async (req, res, next) => {
	const { inv_make, inv_model, inv_year, inv_description,
		inv_image, inv_thumbnail, inv_price, inv_miles,
		inv_color, classification_id, inv_id } = req.body;
	let errors = [];
	errors = validationResult(req);
	if (!errors.isEmpty()) {
		const nav = await utilities.getNav();
		const classificationList = await utilities.buildClassificationList(classification_id);
		res.render("inventory/edit-inventory", {
			errors,
			title: `Edit ${inv_make} ${inv_model}`,
			nav,
			inv_make, 
			inv_model,
			inv_year,
			inv_description,
			inv_image,
			inv_thumbnail,
			inv_price,
			inv_miles,
			inv_color,
			classificationList,
			inv_id,
		});
		return;
	}
	next();
};

module.exports = validate;