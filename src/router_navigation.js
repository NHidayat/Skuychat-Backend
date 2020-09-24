const route = require('express').Router()

const user = require('./routes/r_user')

route.use('/user', user)

module.exports = route
