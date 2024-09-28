import React, { useEffect, useState } from 'react';
import ForegroundStatic from "@/components/ForegroundStatic";

const backgroundImages = ['bg-warble1', 'bg-warble2', 'bg-warble3', 'bg-warble4'];


export default function Home() {
    const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundImageIndex((backgroundImageIndex + 1) % backgroundImages.length);
        }, 200);

        return () => clearInterval(interval);
    }, [backgroundImageIndex]);

    return (
        <>
            <div
                className="relative flex items-center justify-center min-h-screen overflow-hidden"
                style={{ backgroundImage: 'url(background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Overlay to dim the background */}
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

                {/* Content (Buttons) */}
                <div className="flex space-x-40 justify-center mt-4 absolute bottom-20 w-full z-10">
                    <img
                        src="JoinButton.png"
                        alt="Join"
                        className="cursor-pointer object-contain w-auto h-60 transform transition-transform duration-300 hover:scale-105"
                    />
                    <img
                        src="HostButton.png"
                        alt="Host"
                        className="cursor-pointer object-contain w-auto h-60 transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </div>
        </>
    );
}
