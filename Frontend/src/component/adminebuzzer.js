import React, { useEffect } from 'react';
import io from 'socket.io-client';

// Initialize the socket outside of the component to avoid re-creating on each render
const socket = io('http://localhost:8000', { autoConnect: false });

const AdminBuzzer = () => {

  useEffect(() => {
    // Connect to the socket server when the component mounts
    socket.connect();

    // Log the socket ID when connected
    socket.on('connect', () => {
      console.log('Connected with socket ID:', socket.id);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Handler for the start button
  const handleStartButton1 = (e) => {
    socket.emit('Set', 1);
    console.log('Button clicked, emitted start event');
  };
  // const handlestartButton0 =(e)=> {
  //   socket.emit('Reset', 0);
  //   console.log('Button clicked, emitted start event');
  // };

  return (
    <div>
      <button onClick={handleStartButton1}>Set</button>
      {/* <button onClick={handleStartButton1}>Reset</button> */}
    </div>
  );
};

export default AdminBuzzer;
