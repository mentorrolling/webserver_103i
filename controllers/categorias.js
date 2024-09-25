import Categoria from "../models/categoria.js";

const traerCategorias = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;

  const categorias = await Categoria.find({ estado: true })
    .limit(limite)
    .skip(desde)
    .populate("usuario", "nombre email rol");

  const total = await Categoria.countDocuments({ estado: true });
  res.json({
    total,
    categorias,
  });
};

const agregarCategoria = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();

  //si existe esa categoría
  const categoriaEncontrada = await Categoria.findOne({ nombre });
  if (categoriaEncontrada) {
    return res.status(400).json({
      msg: `La categoría ${nombre} ya existe`,
    });
  }

  const usuario = req.usuario._id;

  const categoria = new Categoria({ nombre, usuario });

  categoria.save();

  res.status(200).json({
    msg: "Categoría guardada",
    categoria,
  });
};

const actualizarCategoria = (req, res) => {};

const borrarCategoria = (req, res) => {};

export {
  traerCategorias,
  agregarCategoria,
  actualizarCategoria,
  borrarCategoria,
};
