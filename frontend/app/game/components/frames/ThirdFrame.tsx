'use client'
import React, { use, useEffect, useState } from "react";
import { useGameContext } from '@/components/context/GameContext';
import Socket from "@/components/network/Socket";

export default function ThirdFrame() {
    const game = useGameContext();
    const [showImage, setShowImage] = useState(true); // State to control image visibility

    useEffect(() => {
        Socket.on('prompt_set', (data) => {
            game.setCrimePrompt(data.prompt);
        });
        Socket.on('image_url_set', (data) => {
            game.setCrimeImageURL(data.image_url);
        });
        Socket.on('witness_account_set', (data) => {
            game.setCrimeDescription(data.witness_account);
        });
    });

   

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
                setShowImage(true); // Show the image when generated
                // Hide the image after 0.5 seconds (500 milliseconds)
                setTimeout(() => {
                    setShowImage(false);
                }, 5000); // Adjust this duration as needed
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
    }, [game.crimePrompt]);

    console.log(game.role);
    return (
        <>
            {game.role === 'witness' ? witnessFrame({ game, showImage }) : otherFrame({ game })}
        </>
    );
}

function witnessFrame({ game, showImage }) {
    return (
        <>
            {true ? (
                // Render the generated image if showImage is true
                game.crimeImageURL ? (
                    <div className="flex items-center justify-center min-h-screen">
                    <img
                        src={game.crimeImageURL}
                        alt="Generated image"
                        className="w-70 h-70 rounded-lg shadow-lg"
                        width="70"
                        height="70" // Adjust width and height as needed
                    />
                </div>
                ) : (
                    // If showImage is true but no image URL, show loading message
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-amber-800 p-5 rounded-lg">
                            <h1 className="text-white text-4xl font-western">Generating Image...</h1>
                        </div>
                    </div>
                )
            ) : (
                // If showImage is false, show the crime alert message
                <>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-amber-800 p-5 rounded-lg">
                            <h1 className="text-white text-4xl font-western">A crime just happened!</h1>
                            <textarea onChange={(e) => {game.setCrimeDescription(e.target.value); Socket.emit('set_witness_account', {'lobby_code': game.lobbyCode, 'witness_account': e.target.value})}}
                                className="mt-4 p-2 w-full h-32 rounded-lg shadow-lg"
                                placeholder="Describe what you saw..."
                            />
                            <button
                                onClick={() => {
                                    // Handle the file report action
                                    const description = game.crimeDescription;
                                    if (description) {
                                        console.log("Filing report with description:", description);
                                        // You can add more logic here to send the report to the server or perform other actions
                                    } else {
                                        console.log("No description provided.");
                                    }
                                    Socket.emit('next_game_state', { 'lobby_code': game.lobbyCode });
                                }}
                                className="mt-4 bg-blue-500 text-white p-2 rounded-lg shadow-lg"
                            >
                                File Report
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

function otherFrame( { game}) {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-amber-800 p-5 rounded-lg">
                    <h1 className="text-white text-4xl font-western">{game.role === "outlaw" ? "Committing the crime..." :"You hear a disturbance in the night..."}</h1>
                </div>
            </div>
        </>
    );
}
