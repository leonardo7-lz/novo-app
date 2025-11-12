'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockScheduledTransactions } from '@/lib/mock-data';
import { ScheduledTransaction } from '@/lib/types';
import {
  Plus,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Repeat,
} from 'lucide-react';

export default function AgendaPage() {
  const [scheduledTransactions, setScheduledTransactions] = useState(mockScheduledTransactions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Agrupar por status
  const pendentes = scheduledTransactions.filter(t => t.status === 'pendente');
  const pagos = scheduledTransactions.filter(t => t.status === 'pago');
  const atrasados = scheduledTransactions.filter(t => t.status === 'atrasado');

  const markAsPaid = (id: string) => {
    setScheduledTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, status: 'pago' as const } : t)
    );
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agenda</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie suas contas e compromissos financeiros
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              Agendar Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Agendar Transação</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-500">Formulário de agendamento aqui</p>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h3 className="font-bold text-gray-900 dark:text-white">Pendentes</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {pendentes.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            R$ {pendentes.reduce((sum, t) => sum + t.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>

        <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="font-bold text-gray-900 dark:text-white">Pagos</h3>
          </div>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {pagos.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            R$ {pagos.reduce((sum, t) => sum + t.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>

        <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h3 className="font-bold text-gray-900 dark:text-white">Atrasados</h3>
          </div>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            {atrasados.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            R$ {atrasados.reduce((sum, t) => sum + t.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>
      </div>

      {/* Scheduled Transactions */}
      <div className="space-y-4">
        {/* Atrasados */}
        {atrasados.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Atrasados
            </h2>
            <div className="space-y-3">
              {atrasados.map(transaction => (
                <ScheduledTransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onMarkAsPaid={markAsPaid}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pendentes */}
        {pendentes.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              Pendentes
            </h2>
            <div className="space-y-3">
              {pendentes.map(transaction => (
                <ScheduledTransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onMarkAsPaid={markAsPaid}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pagos */}
        {pagos.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Pagos
            </h2>
            <div className="space-y-3">
              {pagos.map(transaction => (
                <ScheduledTransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onMarkAsPaid={markAsPaid}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScheduledTransactionCard({ 
  transaction, 
  onMarkAsPaid 
}: { 
  transaction: ScheduledTransaction;
  onMarkAsPaid: (id: string) => void;
}) {
  const statusConfig = {
    pendente: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      icon: Clock,
    },
    pago: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      icon: CheckCircle2,
    },
    atrasado: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      icon: XCircle,
    },
  };

  const config = statusConfig[transaction.status];
  const StatusIcon = config.icon;

  return (
    <Card className={`p-4 ${config.bg} border ${config.border}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <StatusIcon className="w-6 h-6" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 dark:text-white">
                {transaction.description}
              </h3>
              {transaction.recurring && (
                <Badge variant="outline" className="gap-1">
                  <Repeat className="w-3 h-3" />
                  {transaction.frequency}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {transaction.dueDate.toLocaleDateString('pt-BR')}
              </span>
              <span>•</span>
              <span>{transaction.category}</span>
              <span>•</span>
              <Badge className={config.badge}>
                {transaction.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`font-bold text-lg ${
            transaction.type === 'receita' 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {transaction.type === 'receita' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>

          {transaction.status === 'pendente' && (
            <Button
              size="sm"
              onClick={() => onMarkAsPaid(transaction.id)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Marcar como Pago
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
