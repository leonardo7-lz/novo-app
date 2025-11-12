// Tipos do sistema Meu Bolso

export type TransactionType = 'receita' | 'despesa';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
  paymentMethod?: string;
  notes?: string;
  recurring?: boolean;
  userId?: string;
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon: string;
  budget?: number;
  userId?: string;
}

export interface ScheduledTransaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  dueDate: Date;
  status: 'pendente' | 'pago' | 'atrasado';
  recurring: boolean;
  frequency?: 'mensal' | 'semanal' | 'anual';
  userId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  whatsappConnected: boolean;
  createdAt: Date;
}

export interface FinancialSummary {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  receitasVariacao: number;
  despesasVariacao: number;
}

export interface WhatsAppMessage {
  id: string;
  userId: string;
  message: string;
  audioUrl?: string;
  processedAt: Date;
  transactionCreated?: string;
  status: 'processando' | 'concluido' | 'erro';
}
