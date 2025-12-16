const pool = require('../database/');

/* **********************
 * Create new newsletter
 * The newsletter contains an id and published_date (created by default)
 * and a headline and body that are supplied by the user.
 * **********************/
async function createNewsletter(newsletter_headline, newsletter_body) {
	try {
		const sql = "INSERT INTO newsletter(newsletter_headline, newsletter_body) VALUES ($1, $2) RETURNING *";
		const data = await pool.query(sql, [newsletter_headline, newsletter_body]);
		return data.rows[0];
	} catch (error) {
		return error.message;
	}
}

/* **********************
 * List newsletters
 * **********************/
async function getAllNewsletters() {
	try {
		const sql = "SELECT newsletter_id, newsletter_headline, newsletter_published_date FROM newsletter ORDER BY newsletter_id";
		const data = await pool.query(sql);
		return data.rows;
	} catch (error) {
		return error.message;
	}
}

/* **********************
 * Check for an existing newsletter by Id
 * **********************/
async function checkExistingNewsletterID(newsletter_id) {
	try {
		const sql = "SELECT * FROM newsletter WHERE newsletter_id = $1";
		const newsletters =  await pool.query(sql, [newsletter_id]);
		return newsletters.rowCount;
	} catch (error) {
		return error.message;
	}
}

/* **********************
 * Get newsletter details
 * **********************/
async function getNewsletterById(newsletter_id) {
	try {
		const sql = "SELECT newsletter_id, newsletter_published_date, newsletter_headline, newsletter_body FROM newsletter WHERE newsletter_id = $1";
		const result = await pool.query(sql, [newsletter_id]);
		return result.rows[0];
	} catch (error) {
		return error.message;
	}
}

/* **********************
 * Update  newsletter
 * **********************/
async function updateNewsletter(newsletter_id, newsletter_headline, newsletter_body) {
	try {
		const sql = "UPDATE newsletter SET newsletter_headline = $1, newsletter_body = $2 WHERE newsletter_id = $3 RETURNING *";
		const result = await pool.query(sql, [
			newsletter_headline,
			newsletter_body,
			newsletter_id
		]);
		return result.rows[0]
	} catch (error) {
		console.error("model error: " + error);
	}
}


/* **********************
 * Delete newsletter
 * **********************/
async function deleteNewsletter(newsletter_id) {
	try {
		const sql = "DELETE FROM newsletter WHERE newsletter_id = $1";
		return await pool.query(sql, [newsletter_id]);
	} catch (error) {
		return new Error(error);
	}
}

module.exports = {
	createNewsletter, getAllNewsletters, getNewsletterById,
	deleteNewsletter, updateNewsletter, checkExistingNewsletterID
 };