exports.handler = async function(event, context) {
  // Log para debug
  console.log("🚀 FUNÇÃO EXECUTADA!");
  console.log("📝 Método:", event.httpMethod);
  console.log("📦 Body:", event.body);
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Resposta de sucesso para qualquer requisição
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      message: "Função Netlify funcionando!",
      method: event.httpMethod,
      path: event.path,
      timestamp: new Date().toISOString()
    })
  };
};
