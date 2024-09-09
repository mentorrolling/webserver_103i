import { request, response } from "express";

const getUsers = (req, res) => {
  res.json({
    message: "Peticion GET desde controllers",
  });
};

const postUser = (req = request, res = response) => {
  const { nombre, puesto } = req.body;

  if (nombre) {
    res.json({
      message: "Peticion POST desde controllers",
      nombre,
      puesto,
    });
  } else {
    res.status(400).json({
      message: "Falta el nombre",
    });
  }
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
