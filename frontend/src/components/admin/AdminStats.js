'use client';

export default function AdminStats({ stats }) {
  const cards = [
    { 
      icon: '📚', 
      label: 'Total Libros', 
      value: stats?.totalLibros || 0,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: '📦', 
      label: 'Pedidos Totales', 
      value: stats?.totalPedidos || 0,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: '👥', 
      label: 'Usuarios', 
      value: stats?.totalUsuarios || 0,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: '💰', 
      label: 'Ingresos', 
      value: `S/ ${(stats?.ingresosTotales || 0).toFixed(2)}`,
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-linear-to-br ${card.color} text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">{card.label}</p>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
            <div className="text-5xl opacity-80">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
