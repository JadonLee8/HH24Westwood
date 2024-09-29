'use client';
import React, { useState, useEffect } from 'react';
import ForegroundStatic from "@/components/ForegroundStatic";

export default function Home() {
    const [isMouseLeft, setIsMouseLeft] = useState(false); // Track mouse movement
    const [isJoinClicked, setIsJoinClicked] = useState(false); // Track whether "Join Game" was clicked
    const [nickname, setNickname] = useState(""); // State to store nickname
    const [gameCode, setGameCode] = useState(""); // State to store game code

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

    // Function to handle mouse movement, disabled after "Join Game" is clicked
    const handleMouseMove = (e) => {
        if (!isJoinClicked) {
            const screenWidth = window.innerWidth;
            const mouseX = e.clientX;

            // If the mouse moves to the left 1/3 of the screen, show elements; else hide them
            if (mouseX < screenWidth / 3) {
                setIsMouseLeft(true);
            } else if (mouseX > (2 * screenWidth) / 3) {
                setIsMouseLeft(false);
            }
        }
    };

    // Handle "Join Game" button click
    const handleJoinClick = () => {
        setIsJoinClicked(true); // Move the original wedge out and bring the new wedge in
    };

    // Handle "Play" button click
    const handlePlayClick = () => {
        console.log("Nickname:", nickname);
        console.log("Game Code:", gameCode);
    };

    // Handle background click to reset
    const handleBackgroundClick = () => {
        if (isJoinClicked) {
            setIsJoinClicked(false); // Reset the join state
            setIsMouseLeft(false); // Reset the mouse tracking for the left wedge
        }
    };

    // Attach mousemove event listener on component mount and clean it up on unmount
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isJoinClicked]);

    return (
        <div className="relative min-h-screen overflow-hidden" onClick={handleBackgroundClick}>
            {/* Background image that is always visible */}
            <video
            className="absolute inset-0 w-full h-full object-cover "
            src="bg.mp4"
            autoPlay
            loop
            muted
        ></video>

            <ForegroundStatic /> {/* Add the static effect here */}

            {/* Original Wedge with Pattern */}
            <div
                className={`absolute w-1/3 h-full transform transition-transform duration-1000 ${isJoinClicked ? '-translate-x-full' : (isMouseLeft ? 'translate-x-0' : '-translate-x-full')}`} 
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)',
                    backgroundImage: 'url(/pattern.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            {/* Parallelogram-Shaped Black Border for the Original Wedge */}
            <div
                className={`absolute w-1/3 h-full transform transition-transform duration-1000 ${isJoinClicked ? '-translate-x-full' : (isMouseLeft ? 'translate-x-0' : '-translate-x-full')}`}
                style={{
                    clipPath: 'polygon(98% 0, 100% 0, 62% 100%, 60% 100%)',
                    backgroundColor: 'black',
                    zIndex: 1,
                }}
            ></div>

            {/* New Upside-Down Flipped Wedge */}
            <div
                className={`absolute w-1/3 h-full left-[100vw] transform transition-transform duration-1000 ${isJoinClicked ? 'translate-x-[-33.33vw]' : ''}`} 
                style={{
                    clipPath: 'polygon(100% 100%, 0 100%, 40% 0, 100% 0)',
                    backgroundImage: 'url(/pattern.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Input fields and Play button */}
                <div className="flex flex-col items-center justify-center h-full space-y-6 p-6" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="text"
                        placeholder="Enter Nickname"
                        className="p-2 rounded-md text-black w-1/2 ml-20 mt-20"
                        value={nickname}
                        maxLength={15} // Max 15 characters for nickname
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Game Code"
                        className="p-2 rounded-md text-black w-1/2 ml-20"
                        value={gameCode}
                        maxLength={6} // Max 6 characters for game code
                        onChange={(e) => setGameCode(e.target.value)}
                    />
                    <img
                        src="/playbutton.png"
                        alt="Play Button"
                        className="w-[25%] ml-20 cursor-pointer hover:opacity-90 active:opacity-60 hover:scale-105 transition duration-200 transform"
                        onClick={handlePlayClick}
                        onMouseEnter={playSound}
                    />
                </div>
            </div>

            {/* Separate Parallelogram-Shaped Black Border for the Upside-Down Wedge */}
            <div
                className={`absolute w-1/3 h-full left-[100vw] transform transition-transform duration-1000 ${isJoinClicked ? 'translate-x-[-53.33vw]' : ''}`}
                style={{
                    clipPath: 'polygon(98% 0, 100% 0, 62% 100%, 60% 100%)',
                    backgroundColor: 'black',
                    zIndex: 2, // Ensure it's on top of the wedge
                }}
            ></div>

            {/* Logo with Pulse Animation */}
            <div
                className={`absolute top-4 left-4 z-10 transform transition-transform duration-1000 ${isJoinClicked ? '-translate-x-[200%]' : (isMouseLeft ? 'translate-x-0' : '-translate-x-[200%]')}`}
            >
                <img
                    src="newlogo.png"
                    alt="Logo"
                    className="object-contain w-auto h-80 animate-pulse-custom"
                />
            </div>

            {/* Buttons (Pushed further off-screen, adjusted positioning) */}
            <div
                className={`absolute top-96 left-10 flex flex-col space-y-8 z-10 transform transition-transform duration-1000 ${isJoinClicked ? '-translate-x-[200%]' : (isMouseLeft ? 'translate-x-0' : '-translate-x-[200%]')}`}
            >
                <a
                    href="#"
                    className="text-white text-4xl font-normal transition duration-100 ease-in-out hover:text-gray-300 hover:scale-105"
                    style={{ fontFamily: 'WesternBangBang' }}
                    onMouseEnter={playSound}
                    onClick={handleJoinClick}
                >
                    JOIN GAME
                </a>
                <a
                    href="#"
                    className="text-white text-4xl font-normal transition duration-100 ease-in-out hover:text-gray-300 hover:scale-105"
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
            `}</style>
        </div>
    );
}
