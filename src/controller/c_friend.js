const helper = require('../helper/helper')
const { getUserByEmail, getUserById, postFriend} = require('../model/m_user')
const { getFriendByEmail, getFriendsByUser, deleteFriend  } = require('../model/m_friend')

module.exports = {
    addFriend: async (request, response) => {
        const { user_id, friend_email } = request.body
        if (
            user_id == '' || user_id == undefined ||
            friend_email == '' || friend_email == undefined
        ) {
            return helper.response(403, 'The data is not complete')
        }

        try {
            const checkUser = await getUserById(user_id)
            if (checkUser.length > 0) {
                const result_user_email = checkUser[0].user_email

                if (result_user_email == friend_email) {
                    return helper.response(response, 404, `Sorry, ${friend_email} is your own email :)`)
                } else {
                    const checkFriendData = await getUserByEmail(friend_email)
                    if (checkFriendData.length > 0) {
                        const checkFriendList = await getFriendByEmail(user_id, friend_email)

                        if (checkFriendList.length > 0) {
                            return helper.response(response, 403, `Sorry, user with email ${friend_email} already friend with you`)

                        } else {
                            const friend_name = checkFriendData[0].user_name
                            const setData = { user_id, friend_email }
                            const result = await postFriend(setData)
                            return helper.response(response, 200, `Congratulation! now you are friends with ${friend_name}`, result)
                        }
                    } else {
                        return helper.response(response, 404, `Sorry, user with email ${friend_email} is not found!`)
                    }
                }
            } else {
                return helper.response(response, 404, `User by ID ${user_id} is not found!`)
            }
        } catch (e) {
            return helper.response(response, 400, 'Bad Request')
        }
    },
    getFriendsByUser: async (request, response) => {
    	const { id } = request.params

    	try {
    		const result = await getFriendsByUser(id)
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    const getDataFriend = await getUserByEmail(result[i].friend_email)
                    result[i].friend_id = getDataFriend[0].user_id 
                    result[i].friend_name = getDataFriend[0].user_full_name 
                    result[i].friend_img = getDataFriend[0].user_image

                }
            }
            
    		return helper.response(response, 200, `Success get friends by user ID ${id}`, result)
    	} catch(e) {
    		console.log(e)
    		return helper.response(response, 400, 'Bad Request')
    	}
    },
    deleteFriend: async (request, response) => {
        const { user_id, friend_email } = request.params

        if (
            user_id == '' || user_id == undefined ||
            friend_email == '' || friend_email == undefined
            ) {
            return helper.response(response, 403, 'Data is not complete')
        }
        try {
            const checkData = await getFriendByEmail(user_id, friend_email)

            if (checkData.length < 1) {
                return helper.response(response, 403, 'Friends data is not found')
            } else {
                const result = await deleteFriend(user_id, friend_email)
                return helper.response(response, 200, 'Success delete friends', result)
            }
        } catch(e) {
            console.log(e);
            return helper.response(response, 400, 'Bad Request', e)
        }

    }
}