const socket = io();

const inviteCode = window.location.pathname.substr(7);
const ul = document.getElementById("chat");


const addMessage = (message) => {

    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

socket.emit("enterRoom", inviteCode);

socket.on("welcome", () => {
    addMessage("SomeBody Joined!");
})

socket.on("bye", () => {
    addMessage("SomeBody left!");
})