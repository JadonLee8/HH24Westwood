import { useState } from 'react';

export default function PlayerInput({ onChange }: { onChange: (input: string) => void }) {
    return (
        <textarea
            className="bg-white text-black font-cursive 
            my-3 text-2xl p-4 h-60 w-[700px] resize-none shadow-inner"
            onChange={(e) => onChange(e.target.value)}
            style={{ fontFamily: "'Cedarville Cursive', cursive" }}
        />
    );
}