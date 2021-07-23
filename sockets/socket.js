const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("The Beatles"));
bands.addBand(new Band("Rolling Stones"));
bands.addBand(new Band("Eagles"));
bands.addBand(new Band("Led Zeppelin"));
bands.addBand(new Band("Dire Straights"));
bands.addBand(new Band("Manolos"));
bands.addBand(new Band("Linkin Park"));

// console.log(bands.getBands());

// Sockets Messages
io.on("connection", (client) => {
  console.log("Cliente conectado");
  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (mojon) => {
    console.log("Registro:", mojon);
  });

  client.on("voteBand", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
    console.log('Voto por: ' + payload.name);
  });

  client.on("addBand", (newBand) => {
    bands.addBand(new Band(newBand.name));
    io.emit("active-bands", bands.getBands());
    console.log('Nueva Banda: ' + newBand.name);
  });

  client.on("deleteBand", (bandToDelete) => {
    bands.deleteBand(bandToDelete.id);
    io.emit("active-bands", bands.getBands());
    console.log('Banda Eliminada: ' + bandToDelete.name);
  });

});
