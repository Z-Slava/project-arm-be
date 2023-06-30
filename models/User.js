const {Schema, model} = require('mongoose')

const User = new Schema({
	firstName: {type: String, required: true},
	lastName: { type: String, required: true }, 
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true }, 
	phoneNumber: { type: String, unique: true },
	gender: {type: String},
	birthDate: {type: String}
})

model.exports = model('User', User)