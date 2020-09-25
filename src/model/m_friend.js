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
}