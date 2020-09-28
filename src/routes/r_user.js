const router = require('express').Router()
const { RegisterUser, loginUser, getUserById, patchUserById, patchLocation } = require('../controller/c_user')
const { authorizationUser } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')
router.post('/register', RegisterUser)
router.post('/login', loginUser)
router.get('/:id', authorizationUser, getUserById)
router.patch('/update/:id', authorizationUser, uploadImage, patchUserById)
router.patch('/update-location/:id', authorizationUser, patchLocation)

module.exports = router