'use client'
import { useGameContext } from '@/components/context/GameContext';

export default function GameCode() {
    const game = useGameContext();
    return (
        <h3 className="text-xl font-bold">{game.lobbyCode ?? "Undefined"}</h3>
    );
}