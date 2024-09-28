import React from 'react';
import GamemodeCard from '@/components/GamemodeCard';

export default function Host() {
    return (
        <>
            <div className="h-screen overflow-hidden">
                <div className="page-container h-screen overflow-hidden flex justify-center items-center">
                    <div className="card-container flex flex-row flex-wrap-nowrap">
                        <div className="px-2">
                            <GamemodeCard title="Game Mode 1" imageSrc="test_image.jpg" description="Description for Game Mode 1" />
                        </div>
                        <div className="px-2">
                            <GamemodeCard title="Game Mode 2" imageSrc="test_image.jpg" description="Description for Game Mode 2" />
                        </div>
                        <div className="px-2">
                            <GamemodeCard title="Game Mode 3" imageSrc="test_image.jpg" description="Description for Game Mode 3" />
                        </div>
                    </div>
                </div>
            </ div>
        </>
    );
}