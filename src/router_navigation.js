const route = require('express').Router()

const user = require('./routes/r_user')
const friend = require('./routes/r_friend')

route.use('/user', user)
route.use('/friend', friend)

module.exports = route
