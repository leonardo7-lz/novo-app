'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  FolderOpen, 
  Calendar, 
  User,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Visão Geral', href: '/' },
  { icon: ArrowLeftRight, label: 'Transações', href: '/transacoes' },
  { icon: FolderOpen, label: 'Minhas Categorias', href: '/categorias' },
  { icon: Calendar, label: 'Agenda', href: '/agenda' },
  { icon: User, label: 'Minha Conta', href: '/conta' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-emerald-600 to-emerald-700 
          text-white p-6 flex flex-col z-40 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            💰 Meu Bolso
          </h1>
          <p className="text-emerald-100 text-sm mt-1">Gestão Financeira Inteligente</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-white text-emerald-700 shadow-lg' 
                    : 'hover:bg-emerald-500/50 text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* WhatsApp Integration */}
        <div className="mt-auto pt-6 border-t border-emerald-500">
          <Link
            href="/whatsapp"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500/30 hover:bg-emerald-500/50 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            <div>
              <p className="font-medium text-sm">WhatsApp IA</p>
              <p className="text-xs text-emerald-100">Adicionar por mensagem</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
