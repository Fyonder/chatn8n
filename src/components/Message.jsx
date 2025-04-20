import React from 'react';
import './Message.css';

const Message = ({ text, isUser, timestamp, status }) => {
  return (
    <div className={`message ${isUser ? 'user' : 'bot'} ${status || ''}`}>
      <div className="message-content">{text}</div>
      <div className="message-time">
        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        {status === 'failed' && <span className="error-icon"> ❗</span>}
      </div>
    </div>
  );
};

export default Message;