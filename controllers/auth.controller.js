const User = require('../models/User')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

const generateAccessToken = (id) => {
	const payload = {id}
	return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
	async registration(req, res) {
		try {
			//const validationErrors = validationResult(req)
			if (!validationResult(req).isEmpty()) return res.status(400).json({message: `Registration errors ${validationErrors}`})

			const {email, firstName, lastName, phoneNumber, gender, birthDate, password} = req.body
			const candidate = await User.findOne({ email })

			if (candidate) {
				res.status(400).json({message: 'This email is already used!'})
			}
			let hashPassword = bcrypt.hashSync(password, 9);
			const user = new User({ 
				email: email, 
				firstName: firstName,
				lastName: lastName, 
				phoneNumber: phoneNumber, 
				gender: gender, 
				birthDate: birthDate, 
				password: hashPassword 
			})

			await user.save()
			return res.json({message: 'User was successfully authorized'});
		} catch (error) {
			console.log(error)
			res.status(400).json({message: 'Registration error'})
		}
	}

	async login(req, res) {
		try {
			const {email, password} = req.body
			const user = await User.findOne({email})
			if (!user) {
				return res.status(400).json({ message: 'User not found' })
			} 
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return res.status(400).json({ message: 'Invalid password' })
			}
			const token = generateAccessToken(user._id)
			return res.json({token})
		} catch (error) {
			console.log(error)
			res.status(400).json({message: 'Login error'})
		}
	}

	async getUsers(req, res) { 
		try {
			const usersList = await User.find();
			res.json(usersList)
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = new authController()