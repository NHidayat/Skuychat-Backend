const helper = require('../helper/helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { postUser, getUserByEmail, getUserById, postFriend, patchUser } = require('../model/m_user')

module.exports = {
    RegisterUser: async (request, response) => {
        const { user_name, user_email, user_password, user_confirm_password } = request.body

        if (
            user_name == '' || user_name == undefined ||
            user_email == '' || user_email == undefined ||
            user_password == '' || user_password == undefined ||
            user_confirm_password == '' || user_confirm_password == undefined
        ) {
            return helper.response(response, 400, 'Your data is not complete!')
        }

        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(user_password, salt)
        const email_validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (email_validation.test(user_email) == false) {
            return helper.response(response, 403, 'Your email is not valid')

        } else if (user_password.length < 6 || user_password.length > 20) {
            return helper.response(response, 403, 'Password must be between 6 to 20 characters')

        } else if (user_password !== user_confirm_password) {
            return helper.response(response, 403, 'Password is not match')
        }

        setDataUser = {
            user_name: user_name,
            user_full_name: user_name,
            user_email,
            user_password: encryptPassword
        }

        try {
            const checkUser = await getUserByEmail(user_email)
            if (checkUser.length > 0) {
                return helper.response(response, 403, 'This email already registered')
            } else {
                const result = await postUser(setDataUser)
                return helper.response(response, 200, 'Success register user', result)
            }
        } catch (e) {
            console.log(e)
            return helper.response(response, 400, 'Bad Request', e)
        }
    },
    loginUser: async (request, response) => {
        const { user_email, user_password } = request.body
        try {
            const checkUser = await getUserByEmail(user_email)

            if (checkUser.length > 0) {
                const checkPassword = bcrypt.compareSync(user_password, checkUser[0].user_password)

                if (checkPassword) {
                    const { user_id, lat } = checkUser[0]

                    let payload = {
                        user_id,
                        lat,
                    }
                    const token = jwt.sign(payload, 'SKUYYY', { expiresIn: 3600 * 24 })
                    payload = { ...payload, token }

                    const updateStatus = await patchUser({ user_status: 1 }, user_id)

                    return helper.response(response, 200, 'Success Login', payload)
                } else {
                    return helper.response(response, 403, 'Wrong Password')
                }

            } else {
                return helper.response(response, 403, 'Email not Registered')
            }
        } catch (e) {
            return helper.response(response, 400, 'Bad Request', e)
        }
    },
    getUserById: async (request, response) => {
        const { id } = request.params
        try {
            const result = await getUserById(id)
            if (result.length > 0) {
                return helper.response(response, 200, `Success get user by ID ${id}`, result)
            } else {
                return helper.response(response, 404, `User by ID ${id} is not found!`, result)
            }
        } catch (e) {
            console.log(e)
            return helper.response(response, 400, 'Bad Request', e)
        }
    },
    patchUserById: async (request, response) => {
        const { id } = request.params
        const { user_name, user_full_name, user_bio, user_phone } = request.body
        const user_image = request.file
        try {
            if (
                user_name == '' || user_name == undefined ||
                user_full_name == '' || user_full_name == undefined ||
                user_bio == undefined ||
                user_phone == undefined
            ) {
                return helper.response(response, 400, "The data you've entered is not complete!")
            }
            let setData = {
                user_name: user_name,
                user_full_name,
                user_bio,
                user_phone
            }
            const checkData = await getUserById(id)

            if (checkData.length > 0) {
                let result = ''
                if (user_image == undefined || user_image == '') {
                    setData = setData
                } else {
                    setData.user_image = user_image.filename
                    const image = checkData[0].user_image
                    if (image !== null) {
                        fs.unlink(`./uploads/${image}`, function(err) {
                            if (err) throw err;
                        })
                    }
                }

                result = await patchUser(setData, id)
                return helper.response(response, 200, "User data updated", result)
            } else {
                return helper.response(response, 404, `User with ${id} is not found!`)
            }
        } catch (e) {
            console.log(e)
            return helper.response(response, 400, "Bad Request", e)
        }
    },
    patchLocation: async (request, response) => {
        const { id } = request.params
        const { lat, lng } = request.body
        try {
            if (
                lat == '' || lat == undefined ||
                lng == '' || lng == undefined
            ) {
                return helper.response(response, 400, "The data you've entered is not complete!")
            }
            let setData = { lat, lng }

            const checkData = await getUserById(id)

            if (checkData.length > 0) {
                const result = await patchUser(setData, id)
                return helper.response(response, 200, "Location data updated", result)
            } else {
                return helper.response(response, 404, `User with ID ${id} is not found!`)
            }
        } catch (e) {
            console.log(e)
            return helper.response(response, 400, "Bad Request", e)
        }
    },
    patchStatus: async (request, response) => {

        try {
            const { id } = request.params
            const { user_status } = request.body

            if ((user_status !== "1" && user_status !== "0") || user_status == undefined) {
                return helper.response(response, 403, "User status must be 1 or 0")
            }
            const checkUser = await getUserById(id)

            if (checkUser.length > 0) {
                const setData = { user_status }
                const result = await patchUser({ user_status }, id)
                const status = user_status == 1 ? 'Online' : 'Offline'

                return helper.response(response, 200, `User status updated to ${status}`, setData)
            } else {
                return helper.response(response, 404, `User with ID ${id} is not found!`)
            }
        } catch (e) {
            console.log(e);
            return helper.response(response, 400, "Bad Request", e)
        }
    }
}