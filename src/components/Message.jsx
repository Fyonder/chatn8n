import React from 'react';
import './Message.css';

const Message = ({ text, isUser, timestamp, status }) => {
  return (
    <div className={`message ${isUser ? 'user' : 'bot'}`}>
      <div className="message-content">
        {
          !isUser ? (
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
              {text}
            </pre>
          ) : (
            <span>{text}</span>
          )
        }
      </div>
      <div className="message-meta">
        <span className="timestamp">{new Date(timestamp).toLocaleTimeString()}</span>
        {isUser && <span className={`status ${status}`}>{status}</span>}
      </div>
    </div>
  );
};

export default Message;
