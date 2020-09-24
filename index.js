const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const routerNavigation = require("./src/router_navigation")
const socket = require("socket.io")

const app = express()
app.use(cors())

const http = require("http")
const server = http.createServer(app)
const io = socket(server)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev"))

app.use("/", routerNavigation)

server.listen(3000, () => {
  console.log("Listening on Port 3000")
})
