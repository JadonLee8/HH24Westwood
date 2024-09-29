'use client';
import React, { useState, useEffect } from 'react';
import ForegroundStatic from "@/components/ForegroundStatic";

export default function Home() {
    const [isMouseLeft, setIsMouseLeft] = useState(false); // Track mouse movement
    const [isJoinClicked, setIsJoinClicked] = useState(false); // Track whether "Join Game" was clicked

    // Function to play hover sound
    const playSound = () => {
        const audio = new Audio('/sounds/tunetank.com_cursor-hover-selection.mp3'); // Ensure this path is correct
        audio.play().catch((error) => {
            console.error('Audio play failed:', error); // Catch any play errors
        });
    };

    // Play background music
    useEffect(() => {
        const backgroundMusic = new Audio('/sounds/menubgm.mp3');
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
        if (!isJoinClicked) { // Only track mouse movement if "Join Game" isn't clicked
            const screenWidth = window.innerWidth;
            const mouseX = e.clientX;

            // If the mouse moves to the left 1/3 of the screen, show elements; else hide them
            if (mouseX < screenWidth / 3) {
                setIsMouseLeft(true); // Move elements onto the screen
            } else if (mouseX > (2 * screenWidth) / 3) {
                setIsMouseLeft(false); // Retract elements
            }
        }
    };

    // Handle "Join Game" button click
    const handleJoinClick = () => {
        setIsJoinClicked(true); // Move the original wedge out and bring the new wedge in
    };

    // Attach mousemove event listener on component mount and clean it up on unmount
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isJoinClicked]);

    return (
        <div className="relative min-h-screen overflow-hidden">
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
                    clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)', // Wedge shape
                    backgroundImage: 'url(/pattern.jpg)', // Path to your pattern file
                    backgroundSize: 'cover', // Cover the entire wedge
                    backgroundPosition: 'center', // Ensure the pattern is centered
                }}
            ></div>

            {/* Parallelogram-Shaped Black Border */}
            <div
                className={`absolute w-1/3 h-full transform transition-transform duration-1000 ${isJoinClicked ? '-translate-x-full' : (isMouseLeft ? 'translate-x-0' : '-translate-x-full')}`}
                style={{
                    clipPath: 'polygon(98% 0, 100% 0, 62% 100%, 60% 100%)', // Both sides are slanted, forming a parallelogram
                    backgroundColor: 'black', // Solid black color for the slanted edge
                    zIndex: 1, // Ensure the black edge is on top
                }}
            ></div>

            {/* New Upside-Down Wedge (appears after "Join Game" click) */}
            <div
                className={`absolute w-1/3 h-full right-[-100vw] transform transition-transform duration-1000 ${isJoinClicked ? 'translate-x-[-100vw]' : 'translate-x-[100vw]'}`} 
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)', // Correct wedge shape, no mirroring
                    backgroundImage: 'url(/pattern.jpg)', // Same pattern for the wedge
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'rotate(180deg)', // Flip the wedge upside-down
                }}
            ></div>

             {/* New Upside-Down Parallelogram-Shaped Black Border */}
             <div
                className={`absolute w-1/3 h-full right-[-100vw] transform transition-transform duration-1000 ${isJoinClicked ? 'translate-x-[-100vw]' : 'translate-x-[100vw]'}`} 
                style={{
                    clipPath: 'polygon(98% 0, 100% 0, 62% 100%, 60% 100%)', // Both sides are slanted, forming a parallelogram
                    backgroundColor: 'black', // Solid black color for the slanted edge
                    zIndex: 1, // Ensure the black edge is on top
                    transform: 'rotate(180deg)' // Flip the wedge upside-down
                }}
            ></div>

            {/* Logo with Pulse Animation */}
            <div
                className={`absolute top-4 left-4 z-10 transform transition-transform duration-1000 ${isJoinClicked ? '-translate-x-[200%]' : (isMouseLeft ? 'translate-x-0' : '-translate-x-[200%]')}`} // Push logo off-screen if "Join Game" clicked
            >
                <img
                    src="newlogo.png"
                    alt="Logo"
                    className="object-contain w-auto h-80 animate-pulse-custom" // Add custom pulse animation
                />
            </div>

            {/* Buttons (Pushed further off-screen, adjusted positioning) */}
            <div
                className={`absolute top-96 left-10 flex flex-col space-y-8 z-10 transform transition-transform duration-1000 ${isJoinClicked ? '-translate-x-[200%]' : (isMouseLeft ? 'translate-x-0' : '-translate-x-[200%]')}`} // Move buttons off-screen if "Join Game" clicked
            >
                <a
                    href="#"
                    className="text-white text-4xl font-normal transition duration-100 ease-in-out hover:text-gray-300 hover:scale-105"
                    style={{ fontFamily: 'WesternBangBang' }} // Apply the custom font here
                    onMouseEnter={playSound} // Play sound on hover
                    onClick={handleJoinClick} // Move the wedges on click
                >
                    JOIN GAME
                </a>
                <a
                    href="#"
                    className="text-white text-4xl font-normal transition duration-100 ease-in-out hover:text-gray-300 hover:scale-105"
                    style={{ fontFamily: 'WesternBangBang' }} // Apply the custom font here
                    onMouseEnter={playSound} // Play sound on hover
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
                        transform: scale(1.05); /* Slightly increase the size */
                    }
                    100% {
                        transform: scale(1); /* Return to original size */
                    }
                }
                .animate-pulse-custom {
                    animation: pulse-custom 2s infinite; /* Apply the pulse animation */
                }
            `}</style>
        </div>
    );
}
