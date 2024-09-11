import { Router, Request, Response } from "express";
import xlsx from 'xlsx';
import multer from 'multer';
import Producto from "../models/Producto";
import { bubbleSort, quickSort } from "../utils/sort";

const router: Router = Router();

// Configuración de multer para cargar archivos
const upload = multer({ dest: 'uploads/' });


// Función para importar productos desde un archivo Excel y guardarlos en la base de datos
export const importarProductosDesdeExcel = async (filePath: string) => {
  try {
    // Leer el archivo Excel
    const workbook = xlsx.readFile(filePath);

    // Seleccionar la primera hoja de trabajo
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convertir los datos de la hoja a JSON
    const productosData = xlsx.utils.sheet_to_json(worksheet);

    // Recorrer los datos y guardarlos en la base de datos
    const productos = productosData.map((data: any) => ({
      nombre: data.Nombre || '',
      precio: data.Precio || 0,
      marca: data.Marca || '',
      cantidad: data.Cantidad || 0,
      descripcion: data.Descripcion || '',
      proveedor_id: data.Proveedor_id
    }));

    // Insertar los productos en la base de datos
    await Producto.insertMany(productos);

    console.log('Productos importados exitosamente');
  } catch (error) {
    console.error('Error al importar productos desde Excel:', error);
    throw error;
  }
};

// Función para ordenar productos por precio usando Bubble Sort
export const ordenarProductosPorPrecio = async (orden: 'asc' | 'desc') => {
  try {
    const productos = await Producto.find(); // Obtener todos los productos

    // Usar bubbleSort con una función de comparación personalizada para el precio
    const productosOrdenados = quickSort(productos, (a, b) => {
      return orden === 'asc' ? a.precio > b.precio : a.precio < b.precio;
    });

    return productosOrdenados; // Retornar los productos ordenados
  } catch (error) {
    console.error('Error al ordenar productos:', error);
    throw error;
  }
};

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

// Ruta para obtener productos ordenados por precio
router.get('/ordenar', async (req, res) => {
  const { orden } = req.query; // Recibir parámetro 'asc' o 'desc'
  
  try {
    const productosOrdenados = await ordenarProductosPorPrecio(orden as 'asc' | 'desc');
    res.status(200).json(productosOrdenados);
  } catch (error) {
    res.status(500).json({ message: 'Error al ordenar productos', error });
  }
});

// Obtener un producto por id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const producto = await Producto.find({ _id: req.params.id });
    // Metodo de ordenamiento
    res.json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el producto por id", error });
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

// Ruta para importar productos desde Excel
router.post('/importar-productos', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const filePath = req.file?.path;

    if (!filePath) {
      return res.status(400).json({ message: 'No se proporcionó un archivo' });
    }

    await importarProductosDesdeExcel(filePath);

    res.status(200).json({ message: 'Productos importados exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al importar productos', error });
  }
});

//! Ruta para eliminar todos los productos
router.delete('/', async(req: Request, res: Response) => {
  try {
    // const producto = await Producto.findByIdAndUpdate(req.params.id, {
    //   status: false,
    // });
    await Producto.deleteMany();
    res.json({ message: "Todos los productos han sido eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar todos los productos", error });
  }
})

export default router;
