'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { booksAPI } from '@/lib/api/books';
import { formatPrice } from '@/lib/utils/formatters';

export default function AdminLibrosPage() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await booksAPI.getAll({ limit: 100 });
      if (response.success) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este libro?')) return;

    try {
      const response = await booksAPI.delete(id);
      if (response.success) {
        alert('✅ Libro eliminado');
        fetchBooks();
      }
    } catch (error) {
      alert('❌ Error al eliminar');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">📚 Gestión de Libros</h1>
        <Button onClick={() => router.push('/admin/libros/nuevo')}>
          + Nuevo Libro
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Autor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id_libro} className="hover:bg-gray-50">
                <td className="px-6 py-4">{book.id_libro}</td>
                <td className="px-6 py-4 font-medium">{book.titulo}</td>
                <td className="px-6 py-4">{book.autor_nombre}</td>
                <td className="px-6 py-4">{formatPrice(book.precio)}</td>
                <td className="px-6 py-4">{book.stock}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(book.id_libro)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
