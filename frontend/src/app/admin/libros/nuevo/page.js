'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { booksAPI } from '@/lib/api/books';

export default function NuevoLibroPage() {
  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await booksAPI.create({
        titulo,
        autor_nombre: autor,
        precio: parseFloat(precio),
        stock: parseInt(stock),
      });

      if (response.success) {
        alert('✅ Libro agregado');
        router.push('/admin/libros'); // Volver a la lista
      } else {
        alert('❌ Error al agregar libro');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Error al agregar libro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">📚 Nuevo Libro</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Autor</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Precio</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" onClick={() => router.push('/admin/libros')}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Agregar Libro'}
          </Button>
        </div>
      </form>
    </div>
  );
}
