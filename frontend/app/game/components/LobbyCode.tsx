'use client'
import { useGameContext } from '@/components/context/GameContext';

export default function GameCode() {
    const game = useGameContext();
    return (
        <div className="absolute right-10 top-5">
            <h3 className="text-4xl font-western1 text-white" >{"Code: " + (game.lobbyCode ?? "Unknown")}</h3>
        </div>
    );
}