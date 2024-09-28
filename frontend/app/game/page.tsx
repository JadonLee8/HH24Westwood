import React from 'react';
import ConfigWindow from './ConfigWindow';
import { GameProvider } from '@/components/context/GameContext';

export default function Game() {
    return (
        <GameProvider>
            <div className="h-screen overflow-hidden bg-gray-400">
                <ConfigWindow />
            </div>
        </GameProvider>
    );
}