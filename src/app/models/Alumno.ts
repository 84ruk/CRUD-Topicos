import mongoose from 'mongoose';

const AlumnoSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  carrera: String,
}, { timestamps: true });

export default mongoose.models.Alumno || mongoose.model('Alumno', AlumnoSchema);
