import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const routerCat = Router();

routerCat.get("/", (req, res) => {
  res.json({
    msg: "GET Categorias",
  });
});
routerCat.post("/", (req, res) => {
  res.json({
    msg: "POST Categorias",
  });
});
routerCat.put("/:id", (req, res) => {
  res.json({
    msg: "PUT Categorias",
  });
});
routerCat.delete("/:id", (req, res) => {
  res.json({
    msg: "DELETE Categorias",
  });
});

export default routerCat;
