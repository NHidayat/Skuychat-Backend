const router = require('express').Router()
const { addFriend, getFriendsByUser, } = require('../controller/c_friend')
const { authorizationUser } = require('../middleware/auth')

router.post('/add-friend', authorizationUser, addFriend)
router.get('/:id', authorizationUser, getFriendsByUser)

module.exports = router