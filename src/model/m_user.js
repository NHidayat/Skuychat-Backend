const db = require('../config/mysql')

module.exports = {
     getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE user_email = ?', email, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE user_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postUser: (setData) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user SET ?', setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        user_id: result.insertId,
                        ...setData
                    }
                    delete newResult.user_password
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    postFriend: (setData) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO friend SET ?', setData, (error, result) => {
                !error ? resolve(setData) : reject(new Error(error))
            })
        })
    },
    patchUser: (setData, id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET ? WHERE user_id =  ?', [setData, id], (error, result) => {
                !error ? resolve(setData) : reject(new Error(error))
            })
        })
    }
}