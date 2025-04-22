import axios from 'axios';

// Configuração global do axios
const api = axios.create({
  baseURL: 'https://filclay.app.n8n.cloud/webhook-test/62fd62cc-495f-4cd7-a8b1-22e0c32863e2',
  timeout: 20000, // 20 segundos
  headers: {
    'Content-Type': 'application/json'
  }
});

export const sendMessage = async (message) => {
  try {
    const response = await api.post('', {
      mensagem: message
    });
    
    console.log('Resposta recebida:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro na API:', {
      config: error.config,
      status: error.response?.status,
      data: error.response?.data
    });
    
    return {
      resposta: "Desculpe, o serviço está temporariamente indisponível. Por favor, tente novamente mais tarde.",
      error: true
    };
  }
};