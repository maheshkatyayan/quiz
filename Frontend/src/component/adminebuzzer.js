import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';

const socket = io('http://localhost:8000');

const Adminebuzzer = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSwitchVisible, setIsSwitchVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [isNameVisible, setIsNameVisible] = useState(true);
  const [arrayData, setArrayData] = useState([]);

  useEffect(() => {
    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
    });

    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('permission', (data) => {
      console.log("got the permission");
      setIsSwitchVisible(true);
      toast.success('Permission granted'); // Added success toast for permission
    });

    socket.on('arraydata', (data) => {
      console.log("array wala data", data);
      setArrayData(data);
      toast.success(`First click by ${data[0]}`); // Added error toast for array data
      console.log(`Buzzer first click by ${data[0]}`);
    });

    return () => {
      socket.off('connect');
      socket.off('receive_message');
      socket.off('permission');
      socket.off('arraydata');
    };
  }, []);

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = { message: newMessage };

      try {
        await axios.post('http://localhost:8000/sendmessage', messageData);
        socket.emit('send_message', newMessage);
        setMessages([...messages, newMessage]);
        setNewMessage('');
        toast.success('Message sent successfully'); // Added success toast for message sent
      } catch (e) {
        console.log(e);
        toast.error('Failed to send message'); // Added error toast for message failure
      }
    }
  };

  // Handler for the switch toggle
  const handleSwitchToggle = async () => {
    setIsSwitchVisible(false);
    console.log("teamName", teamName);
    socket.emit('send_name', teamName);
    console.log('Switch toggled');
    
    const currentTime = new Date().toISOString();
    const time = currentTime.slice(17, 23);
    console.log(time);

    const messageData = { message: currentTime };

    try {
      await axios.post('http://localhost:8000/sendmessage', messageData);
      socket.emit('send_message', currentTime);
      setMessages([...messages, currentTime]);
      toast.success('Switch toggled and message sent'); // Added success toast for switch toggle and message sent
    } catch (e) {
      console.log(e);
      toast.error('Failed to toggle switch and send message'); // Added error toast for switch toggle and message failure
    }
  };

  // Handler for team name input
  const handleTeamName = () => {
    setIsNameVisible(false);
    toast.success(`Team name set to ${teamName}`); // Added success toast for team name set
  }

  return (
    <div className="min-h-screen bg-black-100 p-4">
      <div className="message-page max-w-4xl mx-auto p-6 gray-400 shadow-md rounded-lg">
        <div className="message-card">
          <div className="message-list space-y-2">
            {messages.map((message, index) => (
              <div key={index} className="message bg-gray-200 p-2 rounded">
                {message}
              </div>
            ))}
          </div>
        </div>

        <div className="message-input-container mt-4">
          {isNameVisible && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="message-input border border-gray-300 p-2 rounded flex-grow"
                placeholder='Enter team name'
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <button
                className="send-button bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleTeamName}
              >
                Send
              </button>
            </div>
          )}
        </div>

        <div className="mt-4">
          {isSwitchVisible && (
            <button
              className="time-button bg-green-500 text-white p-2 rounded hover:bg-green-600"
              onClick={handleSwitchToggle}
            >
              hello
            </button>
          )}
        </div>
        <Toaster /> {/* Toaster component for displaying toast notifications */}
      </div>
    </div>
  );
};

export default Adminebuzzer;
