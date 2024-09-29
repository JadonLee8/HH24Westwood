'use client'
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfigWindow() {
    const game = useGameContext();
    const [players, setPlayers] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        Socket.on('lobby_created', (data) => {
            console.log('Lobby created:', data);
            game.setLobbyCode(data.lobby_code);
        });

        Socket.on('lobby_joined', (data) => {
            console.log('Lobby joined:', data);
            Socket.emit('lobby_players', { lobby_code: data.lobby_code });
        });

        Socket.on('lobby_players', (data) => {
            console.log('Lobby players:', data.players);
            const playerList = data.players;
            setPlayers(playerList);
        })

        Socket.on('lobby_started', (data) => {
            console.log('Lobby started:', data.game_state);
            game.setLobbyCode(data.lobby_code);
            game.setGameState(data.game_state);
            Socket.on('next_game_state', (data) => {
                console.log('Next game state:', data.game_state);
                game.setGameState(data.game_state);
            });
        });

        Socket.emit('lobby_players', { lobby_code: game.lobbyCode });

        if (!game.lobbyCode) {
            router.push('/');
        }

        return () => {
            console.log("Dismounting...")
            Socket.off('lobby_created');
            Socket.off('lobby_joined');
            Socket.off('lobby_players');
            Socket.off('lobby_started');
            Socket.off('next_game_state');

            Socket.emit('leave_lobby');
        }
    }, [])


    return (
        <>
            {/* <div className="p-5 m-4 bg-slate-600 absolute rounded-md">
                <p>Hosted Lobby: {game.lobbyCode ?? "None"}</p>
                <p>Host: {game.host ? 'Yes' : 'No'}</p>
                <p>Game State: {game.gameState}</p>
                <p>Players: </p>
                <ul>
                    {players.length > 0 ? players.map((player, i) => <li key={i}>{player}</li>) : <li>No players</li>}
                </ul>
                <button onClick={() => Socket.emit('start_lobby', { 'lobby_code': game.lobbyCode })} className="border border-black rounded px-4 py-2 m-2">
                    Start Game
                </button>
                <button onClick={() => Socket.emit('next_game_state', { 'lobby_code': game.lobbyCode })} className="border border-black rounded px-4 py-2 m-2">
                    Next Game State
                </button>
            </div> */}
        </>
    );
}