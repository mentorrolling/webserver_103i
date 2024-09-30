import { response, request } from "express";
import mongoose, { trusted } from "mongoose";

const { ObjectId } = mongoose.Types;

//importar los modelos que usaré en la búsqueda
import Categoria from "../models/categoria.js";
import Producto from "../models/producto.js";

//Colecciones permitidas
const coleccionesPermitidas = ["categorias", "productos"];

//función para buscar por categoría
const buscarCategoria = async (termino, res = response) => {
  //verificar si en vez del nombre me manda el id
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const categoria = await Categoria.findById(termino).populate(
      "usuario",
      "nombre"
    );

    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  //realizar búsqueda por nombre

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  }).populate("usuario", "nombre");

  res.json({
    results: categorias,
  });
};

const buscar = async (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  //verificar si la coleccion es válida
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategoria(termino, res);
      break;
    case "productos":
      buscarProducto(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "No se generaron las búsquedas",
      });
      break;
  }
};

export default buscar;
