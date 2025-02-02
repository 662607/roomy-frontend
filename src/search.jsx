import "./search.css"
import React from "react"
import {createRoot} from "react-dom/client";

const socket = new WebSocket("ws://localhost:8080")
socket.onopen = () => {
	console.log("open")
}
socket.onclose = () => {
	console.log("close")
}
socket.onmessage = (e) => {
	console.log("message")
	console.log(e)
}
socket.onerror = (e) => {
	console.log("error")
	console.log(e)
}

export const Search = () => {
	return (
		<div className="App">
			<input
				className="searchbar"
				type='text' id='searchbar'
				name='name'
				placeholder='name/username'
				onChange={searchquery}
				onFocus={focus}
				onBlur={focusloss}
			/>
		</div>
	)
}

function searchquery(element) {
	socket.send(element.nativeEvent.data.toString())
}

function focus(element) {
	if(element.target.id === 'searchbar') {
		console.log("focused")
	}
}

function focusloss(element) {
	if(element.target.id === 'searchbar') {
		console.log("focusloss")
	}
}

createRoot(document.getElementById("root")).render(<Search />)