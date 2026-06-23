import type { Handler, HandlerEvent } from "@netlify/functions";
import nodemailer from "nodemailer";

interface ContactPayload {
  email: string;
  message: string;
  name?: string;
  phone?: string;
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "*";

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN || origin,
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
});

const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers["origin"] ?? "";

  // Tratamento do preflight (OPTIONS)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(origin),
      body: "",
    };
  }

  // Só aceita POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Método não permitido." }),
    };
  }

  // Parse do body
  let payload: ContactPayload;
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Body inválido." }),
    };
  }

  const { email, message, name, phone } = payload;

  // Validações
  if (!email?.trim() || !message?.trim()) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Campos obrigatórios: email, message." }),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "E-mail inválido." }),
    };
  }

  // Configuração do SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Montar o conteúdo do email
    const htmlContent = `
      <h2>📧 Nova mensagem de contato - Borracha Store</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
        ${name ? `<p><strong>👤 Nome:</strong> ${name}</p>` : ''}
        ${phone ? `<p><strong>📱 Telefone:</strong> ${phone}</p>` : ''}
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

    // Envio do e-mail
    await transporter.sendMail({
      from: `"Borracha Store" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `[Borracha Store] Nova mensagem de ${name || email}`,
      text: `Nome: ${name || 'Não informado'}\nEmail: ${email}\nTelefone: ${phone || 'Não informado'}\nMensagem: ${message}`,
      html: htmlContent,
    });

    return {
      statusCode: 200,
      headers: corsHeaders(origin),
      body: JSON.stringify({ 
        success: true,
        message: "E-mail enviado com sucesso! Entraremos em contato em breve." 
      }),
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return {
      statusCode: 500,
      headers: corsHeaders(origin),
      body: JSON.stringify({ 
        error: "Falha ao enviar o e-mail. Tente novamente mais tarde." 
      }),
    };
  }
};

export { handler };
