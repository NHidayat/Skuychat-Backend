const helper = require('../helper/helper')
const { postRoom, getRoomByUserId, getRoomById, getMessageByRoomId, postMessage, getLatestMessage, checkRoomUsed } = require('../model/m_chat')
const { getUserById } = require('../model/m_user')

module.exports = {
    createRoom: async (request, response) => {
        const { sender_id, getter_id } = request.body
        const roomId = new Date().getTime()
        const setData_a = {
            room_id: roomId,
            sender_id,
            getter_id
        }
        const setData_b = {
            room_id: roomId,
            sender_id: getter_id,
            getter_id: sender_id
        }
        try {
            const checkRoom = await checkRoomUsed(sender_id, getter_id)
            if (checkRoom.length > 0) {
                const data = { room_id: checkRoom[0].room_id }
                return helper.response(response, 255, 'The room already created before', data)
            } else {
                const result_a = await postRoom(setData_a)
                const result_b = await postRoom(setData_b)

                const newResult = { result_a, result_b }
                return helper.response(response, 200, 'Success create room', newResult)
            }
        } catch (e) {
            console.log(e)
            return helper.response(response, 400, 'Bad Request', e)
        }
    },
    postMessage: async (request, response) => {
        const { user_id, message_text, room_id } = request.body

        if (user_id == '' || user_id == undefined ||
            room_id == '' || room_id == undefined ||
            message_text == '' || message_text == undefined) {

            return helper.response(response, 400, 'Data is not complete')
        }

        const setData = {
            user_id,
            room_id,
            message_text
        }

        try {
            const result = await postMessage(setData)
            return helper.response(response, 200, 'Success post message', result)
        } catch (e) {
            console.log(e);
            return helper.response(response, 400, 'Bad Request', e)
        }
    },
    getRoomByUser: async (request, response) => {
        const { id } = request.params

        try {
            const result = await getRoomByUserId(id)

            if (result.length > 0) {
                for (i = 0; i < result.length; i++) {
                    const getRoomData = await getUserById(result[i].getter_id)
                    const getLatestMsg = await getLatestMessage(result[i].room_id)
                    result[i].room_name = getRoomData[0].user_full_name
                    result[i].room_img = getRoomData[0].user_image
                    result[i].latest_message = getLatestMsg
                }
            }

            return helper.response(response, 200, `Success get room by user ID ${id}`, result)
        } catch (e) {
            console.log(e)
            return helper.response(response, 400, 'Bad Request', e)
        }
    },
    getRoomByid: async (request, response) => {
        const { user_id, room_id } = request.params

        try {
            const result = await getRoomById(user_id, room_id)
            if (result.length > 0) {
                const getGetterData = await getUserById(result[0].getter_id)
                result[0].room_name = getGetterData[0].user_full_name
                result[0].room_img = getGetterData[0].user_image

                const getMessage = await getMessageByRoomId(room_id)
                if (getMessage.length > 0) {
                    for (i = 0; i < getMessage.length; i++) {
                        const getSender = await getUserById(getMessage[i].user_id)
                        getMessage[i].sender_name = getSender[0].user_full_name
                        getMessage[i].sender_img = getSender[0].user_image
                    }
                }
                result[0].messages = getMessage
                return helper.response(response, 200, `Success get room ID ${room_id}`, result)
            } else {
                return helper.response(response, 200, `Room with ID ${room_id} & user ID ${user_id} is not found`)
            }
        } catch (e) {
            console.log(e)
            return helper.response(response, 400, 'Bad Request', e)
        }
    }
}