const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
	const classification_id = req.params.classificationId;
	const data = await invModel.getInventoryByClassificationId(classification_id);
	const grid = await utilities.buildClassificationGrid(data);
	let nav = await utilities.getNav();
	const className = data[0].classification_name;
	res.render("./inventory/classification", {
		title: className + " vehicles",
		nav,
		grid,
	});
}

/* ***************************
 *  Build inventory by ID view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
	const inventory_id = req.params.inventoryId;
	const details = await invModel.getInventoryDetails(inventory_id);
	const detailHtml = await utilities.buildInventoryDetails(details);
	let nav = await utilities.getNav();
	const vehicleName = `${details.inv_year} ${details.inv_make} ${details.inv_model}`;
	res.render("./inventory/details", {
		title: vehicleName,
		nav,
		detailHtml,
	})
};

/* ***************************
 *  Build inventory management view
 * ************************** */
invCont.buildInventoryManagement = async function (req, res, next) {
	const nav = await utilities.getNav();
	const classificationSelection = await utilities.buildClassificationList();
	req.flash("notice", "This page is for management use ONLY.");
	res.render("./inventory/management", {
		title: "Inventory Management",
		nav,
		errors: null,
		classificationSelection,
	});
};

/* **********************************
 *  Build Add Classification View
 * ******************************** */
invCont.buildAddClassification = async function (req, res, next) {
	let nav = await utilities.getNav();
	res.render("inventory/add-classification", {
		title: "Add Classification",
		nav,
		errors: null,
	});
}

/* **********************************
 *  Process Classification Addition
 * ******************************** */
invCont.addClassification = async function (req, res) {
	const { classification_name } = req.body;
	const regResult = await invModel.addClassification(classification_name);

	const nav = await utilities.getNav();
	if (regResult) {

		req.flash("notice", `${classification_name} has been added.`);
		res.status(201).render("inventory/add-classification", {
			title: "Add Classification",
			nav,
			errors: null,
		});
	} else {
		req.flash("notice", `Sorry, there was an issue adding ${classification_name}.`);
		res.status(501).render("inventory/add-classification", {
			title: "Add Classification",
			nav,
			errors: null,
		});
	}
}

/* **********************************
 *  Build Add Inventory View
 * ******************************** */
invCont.buildAddInventory = async function (req, res, next) {
	let nav = await utilities.getNav();
	let classificationList = await utilities.buildClassificationList();
	res.render("inventory/add-inventory", {
		title: "Add Inventory",
		nav,
		errors: null,
		classificationList,
	});
}

/* **********************************
 *  Process Inventory Addition
 * ******************************** */
invCont.addInventory = async function (req, res) {
	const { inv_make, inv_model, inv_year, inv_description,
		inv_image, inv_thumbnail, inv_price, inv_miles,
		inv_color, classification_id } = req.body;
	const regResult = await invModel.addInventory(inv_make, inv_model, inv_year, inv_description,
		inv_image, inv_thumbnail, inv_price, inv_miles,
		inv_color, classification_id);

	const nav = await utilities.getNav();
	const classificationList = await utilities.buildClassificationList();
	const classificationListSelected = await utilities.buildClassificationList(classification_id);


	if (regResult) {

		req.flash("notice", `The ${inv_year} ${inv_make} ${inv_model} has been added.`);
		res.status(201).render("inventory/add-inventory", {
			title: "Add Inventory",
			nav,
			errors: null,
			classificationList,
		});
	} else {
		req.flash("notice", `Sorry, there was an issue adding the ${inv_year} ${inv_make} ${inv_model}.`);
		res.status(501).render("inventory/add-inventory", {
			errors: null,
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
			classificationListSelected,
		});
	}
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
	const classification_id = parseInt(req.params.classification_id)
	const invData = await invModel.getInventoryByClassificationId(classification_id)
	if (invData[0].inv_id) {
		return res.json(invData)
	} else {
		next(new Error("No data returned"))
	}
}

/* ***************************
 * Build Inventory Update View
 * ***************************/
invCont.buildInventoryModification = async (req, res) => {
	const nav = await utilities.getNav();
	const classificationList = await utilities.buildClassificationList();
	const inventoryId = parseInt(req.params.inventory_id);
	const invDetails = await invModel.getInventoryDetails(inventoryId);
	const itemName = `${invDetails.inv_make} ${invDetails.inv_model}`
	res.render("inventory/edit-inventory", {
		title: "Modify " + itemName,
		nav,
		errors: null,
		classificationList,
		inv_id: inventoryId,
		inv_make: invDetails.inv_make,
		inv_model: invDetails.inv_model,
		inv_year: invDetails.inv_year,
		inv_description: invDetails.inv_description,
		inv_image: invDetails.inv_image,
		inv_thumbnail: invDetails.inv_thumbnail,
		inv_price: invDetails.inv_price,
		inv_miles: invDetails.inv_miles,
		inv_color: invDetails.inv_color,
		classification_id: invDetails.classification_id,
	});
}

/* ***********************
 * Update Inventory
 * ***********************/
invCont.updateInventory = async (req, res, next) => {
	const nav = await utilities.getNav();
	const {
		inv_id,
		inv_make,
		inv_model,
		inv_description,
		inv_image,
		inv_thumbnail,
		inv_price,
		inv_year,
		inv_miles,
		inv_color,
		classification_id,
	} = req.body;
	const updateResult = await invModel.updateInventory(
		inv_id,
		inv_make,
		inv_model,
		inv_description,
		inv_image,
		inv_thumbnail,
		inv_price,
		inv_year,
		inv_miles,
		inv_color,
		classification_id
	);

	if (updateResult) {
		const itemName = updateResult.inv_make + " " + updateResult.inv_model;
		req.flash("notice", `The ${itemName} was successfully updated.`);
		res.redirect("/inv/");
	} else {
		const classificationList = await utilities.buildClassificationList();
		const itemName = `${inv_make} ${inv_model}`;
		req.flash("notice", "Sorry, the update failed.");
		res.status(501).render("inventry/edit-inventory", {
			title: "Edit " + itemName,
			nav,
			classificationList,
			errors: null,
			inv_id,
			inv_make,
			inv_model,
			inv_year,
			inv_description,
			inv_image,
			inv_thumbnail,
			inv_price,
			inv_miles,
			inv_color,
			classification_id
		});
	}
}

module.exports = invCont;