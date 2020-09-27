const router = require('express').Router()
const { createRoom, getRoomByUser, postMessage, getRoomByid } = require('../controller/c_chat')
const { authorizationUser } = require('../middleware/auth')

router.post('/create-room', authorizationUser, createRoom)
router.post('/post-message', authorizationUser, postMessage)
router.get('/user/:id', authorizationUser, getRoomByUser)
router.get('/:user_id/:room_id', authorizationUser, getRoomByid)

module.exports = router