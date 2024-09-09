import { Router } from "express";
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/usuarios.js";
const router = Router();

router.get("/", getUsers);

router.post("/", postUser);

router.put("/:id", putUser);

router.delete("/:id", deleteUser);

export default router;
