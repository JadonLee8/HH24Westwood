'use client'
import { useGameContext } from '@/components/GameContext';
import Socket from '@/components/network/Socket';
import { useEffect, useState } from 'react';


export default function(){
    const { currentLobby, host, gamemode, joinLobby, leaveLobby } = useGameContext();
    const [lobbyCode, setLobbyCode] = useState<string | null>(null);
    const [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        Socket.on('lobby_started', (data) => {
            console.log('Lobby started:', data.game_state);
            setLobbyCode(data.lobby_code);

        });

        return () => {

        }
    }, [])

    return(
        <>
            <p>
                This is the actual game
            </p>
        </>
    )
}