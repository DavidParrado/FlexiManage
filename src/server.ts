import express, { Application } from "express";
import mongoose from "mongoose";
// Importar rutas
import productoRoutes from "./routes/productos";
import facturaRoutes from "./routes/facturas";
import usuarioRoutes from "./routes/usuarios";
import proveedorRoutes from "./routes/proveedores";

const app: Application = express();

mongoose
  .connect(
    "mongodb+srv://juandparrado04:8o2Bt2DxgfJXv2iA@fleximanage.vinmr.mongodb.net/?retryWrites=true&w=majority&appName=FlexiManage"
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
