'use client'
import { useGameContext } from '@/components/context/GameContext';
import Socket from '@/components/network/Socket';
import { useEffect, useState } from 'react';

export default function ConfigWindow() {
    const { lobbyCode: currentLobbyCode, setLobbyCode, host, setHost, gameState, setGameState } = useGameContext();
    const [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        Socket.on('lobby_created', (data) => {
            console.log('Lobby created:', data);
            setLobbyCode(data.lobby_code);

            Socket.on('lobby_joined', (data) => {
                console.log('Lobby joined:', data);
                Socket.emit('lobby_players', { lobby_code: data.lobby_code });
            });

            Socket.on('lobby_players', (data) => {
                console.log('Lobby players:', data.players);
                const playerList = data.players;
                setPlayers(playerList);
            })
        });

        Socket.on('lobby_started', (data) => {
            console.log('Lobby started:', data.game_state);
            setLobbyCode(data.lobby_code);
            setGameState(data.game_state);
            Socket.on('next_game_state', (data) => {
                console.log('Next game state:', data.game_state);
                setGameState(data.game_state);
            });
        });

        Socket.emit('create_lobby');

        return () => {
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
            <div className="p-5 m-4 bg-slate-600 inline-block rounded-md">
                <p>Hosted Lobby: {currentLobbyCode ?? "None"}</p>
                <p>Host: {host ? 'Yes' : 'No'}</p>
                <p>Game State: {gameState}</p>
                <p>Players: </p>
                <ul>
                    {players.length > 0 ? players.map((player, i) => <li key={i}>{player}</li>) : <li>No players</li>}
                </ul>
                <p>Game State: {gameState}</p>
                <button onClick={() => Socket.emit('start_lobby', { 'lobby_code': currentLobbyCode })} className="border border-black rounded px-4 py-2 m-2">
                    Start Game
                </button>
                <button onClick={() => Socket.emit('next_game_state', { 'lobby_code': currentLobbyCode })} className="border border-black rounded px-4 py-2 m-2">
                    Next Game State
                </button>
            </div>
        </>
    );
}