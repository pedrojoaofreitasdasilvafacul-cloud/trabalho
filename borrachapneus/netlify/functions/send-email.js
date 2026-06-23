exports.handler = async function(event, context) {
  console.log("🚀 FUNÇÃO CHAMADA!");
  console.log("📝 Método:", event.httpMethod);
  console.log("📦 Body:", event.body);
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Resposta para qualquer método (teste)
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: "✅ FUNÇÃO FUNCIONANDO!",
      method: event.httpMethod,
      path: event.path,
      body: event.body ? JSON.parse(event.body) : null,
      timestamp: new Date().toISOString()
    })
  };
};
