const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', [
	check('email', 'Email field cannot be empty').notEmpty(),
	check('firstName', 'firstName field cannot be empty').notEmpty(),
	check('lastName', 'lastName field cannot be empty').notEmpty(),
	check('password', 'Password field cannot be empty').notEmpty()
], authController.registration)
router.post('/login', authController.login)
router.get('/users', authMiddleware, authController.getUsers)

module.exports = router