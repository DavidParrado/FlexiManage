import { Router, Request, Response } from "express";
import Factura from "../models/Factura";
import Producto from "../models/Producto";

const router: Router = Router();

// Crear una factura
router.post("/", async (req: Request, res: Response) => {
  try {
    const { numero, cliente, productos } = req.body;
    let total = 0;

    // Calcular el total de la factura sumando el precio de cada producto
    for (const item of productos) {
      const producto = await Producto.findById(item.productoId);
      if (producto) {
        total += producto.precio * item.cantidad;
      } else {
        return res
          .status(404)
          .json({
            message: `Producto con ID ${item.productoId} no encontrado`,
          });
      }
    }

    const factura = new Factura({ numero, cliente, productos, total });
    await factura.save();
    res.status(201).json(factura);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la factura", error });
  }
});

// Obtener todas las facturas
router.get("/", async (req: Request, res: Response) => {
  try {
    const facturas = await Factura.find().populate("productos.productoId");
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las facturas", error });
  }
});

// Obtener una factura por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const factura = await Factura.findById(req.params.id).populate(
      "productos.productoId"
    );
    if (!factura) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }
    res.json(factura);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la factura", error });
  }
});

// Actualizar una factura
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { numero, cliente, productos } = req.body;
    let total = 0;

    // Recalcular el total al actualizar la factura
    for (const item of productos) {
      const producto = await Producto.findById(item.productoId);
      if (producto) {
        total += producto.precio * item.cantidad;
      } else {
        return res
          .status(404)
          .json({
            message: `Producto con ID ${item.productoId} no encontrado`,
          });
      }
    }

    const factura = await Factura.findByIdAndUpdate(
      req.params.id,
      { numero, cliente, productos, total },
      { new: true }
    );

    if (!factura) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    res.json(factura);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la factura", error });
  }
});

// Eliminar una factura
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const factura = await Factura.findByIdAndDelete(req.params.id);
    if (!factura) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }
    res.json({ message: "Factura eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la factura", error });
  }
});

export default router;
