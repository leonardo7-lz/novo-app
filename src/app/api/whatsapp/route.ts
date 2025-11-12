import { NextRequest, NextResponse } from 'next/server';

// Webhook para receber mensagens do WhatsApp
// Integração com WhatsApp Business API ou Twilio

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extrair dados da mensagem do WhatsApp
    const { from, message, messageType } = body;
    
    let transactionData = null;

    // Se for mensagem de texto
    if (messageType === 'text') {
      transactionData = await processTextMessage(message);
    }
    
    // Se for mensagem de áudio
    if (messageType === 'audio') {
      // Aqui você integraria com API de transcrição (Whisper, Google Speech, etc)
      const transcription = await transcribeAudio(message.audioUrl);
      transactionData = await processTextMessage(transcription);
    }

    // Salvar transação no banco de dados
    if (transactionData) {
      // await saveTransaction(transactionData);
      
      // Enviar confirmação via WhatsApp
      await sendWhatsAppMessage(from, `✅ Transação registrada com sucesso!\n\n${formatTransactionMessage(transactionData)}`);
    } else {
      await sendWhatsAppMessage(from, '❌ Não consegui entender a transação. Tente novamente com mais detalhes.\n\nExemplo: "Gastei R$ 50 no supermercado"');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro no webhook WhatsApp:', error);
    return NextResponse.json({ error: 'Erro ao processar mensagem' }, { status: 500 });
  }
}

// Verificação do webhook (WhatsApp Business API)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verificar token de validação
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Token inválido' }, { status: 403 });
}

// Processar mensagem de texto com IA
async function processTextMessage(text: string) {
  try {
    // Usar OpenAI para extrair informações da transação
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é um assistente financeiro. Extraia as seguintes informações de mensagens sobre transações financeiras:
            - amount (número): valor da transação
            - type (string): "receita" ou "despesa"
            - description (string): descrição da transação
            - category (string): categoria (Alimentação, Transporte, Moradia, Lazer, Saúde, Educação, Salário, Freelance, Investimentos)
            
            Retorne APENAS um JSON válido com essas informações. Se não conseguir extrair, retorne null.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    
    if (result && result.amount && result.type && result.description) {
      return {
        ...result,
        date: new Date(),
        paymentMethod: 'WhatsApp',
      };
    }

    return null;
  } catch (error) {
    console.error('Erro ao processar com IA:', error);
    return null;
  }
}

// Transcrever áudio (integração com Whisper ou Google Speech)
async function transcribeAudio(audioUrl: string) {
  try {
    // Baixar áudio
    const audioResponse = await fetch(audioUrl);
    const audioBuffer = await audioResponse.arrayBuffer();

    // Usar Whisper da OpenAI para transcrição
    const formData = new FormData();
    formData.append('file', new Blob([audioBuffer]), 'audio.ogg');
    formData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    });

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Erro ao transcrever áudio:', error);
    return '';
  }
}

// Enviar mensagem via WhatsApp
async function sendWhatsAppMessage(to: string, message: string) {
  // Implementar envio via WhatsApp Business API ou Twilio
  // Exemplo com Twilio:
  /*
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      To: `whatsapp:${to}`,
      Body: message,
    }),
  });
  */
  
  console.log(`Enviando mensagem para ${to}: ${message}`);
}

// Formatar mensagem de confirmação
function formatTransactionMessage(transaction: any) {
  const emoji = transaction.type === 'receita' ? '💰' : '💸';
  const typeLabel = transaction.type === 'receita' ? 'Receita' : 'Despesa';
  
  return `${emoji} ${typeLabel}: R$ ${transaction.amount.toFixed(2)}
📝 ${transaction.description}
📁 Categoria: ${transaction.category}
📅 Data: ${new Date(transaction.date).toLocaleDateString('pt-BR')}`;
}
