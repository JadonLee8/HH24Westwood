'use client'
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';
import React, { useEffect, useState } from 'react';

export default function WaitingRoom() {
    const game = useGameContext();
    const code = game.lobbyCode ?? "ABCDEF";
    const [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        Socket.on('lobby_players', (data) => { // TODO: maybe change to the join emit
            console.log('Lobby players:', data.players);
            const playerList = data.players;
            setPlayers(playerList);
        });
        return () => {
            Socket.off('lobby_players');
        }
    }, [])

    return (
        <>
            <div className="flex justify-center items-center w-full h-screen mt-10 flex-col">
                <div className='h-full'>
                    <div className='flex flex-row'>
                        <h2 className='font-western text-7xl text-orange-100'>
                            Join at:
                        </h2>
                        <h1 className='font-western text-9xl text-amber-50'>
                            {code}
                        </h1>
                    </div>
                    <div className='mt-10'>
                        <h2 className='font-western text-7xl text-orange-100'>
                            Players:
                        </h2>
                        <ul className='text-rose-100 text-7xl font-western1'>
                            {players.map((player, index) => (
                                <li key={index}>{player}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {game.host && (
                <div className="absolute bottom-10 right-10">
                    <button
                        onClick={() => {
                            if (game.host) {
                                Socket.emit('next_game_state', { 'lobby_code': game.lobbyCode });
                            }
                        }}
                        className="px-6 py-3 bg-blue-500 text-white text-2xl rounded"
                    >
                        Start Game
                    </button>
                </div>
            )}

        </>
    )

}