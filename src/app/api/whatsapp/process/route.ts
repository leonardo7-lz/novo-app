import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { message, userId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      );
    }

    // Usar IA para extrair informações da mensagem
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Você é um assistente financeiro que extrai informações de transações de mensagens em português.
          
Extraia as seguintes informações da mensagem do usuário:
- tipo: "receita" ou "despesa"
- valor: número (apenas o valor numérico)
- categoria: uma das categorias (Alimentação, Transporte, Moradia, Saúde, Lazer, Educação, Compras, Salário, Freelance, Investimentos, Outros)
- descricao: descrição curta da transação

Responda APENAS com um JSON válido no formato:
{
  "tipo": "despesa" ou "receita",
  "valor": 123.45,
  "categoria": "Categoria",
  "descricao": "Descrição"
}

Se não conseguir identificar alguma informação, use valores padrão sensatos.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    // Criar transação
    const transaction = {
      id: Date.now().toString(),
      description: result.descricao || 'Transação via WhatsApp',
      amount: parseFloat(result.valor) || 0,
      type: result.tipo || 'despesa',
      category: result.categoria || 'Outros',
      date: new Date(),
      userId: userId || 'default',
    };

    // Aqui você salvaria no banco de dados
    // await saveTransaction(transaction);

    return NextResponse.json({
      success: true,
      transaction,
      message: `✅ Transação registrada!\n\n${
        transaction.type === 'receita' ? '💰' : '💸'
      } ${transaction.type === 'receita' ? 'Receita' : 'Despesa'}: R$ ${transaction.amount.toFixed(2)}\n📁 Categoria: ${transaction.category}\n📅 Data: ${new Date().toLocaleDateString('pt-BR')}`,
    });
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    );
  }
}
