import { Router, Request, Response } from "express";
import Usuario from "../models/Usuario";

const router: Router = Router();

// Crear un usuario
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const usuario = new Usuario({ nombre, email, password, rol });
    await usuario.save();
    res.status(201).json(usuario);
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
