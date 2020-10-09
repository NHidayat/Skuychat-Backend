require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const routerNavigation = require("./src/router_navigation")
const socket = require("socket.io")

const app = express()
app.use(cors())
app.use(express.static('uploads'))

const http = require("http")
const server = http.createServer(app)
const io = socket(server)

io.on("connection", (socket) => {
	console.log("Socket.io Connect")

	socket.on('start', data => {
		console.log(data)
		socket.join(data)
	})

	socket.on('roomMessage', (data) => {
		// console.log(data.room_id)
		socket.join(data.room_id)
		io.to(data.room_id).emit('chatMessage', data)
		// io.emit('chatMessage', data)
	})

	socket.on('typing', (data) => {
		socket.join(data.room_id)
		// socket.broadcast.emit('typingMessage', data.user_full_name)
		socket.broadcast.to(data.room_id).emit('typingMessage', data.user_full_name)
		// console.log(data.room_id)
	})
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev"))

app.use("/", routerNavigation)

server.listen(3000, () => {
  console.log("Listening on Port 3000")
})
