import mongoose, { Schema, Document } from "mongoose";

// Definir interfaz para el Proveedor
interface IProveedor extends Document {
  nombre: string;
  contacto: string;
  direccion: string;
  email: string;
  telefono: string;
}

// Definir el esquema del Proveedor
const ProveedorSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  contacto: { type: String, required: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
});

// Exportar el modelo
export default mongoose.model<IProveedor>("Proveedor", ProveedorSchema);
