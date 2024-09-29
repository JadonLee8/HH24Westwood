'use client'
import React, { use, useEffect } from 'react';
import ConfigWindow from './ConfigWindow';
import { GameProvider, useGameContext } from '@/components/context/GameContext';
import LobbyCode from './components/LobbyCode';
import GameFrame from './components/frames/GameFrame';
import GameFilter from './components/GameFilter';
import GameBackground from './components/GameBackground';
import WaitingRoom from './components/frames/WaitingRoom';
import Socket from '@/components/network/Socket';
import FirstFrame from './components/frames/FirstFrame';
import ThirdFrame from './components/frames/ThirdFrame';

export default function Game() {
    const game = useGameContext();


    useEffect(() => {
        Socket.on('next_game_state', (data) => {
            game.setGameState(data.game_state);
            console.log('Next game state:', data.game_state);
        });
    });

    const renderComponent = () => {
        switch (game.gameState) {
            case 0:
                return <WaitingRoom />;
            case 1:
                return <FirstFrame />;
            case 2:
                return <GameFrame />;
            case 3:
                return <ThirdFrame />;
            default:
                return <div>No component selected</div>;
        }
    };

    return (
        <div className="h-screen overflow-hidden">
            <ConfigWindow />
            {renderComponent()}
            <GameBackground />
            <GameFilter />
        </div>
    );
}
