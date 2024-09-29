'use client'
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';
import { use, useEffect, useState } from 'react';
import React from 'react';


export default function Status(){
    const game = useGameContext();
    var playerRole = '';

    Socket.emit('lobby_players', { lobby_code: game.lobbyCode }); // TODO: I probably am going about this wrong
    useEffect(() => {
        Socket.on('lobby_players', (data) => {
            console.log('Lobby players:', data.players);
            const playerList = data.players;
            playerRole = playerList.find(player => player.username === game.username)?.role;
        });
    });

    return(
        <>
            <div>
                <p>Your role in the game is: {playerRole}</p>
            </div>
        </>
    )
}