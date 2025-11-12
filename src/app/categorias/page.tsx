'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCategories, mockTransactions } from '@/lib/mock-data';
import { Category } from '@/lib/types';
import {
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react';

export default function CategoriasPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'receita' | 'despesa'>('all');

  // Filtrar categorias
  const filteredCategories = categories.filter(cat => 
    filterType === 'all' || cat.type === filterType
  );

  // Calcular gastos por categoria
  const getCategorySpending = (categoryName: string) => {
    return mockTransactions
      .filter(t => t.category === categoryName && t.type === 'despesa')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Minhas Categorias</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize suas finanças por categorias
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Categoria</DialogTitle>
            </DialogHeader>
            <AddCategoryForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <Card className="p-4 bg-white dark:bg-gray-800">
        <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            <SelectItem value="receita">Receitas</SelectItem>
            <SelectItem value="despesa">Despesas</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => {
          const spending = getCategorySpending(category.name);
          const budget = category.budget || 0;
          const percentage = budget > 0 ? (spending / budget) * 100 : 0;
          
          return (
            <Card key={category.id} className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.type === 'receita' ? (
                      <TrendingUp className="w-6 h-6" style={{ color: category.color }} />
                    ) : (
                      <TrendingDown className="w-6 h-6" style={{ color: category.color }} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.type === 'receita' ? 'Receita' : 'Despesa'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {category.type === 'despesa' && budget > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Gasto: R$ {spending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Orçamento: R$ {budget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                    style={{
                      backgroundColor: `${category.color}20`,
                    }}
                  />
                  <p className={`text-sm font-medium ${
                    percentage > 100 
                      ? 'text-red-600 dark:text-red-400' 
                      : percentage > 80 
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {percentage.toFixed(0)}% utilizado
                  </p>
                </div>
              )}

              {category.type === 'receita' && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Fonte de receita ativa
                    </span>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function AddCategoryForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'despesa' as 'receita' | 'despesa',
    color: '#ef4444',
    budget: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova categoria:', formData);
    onClose();
  };

  const colors = [
    { name: 'Vermelho', value: '#ef4444' },
    { name: 'Laranja', value: '#f97316' },
    { name: 'Amarelo', value: '#f59e0b' },
    { name: 'Verde', value: '#10b981' },
    { name: 'Azul', value: '#3b82f6' },
    { name: 'Roxo', value: '#8b5cf6' },
    { name: 'Rosa', value: '#ec4899' },
    { name: 'Cinza', value: '#6b7280' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Tipo</Label>
        <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="receita">Receita</SelectItem>
            <SelectItem value="despesa">Despesa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nome da Categoria</Label>
        <Input
          id="name"
          placeholder="Ex: Alimentação"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Cor</Label>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
              className={`h-12 rounded-lg transition-all ${
                formData.color === color.value 
                  ? 'ring-2 ring-offset-2 ring-emerald-500 scale-110' 
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {formData.type === 'despesa' && (
        <div className="space-y-2">
          <Label htmlFor="budget">Orçamento Mensal (opcional)</Label>
          <Input
            id="budget"
            type="number"
            step="0.01"
            placeholder="0,00"
            value={formData.budget}
            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
          />
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
          Adicionar
        </Button>
      </div>
    </form>
  );
}
