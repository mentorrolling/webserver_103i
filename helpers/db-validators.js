import Role from "../models/rol.js";
import Usuario from "../models/usuario.js";

const rolValido = async (rol) => {
  const esRolValido = await Role.findOne({ rol });

  if (!esRolValido) {
    throw new Error(`${rol} no es un rol válido`);
  }
};

const emailExiste = async (email) => {
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El correo ${email} ya existe`);
  }
};

export { rolValido, emailExiste };
