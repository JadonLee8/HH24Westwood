'use client'

import PlayerInput from "../PlayerInput";
import { useState } from 'react';
import { useGameContext } from '@/components/context/GameContext';

export default function FourthFrame() {
    const game = useGameContext();
    const [description, setDescription] = useState('');

    // TODO: Upload descriptions to server

    return (
        <div className="flex items-center justify-center min-h-screen shadow-2xl">
            <div className="bg-amber-900 p-5 m-5 rounded-md">
                {game.role === 'witness' ? witnessInput({ setDescription }) : otherComponent()}
            </div>
        </div>
    );
}

function witnessInput({ setDescription }) {
    return (
        <>
            <h1 className="text-5xl text-white font-western">Enter your description of the scene:</h1>
            <PlayerInput onChange={setDescription} />
            <div className="flex">
                <button className="py-2 px-4 
                bg-red-600 border-black  rounded-md w-1/4 font-western2 shadow-md hover:shadow-lg" onClick={() => { }}>Submit</button>
            </div>
        </>
    )
}

function otherComponent() {
    return (
        <h1 className="text-5xl text-white font-western">Witnesses are recounting their experiences...</h1>
    );
}