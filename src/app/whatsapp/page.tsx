'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MessageCircle,
  Send,
  Mic,
  CheckCircle2,
  Clock,
  AlertCircle,
  Smartphone,
  Zap,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
  QrCode,
  Link as LinkIcon,
} from 'lucide-react';

export default function WhatsAppPage() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot' as const,
      content: 'Olá! 👋 Sou sua assistente financeira. Você pode me enviar suas despesas e receitas por aqui!',
      timestamp: new Date('2024-01-15T10:00:00'),
    },
    {
      id: '2',
      type: 'user' as const,
      content: 'Gastei 45 reais no uber',
      timestamp: new Date('2024-01-15T10:05:00'),
    },
    {
      id: '3',
      type: 'bot' as const,
      content: '✅ Transação registrada!\n\n💸 Despesa: R$ 45,00\n📁 Categoria: Transporte\n📅 Data: 15/01/2024',
      timestamp: new Date('2024-01-15T10:05:05'),
      transaction: {
        type: 'despesa',
        amount: 45,
        category: 'Transporte',
      },
    },
    {
      id: '4',
      type: 'user' as const,
      content: 'Recebi 800 reais de freelance',
      timestamp: new Date('2024-01-15T14:30:00'),
    },
    {
      id: '5',
      type: 'bot' as const,
      content: '✅ Transação registrada!\n\n💰 Receita: R$ 800,00\n📁 Categoria: Freelance\n📅 Data: 15/01/2024',
      timestamp: new Date('2024-01-15T14:30:05'),
      transaction: {
        type: 'receita',
        amount: 800,
        category: 'Freelance',
      },
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simular resposta da IA
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: 'bot' as const,
        content: '✅ Transação registrada com sucesso! Processando...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">WhatsApp IA</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Adicione transações por mensagem ou áudio direto do WhatsApp
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          {/* Connection Status */}
          <Card className={`p-4 ${
            isConnected 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
              : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {isConnected ? 'WhatsApp Conectado' : 'WhatsApp Desconectado'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isConnected 
                      ? '+55 11 98765-4321' 
                      : 'Conecte seu WhatsApp para começar'}
                  </p>
                </div>
              </div>
              {!isConnected && (
                <Button 
                  onClick={() => setIsConnected(true)}
                  className="bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <LinkIcon className="w-4 h-4" />
                  Conectar
                </Button>
              )}
            </div>
          </Card>

          {/* Chat Messages */}
          <Card className="p-0 bg-white dark:bg-gray-800 overflow-hidden">
            <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.transaction && (
                      <div className={`mt-3 pt-3 border-t ${
                        message.type === 'user' 
                          ? 'border-emerald-500' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}>
                        <div className="flex items-center gap-2">
                          {message.transaction.type === 'receita' ? (
                            <ArrowUpCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <ArrowDownCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className="font-bold">
                            R$ {message.transaction.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' 
                        ? 'text-emerald-200' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="shrink-0"
                  title="Enviar áudio"
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Digite sua despesa ou receita..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={!isConnected}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || !isConnected}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                💡 Exemplo: "Gastei 50 reais no supermercado" ou "Recebi 1000 de salário"
              </p>
            </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          {/* How it Works */}
          <Card className="p-6 bg-white dark:bg-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-600" />
              Como Funciona
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Conecte seu WhatsApp</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Escaneie o QR Code ou use o link
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Envie mensagens</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Texto ou áudio, como preferir
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">IA processa</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Transação adicionada automaticamente
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Examples */}
          <Card className="p-6 bg-white dark:bg-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Exemplos de Mensagens
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-white">
                  "Gastei 150 reais no supermercado"
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-white">
                  "Recebi 5000 de salário"
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-white">
                  "Paguei 80 de uber hoje"
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-white">
                  "Freelance 1200 reais"
                </p>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <h3 className="font-bold mb-4">Estatísticas do Mês</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-emerald-100">Transações via IA</span>
                <span className="font-bold text-xl">47</span>
              </div>
              <Separator className="bg-emerald-400" />
              <div className="flex justify-between items-center">
                <span className="text-emerald-100">Tempo economizado</span>
                <span className="font-bold text-xl">~2h</span>
              </div>
              <Separator className="bg-emerald-400" />
              <div className="flex justify-between items-center">
                <span className="text-emerald-100">Precisão da IA</span>
                <span className="font-bold text-xl">98%</span>
              </div>
            </div>
          </Card>

          {/* QR Code */}
          {!isConnected && (
            <Card className="p-6 bg-white dark:bg-gray-800 text-center">
              <QrCode className="w-32 h-32 mx-auto mb-4 text-gray-400" />
              <p className="font-medium text-gray-900 dark:text-white mb-2">
                Escaneie para conectar
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use o WhatsApp do seu celular
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
