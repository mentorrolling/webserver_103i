import { request, response } from "express";
import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";
// import { validationResult } from "express-validator";

const getUsers = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;

  const usuarios = await Usuario.find({ estado: true })
    .limit(limite)
    .skip(desde);

  const total = await Usuario.countDocuments({ estado: true });
  res.json({
    total,
    usuarios,
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  res.json({
    usuario,
  });
};

const postUser = async (req = request, res = response) => {
  const datos = req.body;

  const { nombre, email, password, rol } = datos;

  const usuario = new Usuario({ nombre, email, password, rol });

  //Encritar contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  //Guardar en la BD
  await usuario.save();

  res.status(201).json({
    msg: "Usuario creado con éxito!",
    usuario,
  });
};

const putUser = async (req, res) => {
  const { id } = req.params;

  const { password, _id, email, ...resto } = req.body;
  console.log(resto);
  //Encritar contraseña
  const salt = bcrypt.genSaltSync();
  resto.password = bcrypt.hashSync(password, salt);

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.status(200).json({
    message: "Usuario actualizado",
    usuario,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  //Borrado físico
  // const usuarioBorrado = await Usuario.findByIdAndDelete(id);

  //Inactivar al usuario
  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    message: "Usuario eliminado",
    usuarioBorrado,
  });
};
export { getUsers, postUser, putUser, deleteUser, getUser };
