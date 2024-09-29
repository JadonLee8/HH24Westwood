'use client'
import React, { useEffect, useState } from "react";
import { useGameContext } from '@/components/context/GameContext';

export default function ThirdFrame() {
    const game = useGameContext();
    let proompt = "";

    // Function to make the API call to generate the image
    const generateImage = async (prompt: string) => {
        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });
            const data = await response.json();
            if (data.imageUrl) {
                game.setCrimeImageURL(data.imageUrl);
                // Save the image URL in the game context
                game.setCrimeImageURL(data.imageUrl);
            }
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    useEffect(() => {
        proompt = game.crimePrompt;

        // Call the image generation function with the prompt
        if (proompt) {
            generateImage(proompt);
        }
    }, [game.crimePrompt]);

    return (
        <>
            {game.crimeImageURL ? <img src={game.crimeImageURL} alt="Generated image" /> : <p>Generating image...</p>}
        </>
    );
}
