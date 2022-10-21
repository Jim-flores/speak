const express = require("express");

const io = require("socket.io")({
  path: "/webrtc",
});

const app = express();
const port = 8080;

app.get("/", (req, res) => res.send("Hello, WebRTC!!"));

const server = app.listen(port, () => {
  console.log(`WebRTC App is listening at port ${port}`);
});
