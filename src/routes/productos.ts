import { Router, Request, Response } from "express";
import Producto from "../models/Producto";

const router: Router = Router();

// Crear un producto
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nombre, precio, cantidad, descripcion } = req.body;
    const producto = new Producto({ nombre, precio, cantidad, descripcion });
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
});

// Obtener un producto por id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const producto = await Producto.find({ _id: req.params.id });
    console.log(producto);
    // Metodo de ordenamiento
    res.json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el producto por id", error });
  }
});

// Obtener todos los productos
router.get("/", async (req: Request, res: Response) => {
  try {
    // Producto[] => [{ nombre: 'Xbox 360' }, { nombre: 'Play 2'}] ==> Metodo de ordenamiento
    const productos = await Producto.find();
    // Metodo de ordenamiento
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
});

// Actualizar un producto
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { nombre, precio, cantidad, descripcion } = req.body;
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, precio, cantidad, descripcion },
      { new: true }
    );
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
});

// Eliminar un producto
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    // const producto = await Producto.findByIdAndUpdate(req.params.id, {
    //   status: false,
    // });
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
});

export default router;
