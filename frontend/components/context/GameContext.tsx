'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface GameContextState {
    lobbyCode: string | null;
    setLobbyCode: (lobbyCode: string) => void;
    host: boolean;
    setHost: (host: boolean) => void;
    gameState: number;
    setGameState: (gameState: number) => void;
    username: string;
    setUsername: (username: string) => void;
    crimePrompt: string;
    setCrimePrompt: (crimePrompt: string) => void;
    crimeImageURL: string;
    setCrimeImageURL: (crimeImage: string) => void;
    role: string;
    setRole: (role: string) => void;
}

// Create the context with a default value
const GameContext = createContext<GameContextState | undefined>(undefined);

// Create a provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentLobby, setCurrentLobby] = useState<string | null>(null);
    const [host, setHost] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [gameState, setGameState] = useState<number>(0);
    const [role, setRole] = useState<string>('sheriff');

    const setLobbyPrint = (lobbyCode: string) => {
        console.log('Setting lobby code:', lobbyCode);
        setCurrentLobby(lobbyCode);
    }
    const [crimePrompt, setCrimePrompt] = useState<string>('');
    const [crimeImageURL, setCrimeImageURL] = useState<string>('');

    return (
        <GameContext.Provider value={{
            lobbyCode: currentLobby,
            setLobbyCode: setLobbyPrint,
            host,
            setHost,
            gameState: gameState,
            setGameState: setGameState,
            username,
            setUsername: setUsername,
            crimePrompt,
            setCrimePrompt: setCrimePrompt,
            crimeImageURL,
            setCrimeImageURL: setCrimeImageURL,
            role,
            setRole
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

