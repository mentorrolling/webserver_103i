import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/589/83/png-transparent-account-avatar-contact-people-profile-user-basic-icon-thumbnail.png",
  },
  rol: {
    type: String,
    required: true,
    // enum: ["USER_ROLE", "ADMIN_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { password, ...usuario } = this.toObject();
  return usuario;
};

export default model("Usuario", UsuarioSchema);
