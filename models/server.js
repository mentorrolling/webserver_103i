// const express = require("express");
import express from "express";

//Importo los cors
import cors from "cors";

import router from "../routes/usuarios.js";
import routerAuth from "../routes/auth.js";
import routerCat from "../routes/categorias.js";
import routerProd from "../routes/productos.js";
import routerSearch from "../routes/buscar.js";

import { dbConnection } from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.categoriaPath = "/api/categorias";
    this.productoPath = "/api/productos";
    this.buscarPath = "/api/buscar";

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.usuarioPath, router);
    this.app.use(this.authPath, routerAuth);
    this.app.use(this.categoriaPath, routerCat);
    this.app.use(this.productoPath, routerProd);
    this.app.use(this.buscarPath, routerSearch);
  }

  middlewares() {
    //Middleware para Cors
    this.app.use(cors());

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
