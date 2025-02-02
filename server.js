const express = require('express');
const http = require('http');
const {WebSocketServer} = require("ws");


const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer(
{
		server: server,
		autoPong: true
	}
)

console.log("starting server")

wss.on("connection", (client) => {
	console.log("connection connected")
	client.on("message", (data) => {
		console.log(data.toString())
		client.send("response")
	})
})

app.use(express.static("build/"))
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/build/index.html");
})

server.listen(8080, () => console.log("Listening at http://localhost:8080"));