'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context state
interface GameContextState {
    currentLobbyCode: string | null;
    setLobbyCode: (lobbyCode: string) => void;
    host: boolean;
    setHost: (host: boolean) => void;
    gameState: number;
    setGameState: (gameState: number) => void;
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
        <GameContext.Provider value={{ 
            currentLobbyCode: currentLobby,
            setLobbyCode: setCurrentLobby,
            host,
            setHost,
            gameState: gamemode,
            setGameState: setGamemode
        }}>
            {children}
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

