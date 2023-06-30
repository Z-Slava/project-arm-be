const User = require('../models/User')

class authController {
	async registration(req, res) {
		try {
			const {email, password} = req.body
			const candidate = await User.findOne({email})

			if (candidate) {
				res.status(400).json({msg: 'This email is already used!'})
			}
			// const user = 
		} catch (error) {
			console.log(error)
			res.status(400).json({msg: 'Registration error'})
		}
	}
	async login(req, res) {
		try {
			
		} catch (error) {
			console.log(error)
			res.status(400).json({msg: 'Login error'})
		}
	}
	async getUsers(req, res) { 
		try {
			res.json(`server works!`)
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = new authController()