const router = require('express').Router()
const { addFriend, getFriendsByUser, deleteFriend} = require('../controller/c_friend')
const { authorizationUser } = require('../middleware/auth')

router.post('/add-friend', authorizationUser, addFriend)
router.get('/:id', authorizationUser, getFriendsByUser)
router.delete('/delete-friend/:user_id/:friend_email', authorizationUser, deleteFriend)

module.exports = router