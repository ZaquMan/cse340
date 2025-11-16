const utilities = require("../utilities");

const devCont = {};

devCont.errorExample = async function (req, res, next) {
	try {
		throw new Error("Test Error");
	} catch (error) {
		next(error);
	}
}

module.exports = devCont;