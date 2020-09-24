const jwt = require('jsonwebtoken')
const helper = require('../helper/helper')

module.exports = {
    authorizationUser: (request, response, next) => {
        let token = request.headers.authorization
        if (token) {
            token = token.split(' ')[1]
            jwt.verify(token, 'SKUYYY', (error, result) => {
                if (
                    (error && error.name === 'JsonWebTokenError') ||
                    (error && error.name === 'TokenExpiredError')
                ) {
                    return helper.response(response, 403, error.message)
                } else {
                    // if (result.user_status !== 1) {
                    //     return helper.response(response, 403, "Your account is not active, please contact the admin")
                    // } else {
                    //     request.token = result
                    //     next()
                    // }
                    request.token = result
                    next()
                }
            })
        } else {
            return helper.response(response, 403, "Please login first")
        }
    }
}