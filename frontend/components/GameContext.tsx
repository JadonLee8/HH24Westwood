'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import WebSocketComponent from './network/WebSocketComponent';

// Define the shape of the context state
interface GameContextState {
    currentLobby: string | null;
    host: boolean;
    gamemode: number;
    joinLobby: (lobby: string) => void;
    leaveLobby: () => void;
}

// Create the context with a default value
const GameContext = createContext<GameContextState | undefined>(undefined);

// Create a provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentLobby, setCurrentLobby] = useState<string | null>(null);
    const [host, setHost] = useState<boolean>(false);
    const [gamemode, setGamemode] = useState<number>(0);

    const joinLobby = (lobby: string) => {
        // Logic to join a lobby
        setCurrentLobby(lobby);
    };

    const leaveLobby = () => {
        // Logic to leave a lobby
        setCurrentLobby(null);
    };

    return (
        <GameContext.Provider value={{ currentLobby, host, gamemode, joinLobby, leaveLobby }}>
            {children}
            <WebSocketComponent />
        </GameContext.Provider>
    );
};

// Custom hook to use the GameContext
export const useGameContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};

