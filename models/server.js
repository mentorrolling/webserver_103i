// const express = require("express");
import express from "express";
import router from "../routes/usuarios.js";
import { dbConnection } from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.usuarioPath, router);
    // this.app.get("/api", (req, res) => {
    //   res.json({
    //     message: "Peticion GET",
    //   });
    // });

    // this.app.post("/api", (req, res) => {
    //   res.send("Petición POST");
    // });

    // this.app.put("/api/:id", (req, res) => {
    //   res.send("Petición PUT");
    // });

    // this.app.delete("/api/:id", (req, res) => {
    //   res.send("Petición DELETE");
    // });
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("Server online, port:", this.port)
    );
  }
}

export default Server;

// module.exports=Server
