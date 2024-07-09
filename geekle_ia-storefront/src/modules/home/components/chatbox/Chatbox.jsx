import React, { useState, useEffect } from 'react';
import './ChatBox.css';

const CUSTOMERID = 'cus_01J27FYAKGMXNCSFM6JFH93X03'


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [table, setTable] = useState('');

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
        // const response = await fetch(`http://localhost:9000/store/customers/${CUSTOMERID}/chats/${chatId}/new_message`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ content: input}),
        // });

        fetch(`http://localhost:9000/store/customers/${CUSTOMERID}/chats/${chatId}/new_message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: input}),
        })
          .then(function(response) {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            return response.json()

          }).then(function(data) {
          setTable(JSON.parse(data.answer[data.answer.length -1].content.replaceAll('json', '').replaceAll("\n", "").replaceAll("```", "")));

          // `data` is the parsed version of the JSON returned from the above endpoint.
          console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
        });

        const newMessage = input
        setMessages([...messages, newMessage]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
//dangerouslySetInnerHTML={{ __html: table }}
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

  <div className="comparison-table" >
    {table ?
    <table>
      <tr>
        {Object.keys(table[0]).map(k => <th>{k}</th>)}
      </tr>
      {Object.values(table).map((v) => <tr>
        {Object.values(v).map(c => <td style={{padding: "30px;"}}>{c}</td>)}
      </tr>)}
    </table> : ''}
  </div>
</div>
  );
};

export default ChatBox
