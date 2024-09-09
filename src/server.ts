import express, { Application } from "express";
import mongoose from "mongoose";
import productoRoutes from "./routes/productos"; // Importar rutas

const app: Application = express();

mongoose
  .connect(
    "mongodb+srv://juandparrado04:8o2Bt2DxgfJXv2iA@fleximanage.vinmr.mongodb.net/?retryWrites=true&w=majority&appName=FlexiManage"
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB", err));

app.use(express.json());

app.use("/api/productos", productoRoutes); // Usar las rutas de productos

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));