const express = require('express');
const http = require('http');
const {WebSocketServer} = require("ws");
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { httpOnly: true, secure: false }
	})
);

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
	res.redirect("/dashboard")
})

app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/build/login.html");
})

app.get("/signup", (req, res) => {
	res.sendFile(__dirname + "/build/signup.html");
})

app.get("/auth", (req, res) => {
	console.log(req.toString())
})

function checkAuth(req, res, next) {
	if (!req.session.user) {
		return res.redirect("/login");
	}
	next();
}

app.get("/dashboard", checkAuth, (req, res) => {
	res.sendFile(__dirname + "/build/dashboard.html");
})

app.get("/search", (req, res) => {
	res.sendFile(__dirname + "/build/search.html");
})


server.listen(8080, () => console.log("Listening at http://localhost:8080"));