'use client'
import React from 'react';
import ConfigWindow from './ConfigWindow';
import { GameProvider } from '@/components/context/GameContext';
import LobbyCode from './components/LobbyCode';
import GameFrame from './components/GameFrame';
import GameFilter from './components/GameFilter';
import GameBackground from './components/GameBackground';
import WaitingRoom from './components/WaitingRoom';
import Socket from '@/components/network/Socket';

export default function Game() {
    const [gameState, setGameState] = React.useState<number>(0);

    Socket.on('next_game_state', (data) => {
        setGameState(data.game_state);
    });

    return (
        <div className="h-screen overflow-hidden">
            <ConfigWindow />
            {gameState === 0 ? <WaitingRoom /> : <GameFrame />} // TODO: update to take more game states
            <GameBackground />
            <GameFilter />
        </div>
    );
}
