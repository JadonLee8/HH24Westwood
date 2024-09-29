'use client'
import React from 'react';
import { useGameContext } from '@/components/context/GameContext';
import PlayerInput from './PlayerInput';

export default function GameFrame() {
    const game = useGameContext();

    return (
        <>
            <div className="bg-amber-900 h-max p-5 m-5 rounded-md">
                <h1 className="text-5xl text-white font-western">Enter your crime:</h1>
                <PlayerInput />

            </div>
        </>
    );
}