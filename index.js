require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/authRouter')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json())
app.use('/auth', authRouter)
const start = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION_STRING)
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`)
		})
	} catch (e) {
		console.log(e);
	}
}

start()