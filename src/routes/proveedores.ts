import { Router, Request, Response } from "express";
import Proveedor from "../models/Proveedor";

const router: Router = Router();

// Crear un proveedor
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nombre, contacto, direccion, email, telefono } = req.body;

    const proveedor = new Proveedor({
      nombre,
      contacto,
      direccion,
      email,
      telefono,
    });
    await proveedor.save();
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proveedor", error });
  }
});

// Obtener todos los proveedores
router.get("/", async (req: Request, res: Response) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los proveedores", error });
  }
});

// Obtener un proveedor por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el proveedor", error });
  }
});

// Actualizar un proveedor
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { nombre, contacto, direccion, email, telefono } = req.body;

    const proveedor = await Proveedor.findByIdAndUpdate(
      req.params.id,
      { nombre, contacto, direccion, email, telefono },
      { new: true }
    );

    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json(proveedor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el proveedor", error });
  }
});

// Eliminar un proveedor
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.json({ message: "Proveedor eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el proveedor", error });
  }
});

export default router;
