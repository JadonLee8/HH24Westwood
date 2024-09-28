import React from 'react';
export default function Home() {
    return (
        <>
            <div
            className="flex items-center justify-center min-h-screen overflow-hidden"
            style={{ backgroundImage: 'url(background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="flex space-x-4 justify-center mt-4 absolute bottom-10 w-full">
                    <img src="JoinButton.png" alt="Join" className="cursor-pointer object-contain w-auto h-48"/>
                    <img src="HostButton.png" alt="Host" className="cursor-pointer object-contain w-auto h-48"/>
                </div>
            </div>
        </>

    );
}