import mongoose, { Schema, Document } from "mongoose";

// Definir interfaz para el Usuario
interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: "cliente" | "administrador";
  telefono: string;
}

// Definir el esquema del Usuario
const UsuarioSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, required: true, enum: ["cliente", "administrador"] },
  telefono: { type: String, required: true },
});

// Exportar el modelo
export default mongoose.model<IUsuario>("Usuario", UsuarioSchema);
