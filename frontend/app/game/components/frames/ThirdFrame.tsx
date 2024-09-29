'use client'
import React, { useEffect, useState } from "react";
import { useGameContext } from '@/components/context/GameContext';

export default function ThirdFrame() {
    const game = useGameContext();
    let prompt = game.crimePrompt;
    console.log("On Third Frame");

    // Function to make the API call to generate the image
    const generateImage = async (prompt: string) => {
        console.log("Generating image with prompt:", prompt);
        try {
            const response = await fetch('http://127.0.0.1:5000/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });
            const data = await response.json();
            console.log(data);
            if (data.imageUrl) {
                game.setCrimeImageURL(data.imageUrl);
                // Save the image URL in the game context
                game.setCrimeImageURL(data.imageUrl);
                console.log("Image URL:", data.imageUrl);
            }
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    useEffect(() => {
        prompt = game.crimePrompt;

        // Call the image generation function with the prompt
        if (prompt) {
            console.log("Prompt:", prompt);
            generateImage(prompt);
        }
    }, [game.crimePrompt]);

    return (
        <>
            {game.role === 'witness' ? witnessFrame({ game }) : otherFrame()}
        </>
    );
    console.log(game.role)
}

function witnessFrame({ game }) {
    return(
        <>
            {game.crimeImageURL ?
                <img src={game.crimeImageURL} alt="Generated image" /> :
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-amber-800 p-5 rounded-lg">
                        <h1 className="text-white text-4xl font-western">Generating Image...</h1>
                    </div>
                </div>
            }
        </>
    );
}

function otherFrame() {
    return(
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-amber-800 p-5 rounded-lg">
                    <h1 className="text-white text-4xl font-western">You here a disturbance in the night...</h1>
                </div>
            </div>
        </>
    );
}
