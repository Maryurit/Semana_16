'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '/admin' },
    { icon: '📚', label: 'Libros', href: '/admin/libros' },
    { icon: '📦', label: 'Pedidos', href: '/admin/pedidos' },
    { icon: '👥', label: 'Usuarios', href: '/admin/usuarios' },
    { icon: '📈', label: 'Estadísticas', href: '/admin/estadisticas' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-2">Panel Admin</h2>
        <p className="text-sm text-gray-600">Gestión del sistema</p>
      </div>

      <nav className="px-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all
              ${pathname === item.href
                ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-700 hover:bg-purple-50'
              }
            `}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
