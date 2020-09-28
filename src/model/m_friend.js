const db = require('../config/mysql')

module.exports = {
     getFriendByEmail: (user_id, friend_email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM friend WHERE user_id = ? AND friend_email = ?', [user_id, friend_email], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getFriendsByUser: (user_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM friend WHERE user_id = ? ', user_id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    deleteFriend: (user_id ,friend_email) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM friend WHERE user_id = ? AND friend_email = ? ',[user_id, friend_email], (error, result) => {
                if (!error) {
                    const newResult = {
                        user_id,
                        friend_email
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}