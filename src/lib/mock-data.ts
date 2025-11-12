import { Transaction, Category, ScheduledTransaction, User, FinancialSummary } from './types';

// Usuário mock
export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@exemplo.com',
  phone: '+55 11 98765-4321',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
  whatsappConnected: true,
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
};

// Categorias padrão
export const mockCategories: Category[] = [
  // Despesas
  { id: '1', name: 'Alimentação', type: 'despesa', color: '#ef4444', icon: 'UtensilsCrossed', budget: 800 },
  { id: '2', name: 'Transporte', type: 'despesa', color: '#f97316', icon: 'Car', budget: 500 },
  { id: '3', name: 'Moradia', type: 'despesa', color: '#8b5cf6', icon: 'Home', budget: 1500 },
  { id: '4', name: 'Saúde', type: 'despesa', color: '#ec4899', icon: 'Heart', budget: 300 },
  { id: '5', name: 'Lazer', type: 'despesa', color: '#06b6d4', icon: 'Gamepad2', budget: 400 },
  { id: '6', name: 'Educação', type: 'despesa', color: '#3b82f6', icon: 'GraduationCap', budget: 600 },
  { id: '7', name: 'Compras', type: 'despesa', color: '#f59e0b', icon: 'ShoppingBag', budget: 500 },
  { id: '8', name: 'Outros', type: 'despesa', color: '#6b7280', icon: 'MoreHorizontal', budget: 200 },
  
  // Receitas
  { id: '9', name: 'Salário', type: 'receita', color: '#10b981', icon: 'Briefcase' },
  { id: '10', name: 'Freelance', type: 'receita', color: '#14b8a6', icon: 'Laptop' },
  { id: '11', name: 'Investimentos', type: 'receita', color: '#22c55e', icon: 'TrendingUp' },
  { id: '12', name: 'Outros', type: 'receita', color: '#84cc16', icon: 'Plus' },
];

// Transações mock
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário Janeiro',
    amount: 5500,
    type: 'receita',
    category: 'Salário',
    date: new Date('2024-01-05T12:00:00.000Z'),
    paymentMethod: 'Transferência',
  },
  {
    id: '2',
    description: 'Supermercado',
    amount: 450.80,
    type: 'despesa',
    category: 'Alimentação',
    date: new Date('2024-01-10T12:00:00.000Z'),
    paymentMethod: 'Cartão de Crédito',
  },
  {
    id: '3',
    description: 'Aluguel',
    amount: 1200,
    type: 'despesa',
    category: 'Moradia',
    date: new Date('2024-01-08T12:00:00.000Z'),
    paymentMethod: 'Transferência',
    recurring: true,
  },
  {
    id: '4',
    description: 'Uber',
    amount: 45.50,
    type: 'despesa',
    category: 'Transporte',
    date: new Date('2024-01-12T12:00:00.000Z'),
    paymentMethod: 'Cartão de Débito',
  },
  {
    id: '5',
    description: 'Freelance - Site',
    amount: 800,
    type: 'receita',
    category: 'Freelance',
    date: new Date('2024-01-15T12:00:00.000Z'),
    paymentMethod: 'PIX',
  },
  {
    id: '6',
    description: 'Academia',
    amount: 120,
    type: 'despesa',
    category: 'Saúde',
    date: new Date('2024-01-07T12:00:00.000Z'),
    paymentMethod: 'Cartão de Crédito',
    recurring: true,
  },
  {
    id: '7',
    description: 'Cinema',
    amount: 80,
    type: 'despesa',
    category: 'Lazer',
    date: new Date('2024-01-14T12:00:00.000Z'),
    paymentMethod: 'Dinheiro',
  },
  {
    id: '8',
    description: 'Curso Online',
    amount: 250,
    type: 'despesa',
    category: 'Educação',
    date: new Date('2024-01-11T12:00:00.000Z'),
    paymentMethod: 'Cartão de Crédito',
  },
  {
    id: '9',
    description: 'Restaurante',
    amount: 150,
    type: 'despesa',
    category: 'Alimentação',
    date: new Date('2024-01-16T12:00:00.000Z'),
    paymentMethod: 'Cartão de Débito',
  },
  {
    id: '10',
    description: 'Gasolina',
    amount: 200,
    type: 'despesa',
    category: 'Transporte',
    date: new Date('2024-01-13T12:00:00.000Z'),
    paymentMethod: 'Dinheiro',
  },
];

// Transações agendadas
export const mockScheduledTransactions: ScheduledTransaction[] = [
  {
    id: '1',
    description: 'Aluguel Fevereiro',
    amount: 1200,
    type: 'despesa',
    category: 'Moradia',
    dueDate: new Date('2024-02-08T12:00:00.000Z'),
    status: 'pendente',
    recurring: true,
    frequency: 'mensal',
  },
  {
    id: '2',
    description: 'Conta de Luz',
    amount: 180,
    type: 'despesa',
    category: 'Moradia',
    dueDate: new Date('2024-01-25T12:00:00.000Z'),
    status: 'pendente',
    recurring: true,
    frequency: 'mensal',
  },
  {
    id: '3',
    description: 'Internet',
    amount: 99.90,
    type: 'despesa',
    category: 'Moradia',
    dueDate: new Date('2024-01-20T12:00:00.000Z'),
    status: 'pago',
    recurring: true,
    frequency: 'mensal',
  },
  {
    id: '4',
    description: 'Salário Fevereiro',
    amount: 5500,
    type: 'receita',
    category: 'Salário',
    dueDate: new Date('2024-02-05T12:00:00.000Z'),
    status: 'pendente',
    recurring: true,
    frequency: 'mensal',
  },
];

// Função para calcular resumo financeiro
export function calculateSummary(transactions: Transaction[]): FinancialSummary {
  const totalReceitas = transactions
    .filter(t => t.type === 'receita')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDespesas = transactions
    .filter(t => t.type === 'despesa')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const saldo = totalReceitas - totalDespesas;
  
  return {
    totalReceitas,
    totalDespesas,
    saldo,
    receitasVariacao: 12.5,
    despesasVariacao: -8.3,
  };
}
