import { useState } from 'react';

export default function PlayerInput() {
    const [input, setInput] = useState<string>('');
    return (
        <textarea
            className="bg-white text-black font-cursive 
            my-3 text-2xl p-4 h-60 w-[700px] resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ fontFamily: "'Cedarville Cursive', cursive" }}
        />
    );
}