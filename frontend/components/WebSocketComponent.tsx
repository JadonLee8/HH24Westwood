'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Initialize socket connection
    socket = io('http://localhost:8765');

    // Handle connection event
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    // Handle message event
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>Socket.IO Client</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h2>Messages:</h2>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
