'use client'
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';
import { use, useEffect, useState } from 'react';
import React from 'react';


export default function Status(){
    const game = useGameContext();
    var playerRole = '';

    // TODO: make it so that if you are host (by checking game.host), you can start the game (emit 'next_game_state' with the next game state)

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
            <div>// TODO: display text after text fading in and out to describe the story up to this point, then display role, then automatically advance game state
                <p>Your role in the game is: {playerRole}</p>
            </div>
        </>
    )
}