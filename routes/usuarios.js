import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { emailExiste, rolValido } from "../helpers/db-validators.js";

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

router.put("/:id", putUser);

router.delete("/:id", deleteUser);

export default router;
