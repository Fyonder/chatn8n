import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../services/api';
import Message from './Message';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Rolagem automática para a última mensagem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    // Adiciona mensagem do usuário
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date().toISOString(),
      status: 'sending'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      // Envia mensagem e aguarda resposta
      const response = await sendMessage(inputValue);
      
      // Atualiza status da mensagem do usuário
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id 
          ? { ...msg, status: 'delivered' } 
          : msg
      ));
      
      // Adiciona resposta ao chat
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response.resposta || response.response || response,
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
      
    } catch (error) {
      // Marca mensagem como falha
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id 
          ? { ...msg, status: 'failed' } 
          : msg
      ));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
            status={message.status}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={isSending}
        />
        <button type="submit" disabled={isSending || !inputValue.trim()}>
          {isSending ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default Chat;