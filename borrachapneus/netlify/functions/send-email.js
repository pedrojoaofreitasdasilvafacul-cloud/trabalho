const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  console.log("🚀 Função send-email chamada!");
  console.log("📝 Método:", event.httpMethod);
  console.log("📦 Body:", event.body);

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Tratamento OPTIONS (preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers
    };
  }

  // Só aceita POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Método não permitido" })
    };
  }

  try {
    // Parse do body
    const data = JSON.parse(event.body);
    console.log("📩 Dados recebidos:", data);

    const { email, message } = data;

    // Validações
    if (!email || !message) {
      return {
        statusCode: 422,
        headers,
        body: JSON.stringify({ error: "Campos obrigatórios: email, message" })
      };
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 422,
        headers,
        body: JSON.stringify({ error: "E-mail inválido" })
      };
    }

    // Criar conta de teste Ethereal (email fake para desenvolvimento)
    const testAccount = await nodemailer.createTestAccount();
    console.log("📧 Conta Ethereal criada:", testAccount.user);

    // Configurar transporte
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Montar o email
    const htmlContent = `
      <h2>📧 Nova mensagem de contato - Borracha Store</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
        <p><strong>✉️ Email:</strong> ${email}</p>
        <hr>
        <p><strong>💬 Mensagem:</strong></p>
        <p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #FFC107;">
          ${message.replace(/\n/g, "<br>")}
        </p>
      </div>
      <hr>
      <p style="color: #888; font-size: 12px;">
        Esta mensagem foi enviada através do formulário de contato da Borracha Store.
      </p>
    `;

    // Enviar email
    const info = await transporter.sendMail({
      from: `"Borracha Store" <${testAccount.user}>`,
      replyTo: email,
      to: "contato@borrachastore.com.br",
      subject: `[Borracha Store] Nova mensagem de ${email}`,
      text: `Email: ${email}\nMensagem: ${message}`,
      html: htmlContent,
    });

    console.log("📧 Email enviado!");
    console.log("🔗 URL de preview:", nodemailer.getTestMessageUrl(info));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "E-mail enviado com sucesso!",
        previewUrl: nodemailer.getTestMessageUrl(info)
      })
    };

  } catch (error) {
    console.error("❌ Erro:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Falha ao enviar o e-mail. Tente novamente."
      })
    };
  }
};
