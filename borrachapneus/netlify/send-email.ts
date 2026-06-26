import { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const handler: Handler = async (event, context) => {
  // Verificar CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  // Verificar método
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
      },
      body: JSON.stringify({ message: "Método não permitido" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { email, message } = body;

    if (!email || !message) {
      return {
        statusCode: 422,
        headers: {
          "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
        },
        body: JSON.stringify({
          message: 'Campos "email" e "message" são obrigatórios',
        }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 422,
        headers: {
          "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
        },
        body: JSON.stringify({ message: "E-mail inválido" }),
      };
    }

    const mailOptions = {
      from: `"Borracha Store" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Novo contato do site Borracha Store - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #FFC107;">🚛 Borracha Store</h1>
            <hr style="border: 1px solid #e2e8f0;" />
          </div>
          <h2 style="color: #1a202c;">Novo contato recebido!</h2>
          <div style="margin: 20px 0;">
            <p><strong>📧 Email do cliente:</strong></p>
            <p style="background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #FFC107;">
              ${email}
            </p>
          </div>
          <div style="margin: 20px 0;">
            <p><strong>💬 Mensagem:</strong></p>
            <p style="background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #FFC107;">
              ${message}
            </p>
          </div>
          <hr style="border: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #718096; font-size: 14px; text-align: center;">
            Esta mensagem foi enviada através do formulário de contato do site Borracha Store.
          </p>
        </div>
      `,
      text: `
        Novo contato do site Borracha Store!
        Email do cliente: ${email}
        Mensagem: ${message}
        Esta mensagem foi enviada através do formulário de contato do site Borracha Store.
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
      },
      body: JSON.stringify({
        message: "E-mail enviado com sucesso!",
      }),
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
      },
      body: JSON.stringify({
        message: "Falha ao enviar e-mail. Tente novamente mais tarde.",
      }),
    };
  }
};