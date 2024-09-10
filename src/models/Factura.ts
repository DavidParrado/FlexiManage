import mongoose, { Schema, Document } from "mongoose";

// Definir interfaz para la Factura
interface IFactura extends Document {
  numero: string;
  cliente: mongoose.Schema.Types.ObjectId;
  fecha: Date;
  productos: Array<{
    productoId: mongoose.Schema.Types.ObjectId;
    cantidad: number;
  }>;
  total: number;
}

// Definir el esquema de la Factura
const FacturaSchema: Schema = new Schema({
  numero: { type: String, required: true },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  fecha: { type: Date, default: Date.now },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      cantidad: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
});

// Exportar el modelo
export default mongoose.model<IFactura>("Factura", FacturaSchema);
