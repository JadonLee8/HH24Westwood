import React from 'react';
import ConfigWindow from './ConfigWindow';

export default function Game() {
    return (
        <>
            <div className="h-screen overflow-hidden">
                <ConfigWindow />
            </div>
        </>
    );
}