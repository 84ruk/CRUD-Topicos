
import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongoodb';
import Alumno from '../../../models/Alumno';



export async function GET(_, { params }) {
  await connectDB();
  const alumno = await Alumno.findById(params.id);
  return NextResponse.json(alumno);
}

export async function PUT(req, { params }) {
  const data = await req.json();
  await connectDB();
  const alumno = await Alumno.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(alumno);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Alumno.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Alumno eliminado' });
}
