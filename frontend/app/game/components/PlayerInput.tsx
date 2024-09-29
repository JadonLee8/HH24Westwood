import { useState } from 'react';

export default function PlayerInput() {
    const [input, setInput] = useState<string>('');
    return (
        <>
            <input className="bg-white text-black font-cursive" value={input} onChange={(e) => setInput(e.target.value)}></input>
        </>
    );
}