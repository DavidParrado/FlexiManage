import express, { Application } from "express";
import mongoose from "mongoose";
// Importar rutas
import productoRoutes from "./routes/productos";
import facturaRoutes from "./routes/facturas";
import usuarioRoutes from "./routes/usuarios";
import proveedorRoutes from "./routes/proveedores";
import dotenv from "dotenv";

// Cargar variables de entorno desde .env
dotenv.config();

const app: Application = express();

mongoose
  .connect(
    process.env.MONGODB_URL || "mongodb://localhost/inventario"
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB", err));

app.use(express.json());

app.use("/api/productos", productoRoutes); // Usar las rutas de productos
app.use("/api/facturas", facturaRoutes); // Usar las rutas de facturas
app.use("/api/usuarios", usuarioRoutes); // Usar las rutas de usuarios
app.use("/api/proveedores", proveedorRoutes); // Usar las rutas de proveedores

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
