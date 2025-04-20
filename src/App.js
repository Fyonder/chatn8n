import React from 'react';
import './App.css';
import Chat from './components/chat';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Chat de Agendamentos</h1>
      </header>
      <main className="app-content">
        <Chat />
      </main>
    </div>
  );
}

export default App;