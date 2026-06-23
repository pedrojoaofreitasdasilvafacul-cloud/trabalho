const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  console.log("🚀 Enviando email com Gmail!");

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
    const data = JSON.parse(event.body);
    const { email, message } = data;

    if (!email || !message) {
      return {
        statusCode: 422,
        headers,
        body: JSON.stringify({ error: "Campos obrigatórios" })
      };
    }

    // CONFIGURAR GMAIL - SUBSTITUA PELOS SEUS DADOS
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "pedrojoaofreitasdasilvafacul@gmail.com", // SEU EMAIL
        pass: "COLE_A_SENHA_DE_APP_AQUI" // A SENHA QUE VOCÊ COPIOU
      },
    });

    // 1. ENVIAR EMAIL DE CONFIRMAÇÃO PARA O CLIENTE
    await transporter.sendMail({
      from: `"Borracha Store" <pedrojoaofreitasdasilvafacul@gmail.com>`,
      to: email, // Envia para o email que a pessoa digitou
      subject: `Obrigado pelo contato - Borracha Store`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFC107;">📧 Obrigado pelo contato!</h2>
          <p>Olá,</p>
          <p>Recebemos sua mensagem:</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #FFC107;">
            <p style="margin: 0;">"${message}"</p>
          </div>
          <p>Entraremos em contato em breve.</p>
          <hr>
          <p style="color: #888; font-size: 12px;">
            Esta é uma mensagem automática da Borracha Store.<br>
            "Seu caminhão não pode parar."
          </p>
        </div>
      `,
    });

    // 2. ENVIAR CÓPIA PARA VOCÊ
    await transporter.sendMail({
      from: `"Borracha Store" <pedrojoaofreitasdasilvafacul@gmail.com>`,
      to: "pedrojoaofreitasdasilvafacul@gmail.com", // SEU EMAIL PARA RECEBER CÓPIA
      subject: `[Borracha Store] Nova mensagem de ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFC107;">📧 Nova mensagem de contato</h2>
          <p><strong>✉️ Email do remetente:</strong> ${email}</p>
          <hr>
          <p><strong>💬 Mensagem:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #FFC107;">
            <p style="margin: 0;">${message}</p>
          </div>
          <hr>
          <p style="color: #888; font-size: 12px;">
            Esta mensagem foi enviada através do formulário de contato da Borracha Store.
          </p>
        </div>
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