'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function FormularioAlumno() {
  const router = useRouter();
  const { id } = useParams();
  const isEdit = !!id;
  const [form, setForm] = useState({ nombre: '', edad: '', carrera: '' });

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/alumnos/${id}`).then(res => res.json()).then(setForm);
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/alumnos/${id}` : '/api/alumnos';
    await fetch(url, {
      method,
      body: JSON.stringify({ ...form, edad: Number(form.edad) }),
    });
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">{isEdit ? 'Editar Alumno' : 'Nuevo Alumno'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-orange-500" />
        <input name="edad" value={form.edad} onChange={handleChange} placeholder="Edad" type="number" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-orange-500" />
        <input name="carrera" value={form.carrera} onChange={handleChange} placeholder="Carrera" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-orange-500" />
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow">
          {isEdit ? 'Actualizar' : 'Guardar'}
        </button>
      </form>
    </div>
  );
}
