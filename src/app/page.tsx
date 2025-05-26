'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    fetch('/api/alumnos').then(res => res.json()).then(setAlumnos);
  }, []);

  const eliminarAlumno = async (id: string) => {
    await fetch(`/api/alumnos/${id}`, { method: 'DELETE' });
    setAlumnos(alumnos.filter(a => a._id !== id));
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Gestión de Alumnos</h1>
      <Link href="/nuevo" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow-md mb-4">
        ➕ Nuevo Alumno
      </Link>
      <ul className="space-y-4">
        {alumnos.map((a: any) => (
          <li key={a._id} className="bg-white shadow-md rounded p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{a.nombre}</h3>
              <p className="text-gray-600">Edad: {a.edad} | Carrera: {a.carrera}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/editar/${a._id}`} className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"> Editar</Link>
              <button onClick={() => eliminarAlumno(a._id)} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"> Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}