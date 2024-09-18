import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Correo / contraseña nos son correctos",
      });
    }
    // si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Correo / contraseña nos son correctos",
      });
    }

    // verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo / contraseña nos son correctos",
      });
    }

    // genero el token

    res.status(202).json({
      msg: "Login ok",
      // token
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comuníquese con el administrador",
    });
  }
};

export { login };
