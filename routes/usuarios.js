import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
  emailExiste,
  existeUsuarioPorId,
  rolValido,
} from "../helpers/db-validators.js";

import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/usuarios.js";

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    // check("password","La contraseña debe tener mínimo 6 caracteres y máximo 16").isLength({min:6,max:16})
    check(
      "password",
      "La contraseña debe tener mínimo 8 caracteres, mayúsculas, minúsculas, números y simbolos especiales"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(emailExiste),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUser
);

export default router;
