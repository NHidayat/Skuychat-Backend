const route = require('express').Router()

const user = require('./routes/r_user')
const friend = require('./routes/r_friend')
const chat = require('./routes/r_chat')

route.use('/user', user)
route.use('/friend', friend)
route.use('/chat', chat)

module.exports = route
