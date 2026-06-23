import nodemailer from 'nodemailer';

export const handler = async (event, context) => {
  console.log("Ì∫Ä Fun√ß√£o chamada!");
  
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
      body: JSON.stringify({ error: "M√©todo n√£o permitido" })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { email, message } = data;

    if (!email || !message) {
      return {
        statusCode: 422,
        headers,
        body: JSON.stringify({ error: "Campos obrigat√≥rios" })
      };
    }

    console.log("Ì≥© Email:", email);
    console.log("Ì≥© Mensagem:", message);

    // Criar conta Ethereal para teste
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Borracha Store" <${testAccount.user}>`,
      replyTo: email,
      to: "contato@borrachastore.com.br",
      subject: `[Borracha Store] Nova mensagem de ${email}`,
      text: `Email: ${email}\nMensagem: ${message}`,
      html: `
        <h2>Ì≥ß Nova mensagem de contato - Borracha Store</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>‚úâÔ∏è Email:</strong> ${email}</p>
          <hr>
          <p><strong>Ì≤¨ Mensagem:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #FFC107;">
            ${message.replace(/\n/g, "<br>")}
          </p>
        </div>
        <hr>
        <p style="color: #888; font-size: 12px;">
          Esta mensagem foi enviada atrav√©s do formul√°rio de contato da Borracha Store.
        </p>
      `,
    });

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
    console.error("Erro:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Falha ao enviar o e-mail. Tente novamente." })
    };
  }
};
