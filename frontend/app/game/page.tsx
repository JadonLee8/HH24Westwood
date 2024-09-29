'use client'
import React from 'react';
import ConfigWindow from './ConfigWindow';
import { GameProvider } from '@/components/context/GameContext';
import LobbyCode from './components/LobbyCode';
import GameFrame from './components/GameFrame';
import GameFilter from './components/GameFilter';
import GameBackground from './components/GameBackground';

export default function Game() {
    return (
        <div className="h-screen overflow-hidden">

            <LobbyCode />
            <ConfigWindow />
            <GameFrame />

            <GameBackground />
            <GameFilter />
        </div>
    );
}
