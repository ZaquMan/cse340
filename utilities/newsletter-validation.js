const utilities = require(".");
const { body, validationResult } = require("express-validator");
const newsletterModel = require("../models/newsletter-model");
const validate = {};

/* *************************
 * Add Newsletter Creation validation
 * ************************/
validate.addNewsletterCreationRules = () => {
	return [
		// newsletter headline is required
		body("newsletter_headline")
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 1 })
			.withMessage("Please provide a title for the newsletter."),
		
		// newsletter body is required
		body("newsletter_body")
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 1 })
			.withMessage("Please enter a message for the newsletter.")
	]
}

/* ********************
 * Check for validation errors
 * in the newsletter submission
 * *******************/
validate.addNewsletter = async (req, res, next) => {
	const { newsletter_headline, newsletter_body } = req.body;
	let errors = [];
	errors = validationResult(req);
	if (!errors.isEmpty()) {
		const nav = await utilities.getNav();
		res.render("newsletter/create", {
			errors,
			nav,
			title: "Create Newsletter",
			newsletter_headline,
			newsletter_body,
		});
		return;
	}
	next();
}

/* *************************
 * Add Newsletter Update validation
 * ************************/
validate.addNewsletterUpdateRules = () => {
	return [
		// newsletter_id must be an existing newsletter
		body("newsletter_id")
			.trim()
			.escape()
			.isInt()
			.custom(async (newsletter_id) => {
				const newsletterExists = await newsletterModel.checkExistingNewsletterID(newsletter_id);
				if (newsletterExists == 0) {
					throw new Error("This newsletter does not exist.");
				}
			}),

		// newsletter headline is required
		body("newsletter_headline")
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 1 })
			.withMessage("Please provide a title for the newsletter."),
		
		// newsletter body is required
		body("newsletter_body")
			.trim()
			.escape()
			.notEmpty()
			.isLength({ min: 1 })
			.withMessage("Please enter a message for the newsletter.")
	]
}

/* ********************
 * Check for validation errors
 * in the newsletter submission
 * *******************/
validate.updateNewsletter = async (req, res, next) => {
	const { newsletter_id, newsletter_headline, newsletter_body } = req.body;
	let errors = [];
	errors = validationResult(req);
	if (!errors.isEmpty()) {
		const nav = await utilities.getNav();
		res.render("newsletter/update", {
			errors,
			nav,
			title: "Create Newsletter",
			newsletter_id,
			newsletter_headline,
			newsletter_body,
		});
		return;
	}
	next();
}

module.exports = validate;