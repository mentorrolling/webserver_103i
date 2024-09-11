import { request, response } from "express";
import Usuario from "../models/usuario.js";

const getUsers = (req, res) => {
  res.json({
    message: "Peticion GET desde controllers",
  });
};

const postUser = async (req = request, res = response) => {
  const datos = req.body;

  const { nombre, email, password, rol } = datos;

  const usuario = new Usuario({ nombre, email, password, rol });

  //verificar el email
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya existe",
    });
  }

  //Guardar en la BD
  await usuario.save();

  res.status(201).json({
    msg: "Usuario creado con éxito!",
    usuario,
  });

  // const { nombre, rol } = req.body;

  // if (nombre) {
  //   res.json({
  //     message: "Peticion POST desde controllers",
  //     nombre,
  //     rol,
  //   });
  // } else {
  //   res.status(400).json({
  //     message: "Falta el nombre",
  //   });
  // }
};

const putUser = (req, res) => {
  res.json({
    message: "Peticion PUT desde controllers",
  });
};

const deleteUser = (req, res) => {
  res.json({
    message: "Peticion DELETE desde controllers",
  });
};
export { getUsers, postUser, putUser, deleteUser };
