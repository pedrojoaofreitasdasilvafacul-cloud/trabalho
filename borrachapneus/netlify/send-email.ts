import nodemailer from 'nodemailer';
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  console.log("🚀 Enviando email com GMAIL!");
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Método não permitido" })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { email, message } = data;

    if (!email || !message) {
      return {
        statusCode: 422,
        headers,
        body: JSON.stringify({ error: "Campos obrigatórios" })
      };
    }

    // CONFIGURAÇÃO DO GMAIL COM SEU NOVO EMAIL
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "jpfdsilva@minha.fag.edu.br",
        pass: "vkvr ivue hvgg anvd"
      },
    });

    // 1. EMAIL DE CONFIRMAÇÃO PARA O CLIENTE
    await transporter.sendMail({
      from: `"Borracha Store" <jpfdsilva@minha.fag.edu.br>`,
      to: email,
      subject: `Obrigado pelo contato - Borracha Store`,
      html: `
        <h2>📧 Obrigado pelo contato!</h2>
        <p>Recebemos sua mensagem: "${message}"</p>
        <p>Entraremos em contato em breve.</p>
        <p>Atenciosamente,<br>Borracha Store</p>
      `,
    });

    // 2. CÓPIA PARA VOCÊ
    await transporter.sendMail({
      from: `"Borracha Store" <jpfdsilva@minha.fag.edu.br>`,
      to: "jpfdsilva@minha.fag.edu.br",
      subject: `[Borracha Store] Nova mensagem de ${email}`,
      html: `
        <h2>📧 Nova mensagem de contato</h2>
        <p><strong>Email do cliente:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 8px;">${message}</p>
        <hr>
        <p style="color: #888; font-size: 12px;">Enviado via Borracha Store</p>
      `,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "E-mail enviado com sucesso!"
      })
    };

  } catch (error) {
    console.error("Erro detalhado:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Falha ao enviar o e-mail. Tente novamente." 
      })
    };
  }
};