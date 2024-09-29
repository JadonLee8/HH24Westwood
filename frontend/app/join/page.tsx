'use client'
import React, { useState, useEffect } from 'react';
import Socket from '@/components/network/Socket';

export default function Join() {
    const [joinCode, setJoinCode] = useState('');
    const [lobby, setLobby] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        Socket.on('lobby_joined', (data) => {
            setLobby(data);
            console.log('Lobby joined:', data);
        });

        Socket.on('error', (data) => {
            console.error(data)
        });

        return () => {
            Socket.off('lobby_joined');
            Socket.off('error');
        }
    }, [])


    const handleJoinLobby = () => {
        if (joinCode.trim() && username.trim()) { // check this if statement. I'm feeling ... iffy ... about it. HAHAHAHA
            console.log("Attempting to join lobby", joinCode);
            Socket.emit('join_lobby', { username: username, lobby_code: joinCode });
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div>
                    <h1>Enter Join Code</h1>
                    <input type="text" placeholder="Join Code" className="outline outline-2 outline-black p-2" onChange={(e) => setJoinCode(e.target.value)} />
                    <button className="btn btn-primary m-3 py-2 px-4 bg-blue-500 rounded-md" onClick={handleJoinLobby}>Join</button>
                </div>
            </div>
        </>
    );
}