'use client'
import { useState, useEffect } from "react";
import Socket from "@/components/network/Socket";
import { useGameContext } from "@/components/context/GameContext";

export default function SixthFrame() {
    const game = useGameContext();
    const [images, setImages] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [ratings, setRatings] = useState<number[]>([]);

    useEffect(() => {
        Socket.emit('lobby_user_ratings', { lobby_code: game.lobbyCode })
        Socket.on('lobby_user_ratings', (data) => {
            console.log('User ratings:', data);
            setUsers(data.users);
            setRatings(data.ratings);
        })

        return () => {
            Socket.off('lobby_canvas_data');
        }
    }, [])


    return (
        <>
            <div className="flex items-center justify-center min-h-screen shadow-2xl">
                <div className="bg-amber-900 p-5 m-5 rounded-md">
                    <h1 className="text-5xl text-white font-western">Ratings:</h1>
                    <div className="flex flex-col">
                        {users && users.map((user, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <h1 className="text-3xl text-white font-western">{user}:</h1>
                                <h1 className="text-3xl text-white font-western">{ratings[index]}:</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}