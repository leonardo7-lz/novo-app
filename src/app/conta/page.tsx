'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { mockUser } from '@/lib/mock-data';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Bell,
  Palette,
  Save,
  Camera,
} from 'lucide-react';

export default function ContaPage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Minha Conta</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Gerencie suas informações pessoais e preferências
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-6 bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-emerald-600 hover:bg-emerald-700"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Membro desde {user.createdAt.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'outline' : 'default'}
            className={!isEditing ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
          >
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </Button>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Informações Pessoais
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={user.name}
                disabled={!isEditing}
                onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled={!isEditing}
                  className="pl-10"
                  onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={user.phone}
                disabled={!isEditing}
                className="pl-10"
                onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          {isEditing && (
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 gap-2">
              <Save className="w-4 h-4" />
              Salvar Alterações
            </Button>
          )}
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Segurança
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Senha</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Última alteração há 30 dias
              </p>
            </div>
            <Button variant="outline">Alterar Senha</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Autenticação de Dois Fatores
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adicione uma camada extra de segurança
              </p>
            </div>
            <Button variant="outline">Ativar</Button>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="p-6 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notificações
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Notificações por E-mail
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receba atualizações sobre suas transações
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Alertas de Orçamento
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Seja notificado quando atingir 80% do orçamento
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Lembretes de Contas
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receba lembretes de contas a vencer
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
          Zona de Perigo
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Excluir Conta
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Esta ação não pode ser desfeita
              </p>
            </div>
            <Button variant="destructive">Excluir Conta</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
