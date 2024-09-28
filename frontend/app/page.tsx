'use client';
import React from 'react';
import ForegroundStatic from "@/components/ForegroundStatic";


export default function Home() {
    return (
        <>
            <ForegroundStatic /> {/* Add the static effect here */}
            <div
                className="relative flex items-center justify-center min-h-screen overflow-hidden"
                style={{
                    backgroundImage: 'url(background.jpeg)', // Keep your static background
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Overlay to dim the background */}
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

                {/* Content (Buttons) */}
                <div className="flex space-x-40 justify-center mt-4 absolute bottom-20 w-full z-10">
                    <a href="/join">
                        <img
                            src="JoinButton.png"
                            alt="Join"
                            className="cursor-pointer object-contain w-auto h-60 transform transition-transform duration-300 hover:scale-105"
                        />
                    </a>
                    <a href="/host">
                        <img
                            src="HostButton.png"
                            alt="Host"
                            className="cursor-pointer object-contain w-auto h-60 transform transition-transform duration-300 hover:scale-105"
                        />
                    </a>
                </div>
            </div>
        </>
    );
}
