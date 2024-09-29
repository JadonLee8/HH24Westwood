'use client';
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Status() {
    const game = useGameContext();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [showRole, setShowRole] = useState(false);

    // List of texts to display before revealing the role
    const textSeries = [
        "Many many years ago...",
        "In the wild wild west of TAMU",
        "Heroes and villains emerge from the shadows of Howdy Hack 24...",
        "And now, your role is revealed..."
    ];

    // Manage the timing of the text fade-in/fade-out
    useEffect(() => {
        if (currentTextIndex < textSeries.length) {
            setIsFading(true);
            const fadeTimeout = setTimeout(() => {
                setIsFading(false); // Start fading out
                const nextTextTimeout = setTimeout(() => {
                    setCurrentTextIndex((prev) => prev + 1); // Move to the next text
                    setIsFading(true); // Fade-in the next text
                }, 1000); // Delay before showing the next text
                return () => clearTimeout(nextTextTimeout);
            }, 3000); // How long the text stays visible before fading out
            return () => clearTimeout(fadeTimeout);
        } else {
            // After showing all texts, reveal the role
            setShowRole(true);
            const progressTimeout = setTimeout(() => {
                Socket.emit('next_game_state', { 'lobby_code': game.lobbyCode });
            }, 5000); // Delay before showing the next text
            return () => clearTimeout(progressTimeout);
        }
    }, [currentTextIndex]);

    const roleName = () => {
        if (game.role === "witness") {
            return "Witness";
        } else if (game.role === "outlaw") {
            return "Outlaw";
        } else if (game.role === "citizen") {
            return "Forensic Artist";
        } else {
            return "Unknown";
        }
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen shadow-2xl">
                <div className="bg-amber-900 p-5 m-5 rounded-md">
                    {showRole ? (
                        <h1 className="text-3xl text-white font-western1">
                            Your role in the game is: {roleName()}
                        </h1>
                    ) : (
                        <h1
                            className={`text-3xl text-white font-western1 transition-opacity duration-1000 ${isFading ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {textSeries[currentTextIndex]}
                        </h1>
                    )}
                </div>
            </div>
        </>
    );
}
