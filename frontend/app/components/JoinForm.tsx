import React, { useState, useEffect } from 'react';
import Socket from '@/components/network/Socket';
import { useGameContext } from '@/components/context/GameContext';
import { useRouter } from 'next/navigation';

const JoinForm = () => {
    const game = useGameContext();
    const [joinCode, setJoinCode] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        Socket.on('lobby_joined', (data) => {
            game.setHost(false);
            game.setLobbyCode(data.lobby_code);
            game.setGameState(0);
            router.push('/game');
        });

        return () => {
            Socket.off('lobby_joined');
        }
    }, []);

    const handlePlayClick = () => {
        console.log("Nickname:", username);
        console.log("Game Code:", joinCode);
        console.log("Attempting to join lobby", joinCode);
        Socket.emit('join_lobby', { lobby_code: joinCode, username: username });
    };

    return (
        <div
            className="flex flex-col items-center justify-center space-y-6 mt-[40px] ml-[100px]"
            onClick={(e) => e.stopPropagation()}
        >
            <input
                type="text"
                placeholder="Enter Nickname"
                className="p-2 rounded-md text-black w-1/2"
                value={username}
                maxLength={15} // Max 15 characters for nickname
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Game Code"
                className="p-2 rounded-md text-black w-1/2"
                value={joinCode}
                maxLength={6} // Max 6 characters for game code
                onChange={(e) => setJoinCode(e.target.value)}
            />
            <img
                src="/playbutton.png"
                alt="Play Button"
                className="w-[25%] cursor-pointer hover:opacity-90 active:opacity-60 hover:scale-105 transition duration-200 transform"
                onClick={handlePlayClick}
            />
        </div>
    );
};

export default JoinForm;