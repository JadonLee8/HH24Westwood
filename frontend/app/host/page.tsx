'use client'
import React, { useEffect, useState } from 'react';
import GamemodeCard from '@/components/GamemodeCard';
import Link from 'next/link';
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';

export default function Host() {
    const game = useGameContext();
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        Socket.on('lobby_created', (data) => {
            console.log('Lobby created:', data);
            game.setLobbyCode(data.lobby_code);
        });

        return () => {
            Socket.off('lobby_created');
        }
    }, []);

    return (
        <>
            <div className="host-container h-screen overflow-hidden relative">
                <Link href="../">
                    <button className="cursor-pointer hover:opacity-90 active:opacity-60 hover:scale-105 transition duration-200 transform">
                        <img
                            src="/backbutton.png" // Update with your image path
                            alt="Back"
                            width="70" // Set the width explicitly
                            height="auto" // Let height adjust based on width
                        />
                    </button>
                </Link>
                <div className="page-container h-screen overflow-hidden flex justify-center items-center">
                    <div className="card-container flex flex-row items-center" style={{ marginLeft: '250px', marginTop: '230px' }}>
                        {/* Text box without outline and Start Lobby button spaced closer and made smaller */}
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="invisible-border-textbox px-4 py-2"
                            maxLength={15} // Set the max character length to 15
                        />
                        <Link href="/game">
                            <img
                                src="/startbutton.png" // Update with your image path
                                alt="Start Lobby"
                                className="start-lobby-button"
                                onClick={() => {
                                    Socket.emit("create_lobby", { username: username });
                                    game.setUsername(username)
                                    game.setHost(true);
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @font-face {
                    font-family: 'West';
                    src: url('/fonts/West.ttf') format('truetype'); /* Make sure you have the font file available */
                    font-weight: normal;
                    font-style: normal;
                }
                .host-container {
                    background-image: url('/wantedposter.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    filter: brightness(0.8);
                }
                .page-container {
                    position: relative;
                    z-index: 1;
                }
                .invisible-border-textbox {
                    background: transparent; /* Make the background transparent */
                    border: none; /* Remove the border */
                    color: black; /* Text color */
                    font-family: 'West', sans-serif; /* Apply the "West" font */
                    outline: none; /* Remove the focus outline */
                    font-size: 24px; /* Increase font size */
                    font-weight: bold; /* Make input text bold */
                }
                input::placeholder {
                    color: rgba(0, 0, 0, 0.5); /* Placeholder text color to black with opacity */
                    font-size: 24px; /* Make placeholder font size match the input text */
                }
                .start-lobby-button, .back-button {
                    cursor: pointer;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    width: 120px; /* Set the size for the button */
                }
                .start-lobby-button:hover, .back-button:hover {
                    transform: scale(1.1); /* Slightly increase the size */
                    opacity: 0.8; /* Make it slightly opaque */
                }
                .start-lobby-button:active, .back-button:active {
                    transform: scale(1.05); /* Slightly reduce scale for click effect */
                }
            `}</style>
        </>
    );
}
