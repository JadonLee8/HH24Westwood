'use client'
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';
import { use, useEffect, useState } from 'react';
import React from 'react';


export default function Status() {
    const game = useGameContext();
    var playerRole = '';

    // TODO: make it so that if you are host (by checking game.host), you can start the game (emit 'next_game_state' with the next game state)
    // maybe move this to gameState
    Socket.emit('lobby_players', { lobby_code: game.lobbyCode }); // TODO: I probably am going about this wrong
    useEffect(() => {
        Socket.on('lobby_players', (data) => {
            console.log('Lobby players:', data.players);
            const playerList = data.players;
            playerRole = playerList.find(player => player.username === game.username)?.role;
        });
    });

    return (
        <>
            {/* NOTE: for now the role is irrelevant. everyone enters a prompt and sees an image. I just need this to work */}
            {/* TODO: display text after text fading in and out to describe the story up to this point, then display role, then automatically advance game state */}
            <div className="flex items-center justify-center min-h-screen shadow-2xl">
                <div className="bg-amber-900 p-5 m-5 rounded-md">
                    <h1 className="text-3xl text-white font-western1">Your role in the game is: {playerRole}</h1>
                </div>
            </div>
        </>
    )
}