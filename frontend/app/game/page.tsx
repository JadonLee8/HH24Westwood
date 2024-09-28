import React from 'react';
import GameFrame from './GameFrame';

export default function Game() {
    return (
        <>
            <div className="h-screen overflow-hidden">
                <GameFrame />
            </div>
        </>
    );
}