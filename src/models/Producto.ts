import mongoose, { Schema, Document } from "mongoose";

// Definir interfaz para el producto
interface IProducto extends Document {
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion: string;
  status: boolean;
  proveedor_id: mongoose.Schema.Types.ObjectId;
}

// Definir el esquema del producto
const ProductoSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  descripcion: { type: String, required: true },
  status: { type: Boolean, required: false },
  proveedor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proveedor",
    required: true,
  },
});

// Exportar el modelo
export default mongoose.model<IProducto>("Producto", ProductoSchema);
