'use client'
import React, { use, useEffect } from 'react';
import { useGameContext } from '@/components/context/GameContext';
import PlayerInput from '../PlayerInput';
import Image from 'next/image';
import Socket from '@/components/network/Socket';

export default function GameFrame() {
    const game = useGameContext();

    useEffect(() => {
        Socket.on('prompt_set', (data) => {
            game.setCrimePrompt(data.prompt);
        });
        Socket.on('image_url_set', (data) => {
            game.setCrimeImageURL(data.image_url);
        });
    });

    return (
        // TODO: switch from criminal to outlaw terminology
        game.role === "outlaw" ? (<OutlawFrame game={game} />) : (<InnocentFrame />)
    );
}

function OutlawFrame({ game }) {
    return (
        <div className="flex items-center justify-center min-h-screen shadow-2xl">
            <div className="bg-amber-900 p-5 m-5 rounded-md">
                <h1 className="text-5xl text-white font-western">Enter your crime:</h1>
                <h1 className="text-3xl text-white font-western1">1 to 5 sentences in first person</h1>
                <PlayerInput onChange={game.setCrimePrompt} />
                <div className="flex">
                    <button className="py-2 px-4
                bg-red-600 border-black  rounded-md w-1/4 font-western2 shadow-md hover:shadow-lg" onClick={() => {Socket.emit('next_game_state', {'lobby_code': game.lobbyCode}); Socket.emit('set_prompt', {'lobby_code': game.lobbyCode, 'prompt':game.crimePrompt})}}>Submit</button>
                </div>
            </div>
        </div>
    );
}

function InnocentFrame() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-amber-800 p-5 rounded-lg">
                <h1 className="text-white text-4xl font-western">You are asleep...</h1>
            </div>
        </div>
    );
}
