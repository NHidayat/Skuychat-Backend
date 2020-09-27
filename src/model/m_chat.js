const db = require('../config/mysql')

module.exports = {
     postRoom: (data) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO room_chat SET ?', data, (error, result) => {
                !error ? resolve(data) : reject(new Error(error))
            })
        })
    },
     postMessage: (data) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO message SET ?', data, (error, result) => {
                !error ? resolve(data) : reject(new Error(error))
            })
        })
    },
    getRoomByUserId: (data) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM room_chat WHERE sender_id = ?', data, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getRoomById: (roomId, userId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM room_chat WHERE sender_id = ? AND room_id = ?', [roomId, userId], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getMessageByRoomId: (room_id) => {
         return new Promise((resolve, reject) => {
            db.query('SELECT * FROM message WHERE room_id = ?', room_id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getLatestMessage: (room_id) => {
         return new Promise((resolve, reject) => {
            db.query('SELECT * FROM message WHERE room_id = ? ORDER BY message_created_at DESC LIMIT 1', room_id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
}