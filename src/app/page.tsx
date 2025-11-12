'use client';

import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockTransactions, calculateSummary, mockCategories } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function Home() {
  const summary = calculateSummary(mockTransactions);
  
  // Dados para gráfico de barras (últimos 6 meses)
  const monthlyData = [
    { mes: 'Ago', receitas: 4800, despesas: 3200 },
    { mes: 'Set', receitas: 5200, despesas: 3800 },
    { mes: 'Out', receitas: 5000, despesas: 3500 },
    { mes: 'Nov', receitas: 5500, despesas: 4000 },
    { mes: 'Dez', receitas: 6000, despesas: 4500 },
    { mes: 'Jan', receitas: summary.totalReceitas, despesas: summary.totalDespesas },
  ];

  // Dados para gráfico de pizza (despesas por categoria)
  const categoryData = mockCategories
    .filter(cat => cat.type === 'despesa')
    .map(cat => {
      const total = mockTransactions
        .filter(t => t.category === cat.name && t.type === 'despesa')
        .reduce((sum, t) => sum + t.amount, 0);
      return { name: cat.name, value: total, color: cat.color };
    })
    .filter(item => item.value > 0);

  const COLORS = categoryData.map(item => item.color);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Visão Geral</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Acompanhe suas finanças em tempo real</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
          <Plus className="w-4 h-4" />
          Nova Transação
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Saldo Total */}
        <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Wallet className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 opacity-70" />
          </div>
          <p className="text-emerald-100 text-sm font-medium mb-1">Saldo Total</p>
          <h2 className="text-3xl font-bold">
            R$ {summary.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </Card>

        {/* Receitas */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ArrowUpCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
              +12.5%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Receitas do Mês</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            R$ {summary.totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </Card>

        {/* Despesas */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <ArrowDownCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
              -8.3%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Despesas do Mês</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            R$ {summary.totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras - Receitas vs Despesas */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Receitas vs Despesas (6 meses)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
              />
              <Legend />
              <Bar dataKey="receitas" fill="#10b981" name="Receitas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Gráfico de Pizza - Despesas por Categoria */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Despesas por Categoria
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Últimas Transações */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Últimas Transações</h3>
          <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700">
            Ver todas
          </Button>
        </div>
        <div className="space-y-3">
          {mockTransactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'receita' 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {transaction.type === 'receita' ? (
                    <ArrowUpCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400" suppressHydrationWarning>
                    {transaction.category} • {transaction.date.toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <span className={`font-bold text-lg ${
                transaction.type === 'receita' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'receita' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
