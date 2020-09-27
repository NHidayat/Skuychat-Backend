const multer = require('multer')
const helper = require('../helper/helper')

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './uploads/')
    },
    filename: (request, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname)
    }
})

const fileFilter = (request, file, callback) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        callback(null, true)
    } else {
        callback(new Error("File format should be PNG, JPG, or JPEG"), false)
    }
}

const limits = { fileSize: 1024 * 1024 * 1 }

let upload = multer({ storage, fileFilter, limits }).single('user_image')

const uploadFilter = (request, response, next) => {
    upload(request, response, (err) => {
        if (err instanceof multer.MulterError) {
            return helper.response(response, 400, err.message)
        } else if (err) {
            return helper.response(response, 400, err.message)
        }
        next()
    })
}

module.exports = uploadFilter