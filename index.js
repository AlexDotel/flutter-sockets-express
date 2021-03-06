const express = require("express");
const path = require("path");
require("dotenv").config();

// App de Express
const app = express();

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require('./sockets/socket');

// Path Publico
const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

// Servidor escuchando el ENV
server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`Servidor activo, puerto`, process.env.PORT);
});
