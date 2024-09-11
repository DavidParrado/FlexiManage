import mongoose, { Schema, Document } from "mongoose";

interface Producto {
  productoId: Schema.Types.ObjectId;
  cantidad: number;
}

// Definir interfaz para la Factura
interface IFactura extends Document {
  numero: string;
  cliente: mongoose.Schema.Types.ObjectId;
  fecha: Date;
  productos: Producto[];
  total: number;
}

// Esquema de productos
const productoSchema = new Schema<Producto>(
  {
    productoId: {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: { type: Number, required: true },
  },
  { _id: false }
); // Aquí se desactiva la creación del campo _id

// Definir el esquema de la Factura
const FacturaSchema: Schema = new Schema({
  numero: { type: String, required: true },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  fecha: { type: Date, default: Date.now },
  productos: [productoSchema],
  total: { type: Number, required: true },
});

// Exportar el modelo
export default mongoose.model<IFactura>("Factura", FacturaSchema);
