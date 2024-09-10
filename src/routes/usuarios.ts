import { Router, Request, Response } from "express";
import Usuario from "../models/Usuario";
import bcrypt from "bcrypt";

const router: Router = Router();

// Crear un nuevo usuario con contraseña encriptada
router.post("/", async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;
    // Verificar si el email ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Encriptar la contraseña antes de guardar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword, // Guardar la contraseña encriptada
      rol: "cliente",
      telefono,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
});
// Obtener todos los usuarios
router.get("/", async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
});

// Obtener un usuario por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
});

// Actualizar un usuario
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, password, rol },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
});

// Eliminar un usuario
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
});

export default router;
