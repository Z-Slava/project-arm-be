const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')
module.exports = function(req, res, next) {
	if (req.method === "OPTIONS") {
		next() // next middleware
	}

	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			res.status(403).json({ message: `User isn't authorized` })
		}
		const decodedData = jwt.verify(token, secret) //decoded user info
		next()
	} catch (error) {
		console.log(`Error: ${error}`);
		res.status(403).json({ message: `User isn't authorized` })
	}
}