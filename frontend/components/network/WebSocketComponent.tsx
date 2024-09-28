'use client'
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [lobbies, setLobbies] = useState([]);
  const [lobbyName, setLobbyName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentLobby, setCurrentLobby] = useState(null);

  useEffect(() => {
    // Connect to the backend socket server
    const socketIo = io('http://localhost:8765');
    setSocket(socketIo);

    const originalOn = socketIo.on;
    socketIo.on = function(event, callback) {
      const wrappedCallback = (...args) => {
        console.log(`Received event: ${event}`, args);
        callback.apply(null, args);
      };
      return originalOn.apply(socketIo, [event, wrappedCallback]);
    };

    // Listen for the list of lobbies
    socketIo.on('lobbies_list', (data) => {
      console.log('Received lobbies list:', data.lobbies);
      setLobbies(data.lobbies);
    });

    // Cleanup on component unmount
    return () => {
      socketIo.disconnect();
    };
  }, []);

  // Fetch the list of lobbies from the server
  const fetchLobbies = () => {
    socket.emit('get_lobbies');
  };

  // Create a new lobby
  const createLobby = () => {
    if (lobbyName) {
      socket.emit('create_lobby', { lobby_name: lobbyName });
      fetchLobbies();
    }
  };

  // Join a lobby
  const joinLobby = (lobby) => {
    console.log('Joining lobby:', lobby);
    socket.emit('join_lobby', { lobby_name: lobby });
    setCurrentLobby(lobby);
    setMessages([]);

    // Remove any existing listeners to avoid duplicate messages
    socket.off('lobby_message');

    // Listen for messages from the lobby
    socket.on('lobby_message', (data) => {
      console.log("Lobby message!")
      setMessages((prev) => [...prev, data.message]);
    });
  };

  // Leave the current lobby
  const leaveLobby = () => {
    if (currentLobby) {
      socket.emit('leave_lobby', { lobby_name: currentLobby });
      setCurrentLobby(null);
      setMessages([]);
      // Remove any existing listeners to avoid duplicate messages
      socket.off('lobby_message');
    }
  };

  // Send a message to the lobby
  const sendMessage = () => {
    if (currentLobby && message.trim()) {
      socket.emit('lobby_message', { lobby_name: currentLobby, message });
      setMessage('');
    }
  };

  return (
    <div className="m-3">
      <h1 className="text-3xl font-bold">Lobby System</h1>

      <div className='m-3'>
        {/* Lobby List */}
        <h2 className="text-xl font-bold">Lobbies</h2>
        <button onClick={fetchLobbies}>Refresh Lobbies</button>
        <ul>
          {lobbies.map((lobby) => (
            <li key={lobby}>
              {lobby} <button onClick={() => joinLobby(lobby)}>Join</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Create Lobby */}
      <div>
        <h2>Create a New Lobby</h2>
        <input
          value={lobbyName}
          onChange={(e) => setLobbyName(e.target.value)}
          placeholder="Lobby Name"
          className="bg-gray-300"
        />
        <button onClick={createLobby}>Create Lobby</button>
      </div>

      {/* Current Lobby */}
      {currentLobby && (
        <div>
          <h2>Current Lobby: {currentLobby}</h2>
          <button onClick={leaveLobby}>Leave Lobby</button>

          {/* Messaging */}
          <div>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send Message</button>
          </div>

          {/* Messages */}
          <div>
            <h3>Messages</h3>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
