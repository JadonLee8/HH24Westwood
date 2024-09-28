'use client'
import { useEffect, useState } from 'react';
import { useGameContext } from '@/components/context/GameContext';
// This is the window that shows up when the game is started or gamestate 0. 
// Changes depending on if host or player
export default function KickoffWindow() {
    const game = useGameContext();

    return (
        <>
            {game.host ? <HostKickoff /> : <PlayerKickoff />}
        </>
    );
}

function HostKickoff() {
    return (
        <>
        </>
    );
}

function PlayerKickoff() {
    return (
        <>
        </>
    );
}