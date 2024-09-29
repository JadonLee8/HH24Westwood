'use client'
import React from 'react';
import { useGameContext } from '@/components/context/GameContext';
import PlayerInput from '../PlayerInput';
import { useState } from 'react';

export default function GameFrame() {
    const game = useGameContext();

    return (
        // TODO: if your not the criminal just say you are asleep
        <div className="flex items-center justify-center min-h-screen shadow-2xl">
            <div className="bg-amber-900 p-5 m-5 rounded-md">
                <h1 className="text-5xl text-white font-western">Enter your crime:</h1>
                <h1 className="text-3xl text-white font-western1">1 to 5 sentences in first person</h1>
                <PlayerInput onChange={game.setCrimePrompt} />
                <div className="flex">
                    <button className="py-2 px-4 
                    bg-red-600 border-black  rounded-md w-1/4 font-western2 shadow-md hover:shadow-lg" onClick={() => {}}>Submit</button>
                </div>
            </div>
        </div>
    );
}