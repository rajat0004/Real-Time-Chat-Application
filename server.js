const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (data) => {
  io.emit("chat message", { user: socket.username, text: data });
});

socket.on("set username", (username) => {
  socket.username = username;
  io.emit("chat message", { user: "System", text: `${username} joined the chat` });
});


  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
