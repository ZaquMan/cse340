// Required Resources
const utilities = require("../utilities/");
const newsletterModel = require("../models/newsletter-model");

/* *******************
 * Deliver newsletter creation view
 * ******************/
async function buildNewsletterCreation(req, res, next) {
	let nav = await utilities.getNav();
	res.render("newsletter/create", {
		title: "Create Newsletter",
		nav,
		errors: null,
	});
}

/* *******************
 * Create newsletter
 * ******************/
async function createNewsletter(req, res, next) {
	let nav = await utilities.getNav();
	const { newsletter_headline, newsletter_body } = req.body;

	const creationResults = await newsletterModel.createNewsletter(newsletter_headline, newsletter_body);
	if (creationResults) {
		req.flash("notice", "Your newsletter has been published.");
		res.status(201).redirect("/newsletter/view/" + creationResults.newsletter_id);
	} else {
		req.flash("notice", "Sorry, there was an issue publishing your newsletter.");
		res.status(500).render("newsletter/create", {
			title: "Create Newsletter",
			nav,
			errors: null,
			newsletter_headline,
			newsletter_body
		});
	}
}

/* *******************
 * Deliver newsletter list
 * ******************/
async function buildNewsletterList(req, res, next) {
	let nav = await utilities.getNav();
	let newsletterTable = await utilities.buildNewsletterTable(res);
	res.render("newsletter/list", {
		title: "Newsletters",
		nav,
		errors: null,
		newsletterTable
	});
}

/* *******************
 * Deliver newsletter details
 * ******************/
async function buildNewsletterDetails(req, res, next) {
	let nav = await utilities.getNav();
	const newsletter_id = parseInt(req.params.newsletter_id);
	const newsletterData = await newsletterModel.getNewsletterById(newsletter_id);
	if (newsletterData) {
			const timestamp = Date.parse(newsletterData.newsletter_published_date);
			const publish_date = new Intl.DateTimeFormat("en-US", {
				month: "short",
				day: "2-digit",
				year: "numeric"
			}).format(timestamp);

		res.render("newsletter/view", {
			title: newsletterData.newsletter_headline,
			nav,
			errors: null,
			newsletter_body: newsletterData.newsletter_body,
			newsletter_published_date: publish_date,
		});
	} else {
		req.flash("notice", "That newsletter does not exist.");
		res.redirect("/newsletter/");
	}
}

async function buildNewsletterModification(req, res, next) {
	let nav = await utilities.getNav();
	const newsletter_id = parseInt(req.params.newsletter_id);
	const newsletterData = await newsletterModel.getNewsletterById(newsletter_id);
	if (newsletterData) {
		res.render("newsletter/update", {
			title: 'Update "' + newsletterData.newsletter_headline + '"',
			nav,
			errors: null,
			newsletter_id,
			newsletter_headline: newsletterData.newsletter_headline,
			newsletter_body: newsletterData.newsletter_body,
			newsletter_published_date: newsletterData.newsletter_published_date,
		});
	} else {
		req.flash("notice", "That newsletter does not exist.");
		res.redirect("/newsletter/");
	}
}

async function updateNewsletter(req, res, next) {
	const { newsletter_id, newsletter_body, newsletter_headline, newsletter_published_date } = req.body;
	const updateResults = await newsletterModel.updateNewsletter(newsletter_id, newsletter_headline, newsletter_body);

	if (updateResults) {
		req.flash("notice", "The newsletter has been updated.");
		res.status(201).redirect("/newsletter/view/" + newsletter_id);
	} else {
		req.flash("notice", "Your update was not able to be saved.");
		res.status(500).render("newsletter/update", {
			title: "Update " + newsletter_headline,
			nav,
			errors: null,
			newsletter_id,
			newsletter_body: newsletter_body,
			newsletter_published_date: newsletter_published_date,
		});
	}
}

/* *******************
 * Deliver newsletter deletion confirmation
 * ******************/
async function buildNewsletterDeleteConf(req, res, next) {
	let nav = await utilities.getNav();
	let newsletter_id = parseInt(req.params.newsletter_id);
	const newsletterData = await newsletterModel.getNewsletterById(newsletter_id);
	const timestamp = Date.parse(newsletterData.newsletter_published_date);
	const publish_date = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric"
	}).format(timestamp);

	res.render("newsletter/delete", {
		title: `Delete Newsletter`,
		nav,
		errors: null,
		newsletter_id,
		newsletter_headline: newsletterData.newsletter_headline,
		newsletter_body: newsletterData.newsletter_body,
		newsletter_published_date: publish_date
	})
}

/* *******************
 * Handle newsletter deletion
 * ******************/
async function deleteNewsletter(req, res, next) {
	const { newsletter_id } = req.body;
	const deleteResults = await newsletterModel.deleteNewsletter(newsletter_id);

	if (deleteResults) {
		req.flash("notice", "The newsletter was deleted");
		res.status(200).redirect("/newsletter/");
	} else {
		req.flash("notice", "The newsletter was unable to be deleted.");
		res.status(500).redirect("/newsletter/");
	}
}

module.exports = {
	buildNewsletterCreation, createNewsletter, buildNewsletterList,
	buildNewsletterDetails, buildNewsletterDeleteConf, deleteNewsletter,
	updateNewsletter, buildNewsletterModification,
}