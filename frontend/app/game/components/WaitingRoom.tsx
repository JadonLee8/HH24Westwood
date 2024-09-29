'use client'
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';
import React, { use, useState } from 'react';

export default function WaitingRoom() {
    const game = useGameContext();
    const code = game.lobbyCode ?? "ABCDEF";
    const [players, setPlayers] = useState<string[]>([]);

    Socket.on('lobby_players', (data) => { // TODO: maybe change to the join emit
        console.log('Lobby players:', data.players);
        const playerList = data.players;
        setPlayers(playerList);
    });


    return(
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
                        <ul className='text-rose-100 text-9xl font-western1'>
                            {players.map((player, index) => (
                                <li key={index}>{player}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )

}