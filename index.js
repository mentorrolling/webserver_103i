// const express = require("express");
// import express from "express";

// const app = express();
// const port = 3000;

//req = request => petición del cliente
//res = response => Respuesta del servidor
// app.get("/api", (req, res) => {
//   res.send("Petición GET");
// });

// app.post("/api", (req, res) => {
//   res.send("Petición POST");
// });

// app.put("/api/:id", (req, res) => {
//   res.send("Petición PUT");
// });

// app.delete("/api/:id", (req, res) => {
//   res.send("Petición DELETE");
// });

// app.use(express.static("public"));

// app.listen(port, () => console.log("Server online, port:", port));

import Server from "./models/server.js";

const server = new Server();
// console.log(process.env);
server.listen();
