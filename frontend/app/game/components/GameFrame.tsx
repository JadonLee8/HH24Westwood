'use client'
import React from 'react';
import { useGameContext } from '@/components/context/GameContext';
import PlayerInput from './PlayerInput';

export default function GameFrame() {
    const game = useGameContext();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-amber-900 p-5 m-5 rounded-md">
                <h1 className="text-5xl text-white font-western">Enter your crime:</h1>
                <h1 className="text-3xl text-white font-western1">3 to 5 sentences in first person</h1>
                <PlayerInput />
            </div>
        </div>
    );
}