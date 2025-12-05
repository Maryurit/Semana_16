'use client';
import { useState, useEffect } from 'react';
import AdminStats from '@/components/admin/AdminStats';
import { ordersAPI } from '@/lib/api/orders';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await ordersAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        📊 Dashboard de Administración
      </h1>

      <AdminStats stats={stats} />

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Bienvenido al Panel de Admin</h2>
        <p className="text-gray-600">
          Desde aquí puedes gestionar todos los aspectos de tu tienda de libros.
        </p>
      </div>
    </div>
  );
}
