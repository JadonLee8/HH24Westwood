'use client'
import { useGameContext } from '@/components/GameContext';
import Socket from '@/components/network/Socket';
import { useEffect, useState } from 'react';

export default function ConfigWindow() {
    const { currentLobby, host, gamemode, joinLobby, leaveLobby } = useGameContext();
    const [lobbyCode, setLobbyCode] = useState<string | null>(null);
    const [players, setPlayers] = useState<string[]>([]);
    const [gameState, setGameState] = useState<string>('');

    useEffect(() => {
        const leaveLobby = () => {
            Socket.emit('leave_lobby');
        }

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
            leaveLobby();
        }
    }, [])


    return (
        <>
            <div className="h-screen overflow-hidden">
                <div className="page-container h-screen overflow-hidden flex justify-center items-center">
                    <div className="card-container flex flex-row flex-wrap-nowrap">
                        <div className="px-2">
                            <h1>Game Frame</h1>
                            <p>Current Lobby: {currentLobby ?? "None"}</p>
                            <p>Host: {host ? 'Yes' : 'No'}</p>
                            <p>Game Mode: {gamemode}</p>
                            <p>Lobby Code: {lobbyCode}</p>
                            <p>Players: </p>
                            <ul>
                                {players.length > 0 ? players.map((player, i) => <li key={i}>{player}</li>) : <li>No players</li>}
                            </ul>
                            <p>Players: {players.join(', ')}</p>
                            <p>Game State: {gameState}</p>
                            <button onClick={() => Socket.emit('start_lobby', { 'lobby_code': lobbyCode })} className="border border-black rounded px-4 py-2 m-2">
                                Start Game
                            </button>
                            <button onClick={() => Socket.emit('next_game_state', { 'lobby_code': lobbyCode })} className="border border-black rounded px-4 py-2 m-2">
                                Next Game State
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}