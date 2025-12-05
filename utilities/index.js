const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
	let data = await invModel.getClassifications();
	let list = "<ul>";
	list += '<li><a href="/" title="Home page">Home</a></li>';
	data.rows.forEach(row => {
		list += "<li>";
		list +=
			'<a href="/inv/type/' +
			row.classification_id +
			'" title="See our inventory of ' +
			row.classification_name + 
			' vehicles">' +
			row.classification_name +
			"</a>";
		list += "</li>";
	});
	list += "</ul>";
	return list;
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
	let grid;
	if (data.length > 0) {
		grid = '<ul id="inv-display">';
		data.forEach(vehicle => {
			grid += '<li>';
			grid += '<a href="../../inv/detail/' + vehicle.inv_id
				+ '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
				+ ' details"><img src="' + vehicle.inv_thumbnail
				+ '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
				+ ' on CSE Motors" /></a>';
			grid += '<div class="namePrice">';
			grid += '<hr />';
			grid += '<h2>';
			grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
				+ vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
				+ vehicle.inv_make + ' ' + vehicle.inv_model + '</a>';
			grid += '</h2>';
			grid += '<span>$'
				+ new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
			grid += '</div>';
			grid += '</li>';
		});
		grid += '</ul>';
	} else {
		grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
	}
	return grid;
}

/* **************************************
* Build the inventory details table HTML
* ************************************ */
Util.buildInventoryDetails = async function (data) {
	let details = '<div class="vehicle-details">';
	if (data != null) {
		details += '<div class="vehicle-image">'
			+ '<img src="' + data.inv_image + '" '
			+ 'alt="Image of ' + data.inv_make + ' '
			+ data.inv_model + '"></div>';
		details += '<div class="detail-table">';
		details += '<div class="highlighted">'
			+ data.inv_make + ' ' + data.inv_model
			+ ' Details</div>';
		details += '<div class="highlighted"><span>'
			+ 'Price: </span > '
			+ Number(data.inv_price).toLocaleString('en-US', {
				style: 'currency', currency: 'USD',
				minimumFractionDigits: 0
			}) + '</div>';
		details += '<div><span class="highlighted'
			+ '">Description: </span>'
			+ data.inv_description + '</div>';
		details += '<div><span class="highlighted'
			+ '">Color: </span>'
			+ data.inv_color + '</div>';
		details += '<div><span class="highlighted"'
			+ '>Miles: </span>'
			+ data.inv_miles.toLocaleString('en-US')
			+ '</div>';
		details += '</div>';
	} else {
		details += `<p class="notice">Sorry, we don't have any details on this vehicle yet. Please check back later!</p>`;
	}
	details += '</div>';
	return details;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/* *************************************
 * Build the classification list drop-down menu
 * for use in forms
 ************************************** */
Util.buildClassificationList = async function (classification_id = null) {
	let data = await invModel.getClassifications();
	let classificationList =
		'<select name="classification_id" id="classification_id" required>';
	classificationList += '<option value = "">Choose a Classification</option>';
	data.rows.forEach((row) => {
		classificationList += `<option value="${row.classification_id}"`;
		if (classification_id != null &&
			row.classification_id == classification_id) {
			classificationList += " selected";
		}
		classificationList += `>${row.classification_name}</option>`;
	});
	classificationList += '</select>';
	return classificationList;
}

module.exports = Util;