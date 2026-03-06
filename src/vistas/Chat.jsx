import { Search, Paperclip, Send } from 'lucide-react';
import { useState } from 'react';
import { useEchoPublic } from '@laravel/echo-react';
import '../styles/Chat.css';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 

  const chats = [
    { id: 1, name: 'Administrador', avatar: '👨‍💼' },
    { id: 2, name: 'Vecino', avatar: '👨' },
    { id: 3, name: 'Seguridad', avatar: '👮' }
  ];

  const userProfile = { name: 'Sarahi Ortiz', avatar: '👩' };

 useEchoPublic('chat', '.mensaje.enviado', (data) => {
    setMessages((prev) => [...prev, { text: data.mensaje, type: 'received' }]);
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await fetch('http://localhost:8000/mensaje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: message }),
      });
      setMessages((prev) => [...prev, { text: message, type: 'sent' }]);
      setMessage('');
    }
  };
  
  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <h2 className="chat-sidebar-title">Chats</h2>
          </div>
          <div className="chat-search">
            <Search size={18} />
            <input type="text" placeholder="Buscar chat o iniciar uno nuevo" className="chat-search-input" />
          </div>
          <div className="chat-list">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat === chat.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="chat-avatar">{chat.avatar}</div>
                <div className="chat-info">
                  <span className="chat-name">{chat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-conversation">
          {selectedChat ? (
            <>
              <div className="conversation-header">
                <div className="conversation-user">
                  <div className="conversation-avatar">
                    {chats.find(c => c.id === selectedChat)?.avatar}
                  </div>
                  <div className="conversation-info">
                    <h3 className="conversation-name">
                      {chats.find(c => c.id === selectedChat)?.name}
                    </h3>
                    <span className="conversation-status">En línea</span>
                  </div>
                </div>
                <div className="user-profile-mini">
                  <div className="user-avatar-mini">{userProfile.avatar}</div>
                </div>
              </div>

              <div className="conversation-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`message-group ${msg.type}`}>
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                      <span className="message-time">{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form className="conversation-input" onSubmit={handleSendMessage}>
                <button type="button" className="attachment-btn">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="message-input"
                />
                <button type="submit" className="send-btn">
                  <Send size={20} />
                </button>
              </form>
            </>
          ) : (
            <div className="chat-empty-state">
              <div className="empty-icon">💬</div>
              <h3 className="empty-title">Inicia una conversación</h3>
              <p className="empty-description">
                Selecciona un chat de la lista o busca un nuevo contacto
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;