import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const userId = formData.get('userId') as string;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Arquivo de áudio é obrigatório' },
        { status: 400 }
      );
    }

    // Transcrever áudio usando Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'pt',
    });

    const message = transcription.text;

    // Processar a transcrição como mensagem de texto
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
}`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    const transaction = {
      id: Date.now().toString(),
      description: result.descricao || 'Transação via áudio',
      amount: parseFloat(result.valor) || 0,
      type: result.tipo || 'despesa',
      category: result.categoria || 'Outros',
      date: new Date(),
      userId: userId || 'default',
    };

    return NextResponse.json({
      success: true,
      transcription: message,
      transaction,
      message: `🎤 Áudio transcrito: "${message}"\n\n✅ Transação registrada!\n\n${
        transaction.type === 'receita' ? '💰' : '💸'
      } ${transaction.type === 'receita' ? 'Receita' : 'Despesa'}: R$ ${transaction.amount.toFixed(2)}\n📁 Categoria: ${transaction.category}\n📅 Data: ${new Date().toLocaleDateString('pt-BR')}`,
    });
  } catch (error) {
    console.error('Erro ao processar áudio:', error);
    return NextResponse.json(
      { error: 'Erro ao processar áudio' },
      { status: 500 }
    );
  }
}
