const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

let username = prompt("Enter your username:");
socket.emit("set username", username);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const item = document.createElement("li");
  if (data.user === "System") {
    item.innerHTML = `<em> ${data.text}</em>`;
  } else {
    item.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
  }
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
