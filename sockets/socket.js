const { io } = require("../index");

// Sockets Messages
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje!!!", payload);

    io.emit("mensaje", "Saludame a " + payload);
  });

  client.on("emitirSaludo", (payload) => {
    console.log("Mensaje para el server: ", payload);
    // io.emit("nuevoMensaje", "Saludos " + payload); //Emite a todos
    client.broadcast.emit("nuevoMensaje", payload); //Emite a todos menos al emisor
  });
});
