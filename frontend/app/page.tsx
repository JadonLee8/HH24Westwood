'use client';
import React, { useState, useEffect } from 'react';
import ForegroundStatic from "@/components/ForegroundStatic";
import JoinForm from './components/JoinForm';
import Link from 'next/link';
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';

export default function Home() {
    const [isJoinClicked, setIsJoinClicked] = useState(false);
    const [isHostClicked, setIsHostClicked] = useState(false);
    const [resetWedges, setResetWedges] = useState(false);
    const [backgroundVideo, setBackgroundVideo] = useState('bg.mp4');
    const game = useGameContext();
    const [username, setUsername] = useState<string>(''); 

    useEffect(() => {
        Socket.on('lobby_created', (data) => {
            console.log('Lobby created:', data);
            game.setLobbyCode(data.lobby_code);
        });

        return () => {
            Socket.off('lobby_created');
        };
    }, []);

    const playSound = () => {
        const audio = new Audio('/sounds/tunetank.com_cursor-hover-selection.mp3');
        audio.play().catch((error) => {
            console.error('Audio play failed:', error);
        });
    };

    useEffect(() => {
        const backgroundMusic = new Audio('menubgm.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.play().catch((error) => {
            console.error('Background music play failed:', error);
        });

        return () => {
            backgroundMusic.pause();
        };
    }, []);

    const handleJoinClick = () => {
        setIsJoinClicked(true);
        setResetWedges(false);
    };

    const handleHostClick = () => {
        setIsHostClicked(true);
        setResetWedges(false);

        setTimeout(() => {
            setBackgroundVideo('bg3.mp4');
        }, 2140); 
    };

    const handleBackgroundClick = () => {
        if (isJoinClicked || isHostClicked) {
            setIsJoinClicked(false);
            setIsHostClicked(false); 
            setResetWedges(true);

            setTimeout(() => {
                setBackgroundVideo('bg.mp4');
            }, 1320);
        }
    };

    const preventWedgeReset = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="relative min-h-screen overflow-hidden" onClick={handleBackgroundClick}>
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src={backgroundVideo}
                autoPlay
                loop
                muted
            ></video>

            <ForegroundStatic />

            {/* Original Wedge with Pattern */}
            <div
                className={`absolute w-1/3 h-full transform transition-transform duration-[2000ms] ${
                    isJoinClicked || isHostClicked ? '-translate-x-full' : resetWedges ? 'translate-x-0 delay-[1300ms]' : ''
                }`}
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)',
                    backgroundImage: 'url(/pattern.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            <div
                className={`absolute w-1/3 h-full transform transition-transform duration-[2000ms] ${
                    isJoinClicked || isHostClicked ? '-translate-x-full' : resetWedges ? 'translate-x-0 delay-[1300ms]' : ''
                }`}
                style={{
                    clipPath: 'polygon(98% 0, 100% 0, 62% 100%, 60% 100%)',
                    backgroundColor: 'black',
                    zIndex: 1,
                }}
            ></div>

            {/* New Wedge for Join Game */}
            <div
                className={`absolute w-1/3 h-full left-[100vw] transform transition-transform duration-1000 ${
                    isJoinClicked ? 'translate-x-[-33.33vw]' : ''
                }`}
                style={{
                    clipPath: 'polygon(100% 100%, 0 100%, 40% 0, 100% 0)',
                    backgroundImage: 'url(/pattern.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="flex justify-center mt-[220px] ml-[100px]">
                    <h1 className="text-white text-5xl mb-8 text-outline-thick" style={{ fontFamily: 'WesternBangBang' }}>
                        Join Game
                    </h1>
                </div>
                <JoinForm />
            </div>

            <div
                className={`absolute w-1/3 h-full left-[80vw] transform transition-transform duration-1000 ${
                    isJoinClicked ? 'translate-x-[-33.33vw]' : ''
                }`}
                style={{
                    clipPath: 'polygon(98% 0, 100% 0, 62% 100%, 60% 100%)',
                    backgroundColor: 'black',
                    zIndex: 2,
                }}
            ></div>

            {/* New Full-Screen Wedge for Host Game */}
            <div
                className={`absolute w-[200vw] h-full left-[100vw] transform transition-transform duration-[5000ms] ${
                    isHostClicked ? 'translate-x-[-262vw]' : ''
                }`} 
                style={{
                    clipPath: 'polygon(100% 100%, 0 100%, 40% 0, 90% 0)', 
                    backgroundImage: 'url(/pattern.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="flex flex-col items-center justify-start h-full" style={{ marginTop: '250px', marginLeft: '2350px' }}>
                    {/* Host Game Text */}
                    <h1 className="text-white text-6xl mb-6 text-outline-thick" style={{ fontFamily: 'WesternBangBang' }}>
                        Host Game
                    </h1>

                    {/* Host Menu (Username Input and Start Button) */}
                    <div className="card-container flex flex-col items-center" onClick={preventWedgeReset}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="visible-border-textbox px-4 py-2 mb-4"
                            maxLength={15} 
                            onClick={preventWedgeReset} // Prevent background click
                        />
                        <Link href="/game">
                            <img
                                src="/startbutton.png" 
                                alt="Start Lobby"
                                className="start-lobby-button"
                                onClick={(e) => {
                                    preventWedgeReset(e);
                                    Socket.emit("create_lobby", { username: username });
                                    game.setUsername(username);
                                    game.setHost(true);
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Add delay to logo and buttons to match the wedge transition */}
            <div
                className={`absolute top-4 left-4 z-10 transform transition-transform duration-1000 ${
                    isJoinClicked || isHostClicked ? '-translate-x-[200%] delay-[50ms]' : resetWedges ? 'translate-x-0 delay-[1300ms]' : ''
                }`}
            >
                <img src="newlogo.png" alt="Logo" className="object-contain w-auto h-80 animate-pulse-custom" />
            </div>

            <div
                className={`absolute top-[70%] left-10 flex flex-col space-y-8 z-10 transform transition-transform duration-1000 ${
                    isJoinClicked || isHostClicked ? '-translate-x-[200%] delay-[50ms]' : resetWedges ? 'translate-x-0 delay-[1300ms]' : ''
                }`}
            >
                <a
                    href="#"
                    className="text-white text-4xl font-normal transition duration-100 ease-in-out hover:text-gray-300 hover:scale-105 text-outline-thick"
                    style={{ fontFamily: 'WesternBangBang' }}
                    onMouseEnter={playSound}
                    onClick={handleJoinClick}
                >
                    JOIN GAME
                </a>
                <a
                    href="#"
                    className="text-white text-4xl font-normal transition duration-100 ease-in-out hover:text-gray-300 hover:scale-105 text-outline-thick"
                    style={{ fontFamily: 'WesternBangBang' }}
                    onMouseEnter={playSound}
                    onClick={handleHostClick}
                >
                    HOST GAME
                </a>
            </div>

            <style jsx>{`
                @font-face {
                    font-family: 'West';
                    src: url('/fonts/West.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
                }

                .visible-border-textbox {
                    background: rgba(255, 255, 255, 0.9);
                    border: 2px solid black;
                    color: black;
                    font-family: 'West', sans-serif;
                    outline: none;
                    font-size: 24px;
                    font-weight: bold;
                }

                input::placeholder {
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 24px;
                }

                .start-lobby-button {
                    cursor: pointer;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    width: 120px;
                }

                .start-lobby-button:hover {
                    transform: scale(1.1);
                    opacity: 0.8;
                }

                .start-lobby-button:active {
                    transform: scale(1.05);
                }

                .text-outline-thick {
                    text-shadow: 
                        -2px -2px 0 #000, 
                        2px -2px 0 #000, 
                        -2px 2px 0 #000, 
                        2px 2px 0 #000,
                        -3px -3px 0 #000, 
                        3px -3px 0 #000, 
                        -3px 3px 0 #000, 
                        3px 3px 0 #000;
                }
            `}</style>
        </div>
    );
}
