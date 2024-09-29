'use client'
import React, { use, useEffect, useState } from "react";
import { useGameContext } from '@/components/context/GameContext';
import Socket from "@/components/network/Socket";

export default function ThirdFrame() {
    useEffect(() => {
        Socket.on('prompt_set', (data) => {
            game.setCrimePrompt(data.prompt);
        });
        Socket.on('image_url_set', (data) => {
            game.setCrimeImageURL(data.image_url);
        });
    });

    const game = useGameContext();

    const generateImage = async (prompt: string) => {
        console.log("Generating image with prompt 1:", prompt);
        try {
            console.log("Generating image with prompt:", prompt);
            const response = await fetch('http://127.0.0.1:5000/generate-image', { // Ensure the URL matches your backend server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });
            const data = await response.json();
            console.log("Generated re:", response);
            if (data.image_url) {
                // Save the image URL in the game context
                game.setCrimeImageURL(data.image_url);
            }
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    useEffect(() => {
        const prompt = game.crimePrompt;
        // Call the image generation function with the prompt
        console.log("Use effect!")
        console.log("Prompt:", prompt);
        console.log("Role:", game.role);
        if (prompt && game.role === 'witness') {
            generateImage(prompt);
        }
    }, []);

    console.log(game.role);
    return (
        <>
            {game.role === 'witness' ? witnessFrame({ game }) : otherFrame()}
        </>
    );
}

function witnessFrame({ game }) {
    return (
        <>
            {game.crimeImageURL ? (
                <div className="flex items-center justify-center min-h-screen">
                    <img
                        src={game.crimeImageURL}
                        alt="Generated image"
                        className="w-70 h-70 rounded-lg shadow-lg" // Adjust width and height as needed
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-amber-800 p-5 rounded-lg">
                        <h1 className="text-white text-4xl font-western">Generating Image...</h1>
                    </div>
                </div>
            )}
        </>
    );
}

function otherFrame() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-amber-800 p-5 rounded-lg">
                    <h1 className="text-white text-4xl font-western">You here a disturbance in the night...</h1>
                </div>
            </div>
        </>
    );
}
