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
		socket.join(data.user_id)
	})

	socket.on('selectRoom', data => {
		socket.join(data.room_id)
	})

	socket.on("changeRoom", async (data) => {
	    await socket.leave(data.oldRoom)
	    socket.join(data.newRoom)
  	})

	socket.on('roomMessage', (data) => {
		io.to(data.room_id).emit('chatMessage', data)
	})

	socket.on('notif', (data) => {
		socket.broadcast.to(data.getter_id).emit('notifMessage', data)
	})

	socket.on('typing', (data) => {
		socket.broadcast.to(data.room_id).emit('typingMessage', data.user_full_name)
		// socket.broadcast.emit('typingMessage', data.user_full_name)
	})
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev"))

app.use("/", routerNavigation)

server.listen(3000, () => {
  console.log("Listening on Port 3000")
})
