const router = require('express').Router()
const { RegisterUser, loginUser, getUserById } = require('../controller/c_user')
const { authorizationUser } = require('../middleware/auth')

router.post('/register', RegisterUser)
router.post('/login', loginUser)
router.get('/:id', authorizationUser, getUserById)

module.exports = router