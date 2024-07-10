import React, { useState, useEffect } from 'react';
import './ChatBox.css';
import Comparison from "@modules/home/components/table/comparison"
import Layout from "@modules/home/components/hero/mainLayout"


const CUSTOMERID = 'cus_01J24HEZ742P2G0BK7NMYAFNA9'


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [table, setTable] = useState('');

  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null);


  // Fetch messages from backend when component mounts
  useEffect(() => {
    getChats()
  }, []);

  useEffect(() => {
    if (!selectedChat) return;
    if (selectedChat.messages) setMessages(selectedChat.messages
      .sort((a,b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0))
      .map(message => message.content));
    else setMessages([])
    setTable(cleanJSONTable(selectedChat.json))
  }, [selectedChat]);


  const cleanJSONTable = (data) => {
    try {
      if (typeof data === 'string') data = JSON.parse(data.replaceAll("\n", ""))
      if (!data || data.length === 0) return null;
      return JSON.parse(data[data.length - 1].content.replaceAll('json', '').replaceAll("\n", "").replaceAll("```", ""))
    } catch (e) {
      return null;
    }
  }

  const initChat = async () => {
    try {
      // [TODO] Per determinar com recuperar customId per cada usuari
      await fetch(`http://localhost:9000/store/customers/${CUSTOMERID}/chats/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: `Chat ${new Date().toLocaleString()}` }),
      }).then(response => response.json())
        .then(data => {
          setChats([data.chat, ...chats]);
          setSelectedChat(data.chat)
        });

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

  console.log(chats, "haf")

  const handleSend = async () => {
    if (input.trim()) {
      try {

        fetch(`http://localhost:9000/store/customers/${CUSTOMERID}/chats/${selectedChat.id}/new_message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: input }),
        })
          .then(function(response) {
            return response.json()

          }).then(function(data) {
            selectedChat.json = data;
            selectedChat.messages = [...selectedChat.messages ||[], {content: input}]
            setTable(cleanJSONTable(data));

          console.log(data);
        });

        const newMessage = input
        setMessages([...messages, newMessage]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  let chatWrapper =
    <div className="chatbox-wrapper">
      <div className="chat-list">
        <h3>Chat list</h3>
        <button className={'new-chat-button'} onClick={initChat} style={{margin: '20px'}}>New chat</button>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChat(chat)
            }}
            className={`chat-item ${selectedChat?.id === chat.id ? "active" : ""}`}
          >
            {chat.title || chat.id}
          </div>
        ))}
      </div>
      <div className="chatbox-container">
        <div className="chatbox-header">
          <h2>{selectedChat ? selectedChat.title || selectedChat.id : 'Selecciona un xat o inicia un nou'}</h2>
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
            placeholder="Write a message..."
            disabled={selectedChat == null}
          />
          <button disabled={selectedChat == null} onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>;

  let comparisonTable = <div className="comparison-table">
    <Comparison table={table} />
  </div>;

  return <div style={{display: 'flex', width: '100%'}}>
    <div style={{width:'50%', flexShrink:0}}>{chatWrapper}</div>
    <div style={{width:'50%', flexShrink:0}}>{comparisonTable}</div>
  </div>

};

export default ChatBox
