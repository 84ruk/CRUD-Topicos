


import { NextResponse } from 'next/server';
import Alumno from '../../models/Alumno';
import { connectDB } from '../../lib/mongoodb';


export async function GET() {
  await connectDB();
  const alumnos = await Alumno.find();
  return NextResponse.json(alumnos);
}

export async function POST(req: Request) {
  const data = await req.json();
  await connectDB();
  const alumno = await Alumno.create(data);
  return NextResponse.json(alumno, { status: 201 });
}
