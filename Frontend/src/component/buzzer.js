import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSwitchVisible, setIsSwitchVisible] = useState(false);
  const [teamname,setteamname]=useState('')
  const [isnameVisible, setIsnameVisible] = useState(true);



  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
    });

    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('permission', (data) => {
      console.log("got the permission")
      setIsSwitchVisible(true);
    });

    return () => {
      socket.off('connect');
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = { message: newMessage };

      try {
        await axios.post('http://localhost:8000/sendmessage', messageData);
        socket.emit('send_message', newMessage);
        setMessages([...messages, newMessage]);
        setNewMessage('');
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Handler for the switch toggle
  const handleSwitchToggle = async() => {
    setIsSwitchVisible(false);
    console.log('Switch toggled');
    const currentTime = new Date().toISOString();
    const time=currentTime.slice(17,23)
    console.log(time)

    const messageData = { message: currentTime };

    try {
      await axios.post('http://localhost:8000/sendmessage', messageData);
      socket.emit('send_message', currentTime);
      setMessages([...messages, currentTime]);
    } catch (e) {
      console.log(e);
    }

  };

  const handleteamname=async()=>{
    setIsnameVisible(false)
    const nameData=teamname
    socket.emit('send_name', nameData);
  }


  return (<>
    <div className="message-page">
      <div className="message-card">
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
      </div>
      
      <div className="message-input-container">
        {isnameVisible&& (
          <div><input
          type="text"
          className="message-input"
          placeholder='Enter team name'
          value={teamname}
          onChange={(e) => setteamname(e.target.value)}
        />
        <button className="send-button" onClick={handleteamname}>
          Send
        </button></div>)}
      </div>
    </div>

    <div>
      {isSwitchVisible && (
        <button className="time-button" onClick={handleSwitchToggle}>hello</button>
      )}
    </div>
   
    </>
  );
  
};

export default MessagePage;
