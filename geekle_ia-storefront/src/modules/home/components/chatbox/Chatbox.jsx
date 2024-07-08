import React, { useState, useEffect } from 'react';
import './ChatBox.css';

const CUSTOMERID = 'cus_01J27FYAKGMXNCSFM6JFH93X03'


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const [chatId, setChatId] = useState('')
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null);


  // Fetch messages from backend when component mounts
  useEffect(() => {
    initChat();
    getChats()
  }, []);


  const initChat = async () => {
    try {
      // [TODO] Per determinar com recuperar customId per cada usuari
      await fetch(`http://localhost:9000/store/customers/${CUSTOMERID}/chats/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: 'Chat initialized' }),
      }).then(response => response.json())
      .then(data => setChatId(data.chat.id));
  
    } catch (error) {
      console.error('Error initializing chat :', error);
    }
  };


  const getChats = async () => {
    try {
      // [TODO] Per determinar com recuperar customId per cada usuari
      await fetch(`http://localhost:9000/store/customers/${CUSTOMERID}/chats/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(data => setChats(data.chats));
  
    } catch (error) {
      console.error('Error initializing chat :', error);
    }
  };

  console.log(chats,"haf")

  const handleSend = async () => {
    if (input.trim()) {
      try {
        // [TODO] Per determinar quin es el endpoint dels missatges
        const response = await fetch(`http://localhost:9000/store/customers/${CUSTOMERID}/chats/${chatId}/new_message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: input}),
        });

        const newMessage = input
        setMessages([...messages, newMessage]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
<div className="chatbox-wrapper">
      <div className="chat-list">
        <h3>Llista de Xats</h3>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChat(chat)
              const messages = chat.messages.map(message => message.content)
              setMessages([...messages])}}
            className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
          >
            {chat.id}
          </div>
        ))}
      </div>
      <div className="chatbox-container">
        <div className="chatbox-header">
          <h2>{selectedChat ? selectedChat.id : 'Selecciona un xat o inicia un nou'}</h2>
        </div>
        <div className="chatbox-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message user`}>
              <div className="message-content">{message}</div>
            </div>
          ))}
        </div>
        <div className="chatbox-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escriu un missatge..."
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
