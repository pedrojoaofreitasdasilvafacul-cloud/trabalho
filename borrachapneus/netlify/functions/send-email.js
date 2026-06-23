exports.handler = async function(event, context) {
  console.log("🚀 Função send-email chamada!");
  console.log("📝 Método:", event.httpMethod);
  console.log("📦 Body:", event.body);
  
  // Resposta para teste
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify({
      message: "Função Netlify funcionando!",
      method: event.httpMethod,
      path: event.path,
      body: event.body ? JSON.parse(event.body) : null
    })
  };
};
