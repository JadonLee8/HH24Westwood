'use client'
import React, { useEffect, useState } from 'react';
import GamemodeCard from '@/components/GamemodeCard';
import Link from 'next/link';
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';

export default function Host() {
    const game = useGameContext();
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        Socket.on('lobby_created', (data) => {
            console.log('Lobby created:', data);
            game.setLobbyCode(data.lobby_code);
        });

        return () => {
            Socket.off('lobby_created');
        }
    }, []);

    return (
        <>
            <div className="h-screen overflow-hidden relative">
                <Link href="/">
                    <button className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Back
                    </button>
                </Link>
                <div className="page-container h-screen overflow-hidden flex justify-center items-center">
                    <div className="card-container flex flex-row flex-wrap-nowrap">
                        {/* <div className="px-2">
                            <GamemodeCard title="Game Mode 1" imageSrc="test_image.jpg" description="Description for Game Mode 1" link="game" />
                        </div> */}
                        {/* <div className="px-2">
                            <GamemodeCard title="Game Mode 2" imageSrc="test_image.jpg" description="Description for Game Mode 2" />
                        </div>
                        <div className="px-2">
                            <GamemodeCard title="Game Mode 3" imageSrc="test_image.jpg" description="Description for Game Mode 3" />
                        </div> */}
                        <div className="px-2">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="border border-gray-300 rounded px-4 py-2"
                            />
                        </div>
                        <Link href="/game">
                            <button className="border border-black rounded px-4 py-2 m-2" onClick={() => {
                                Socket.emit("create_lobby", { username: username })
                                game.setUsername(username)
                                game.setHost(true)
                                }}>
                                Start Lobby
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}