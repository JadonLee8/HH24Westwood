'use client';
import React, { useState, useEffect } from 'react';
import ForegroundStatic from "@/components/ForegroundStatic";
import JoinForm from './components/JoinForm';

export default function Home() {
    const [isJoinClicked, setIsJoinClicked] = useState(false); // Track whether "Join Game" was clicked
    const [resetWedges, setResetWedges] = useState(false); // Reset wedges after retracting

    // Function to play hover sound
    const playSound = () => {
        const audio = new Audio('/sounds/tunetank.com_cursor-hover-selection.mp3');
        audio.play().catch((error) => {
            console.error('Audio play failed:', error);
        });
    };

    // Play background music
    useEffect(() => {
        const backgroundMusic = new Audio('menubgm.mp3');
        backgroundMusic.loop = true; // Loop the background music
        backgroundMusic.play().catch((error) => {
            console.error('Background music play failed:', error);
        });

        return () => {
            backgroundMusic.pause(); // Pause background music when the component unmounts
        };
    }, []);

    // Handle "Join Game" button click
    const handleJoinClick = () => {
        setIsJoinClicked(true); // Move the original wedge out and bring the new wedge in
        setResetWedges(false);  // Wedges retract but stay retracted until reset
    };

    // Handle background click to reset
    const handleBackgroundClick = () => {
        if (isJoinClicked) {
            setIsJoinClicked(false); // Retract the right-side wedge
            setResetWedges(true); // Reset original wedge and border
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden" onClick={handleBackgroundClick}>
            {/* Background video that is always visible */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="bg.mp4"
                autoPlay
                loop
                muted
            ></video>

            <ForegroundStatic /> {/* Add the static effect here */}

            {/* Original Wedge with Pattern */}
            <div
                className={`absolute w-1/3 h-full transform transition-transform duration-1000 ${
                    isJoinClicked ? '-translate-x-full' : resetWedges ? 'translate-x-0' : ''
                }`} // Retract when Join is clicked, return after reset
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)',
                    backgroundImage: 'url(/pattern.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            {/* Parallelogram-Shaped Black Border for the Original Wedge */}
            <div
                className={`absolute w-1/3 h-full transform transition-transform duration-1000 ${
                    isJoinClicked ? '-translate-x-full' : resetWedges ? 'translate-x-0' : ''
                }`} // Retract when Join is clicked, return after reset
                style={{
                    clipPath: 'polygon(98% 0, 100% 0, 62% 100%, 60% 100%)',
                    backgroundColor: 'black',
                    zIndex: 1,
                }}
            ></div>

            {/* New Upside-Down Flipped Wedge */}
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
                {/* "Join Game" Text */}
                <div className="flex justify-center mt-[220px] ml-[100px]">
                    <h1 className="text-white text-5xl mb-8 text-outline-thick" style={{ fontFamily: 'WesternBangBang' }}>
                        Join Game
                    </h1>
                </div>

                {/* Input fields and Play button */}
                <JoinForm />
            </div>

            {/* Separate Parallelogram-Shaped Black Border for the Upside-Down Wedge */}
            <div
                className={`absolute w-1/3 h-full left-[80vw] transform transition-transform duration-1000 ${
                    isJoinClicked ? 'translate-x-[-33.33vw]' : ''
                }`}
                style={{
                    clipPath: 'polygon(98% 0, 100% 0, 62% 100%, 60% 100%)',
                    backgroundColor: 'black',
                    zIndex: 2, // Ensure it's on top of the wedge
                }}
            ></div>

            {/* Logo with Pulse Animation */}
            <div
                className={`absolute top-4 left-4 z-10 transform transition-transform duration-1000 ${
                    isJoinClicked ? '-translate-x-[200%]' : resetWedges ? 'translate-x-0' : ''
                }`} // Retract with the original wedge
            >
                <img
                    src="newlogo.png"
                    alt="Logo"
                    className="object-contain w-auto h-80 animate-pulse-custom"
                />
            </div>

            {/* Buttons (Pushed further off-screen, adjusted positioning) */}
            <div
                className={`absolute top-[70%] left-10 flex flex-col space-y-8 z-10 transform transition-transform duration-1000 ${
                    isJoinClicked ? '-translate-x-[200%]' : resetWedges ? 'translate-x-0' : ''
                }`} // Retract with the original wedge
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
                    href="/host"
                    className="text-white text-4xl font-normal transition duration-100 ease-in-out hover:text-gray-300 hover:scale-105 text-outline-thick"
                    style={{ fontFamily: 'WesternBangBang' }}
                    onMouseEnter={playSound}
                >
                    HOST GAME
                </a>
            </div>

            {/* Keyframe Animation for Pulsing Effect */}
            <style jsx>{`
                @keyframes pulse-custom {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                .animate-pulse-custom {
                    animation: pulse-custom 2s infinite;
                }

                /* Thicker black outline effect */
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
