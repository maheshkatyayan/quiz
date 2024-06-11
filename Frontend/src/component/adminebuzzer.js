import React, { useEffect ,useState} from 'react';
import io from 'socket.io-client';

// Initialize the socket outside of the component to avoid re-creating on each render
const socket = io('http://localhost:8000', { autoConnect: false });

const AdminBuzzer = () => {

  const [arraykadata, setarraykadata] = useState([]);

  useEffect(() => {
    // Connect to the socket server when the component mounts
    socket.connect();

    // Log the socket ID when connected
    socket.on('connect', () => {
      console.log('Connected with socket ID:', socket.id);
    });

 //array ka data
 socket.on('arraydata',(data)=>{
  console.log("array wala data",data)
      setarraykadata(data)
 })

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

  const handleleaderboardtime = (e) => {
    socket.emit('array');
    console.log('array start event');
  };
  

  return (
    <>
    <div>
      <button onClick={handleStartButton1}>Set</button><br></br>
      <button onClick={handleleaderboardtime}>leaderboard-time</button>
    </div>
    <div className="message-card">
        <div className="message-list">
          {arraykadata.map((i, index) => (
            <div key={index} className="message">
              {i}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminBuzzer;
