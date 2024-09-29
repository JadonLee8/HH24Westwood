'use client'
import { useState, useEffect } from "react";
import Socket from "@/components/network/Socket";
import { useGameContext } from "@/components/context/GameContext";

export default function SixthFrame() {
    const game = useGameContext();
    const [images, setImages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Socket.emit('lobby_canvas_data', { lobby_code: game.lobbyCode })
        Socket.on('lobby_canvas_data', (data) => {
            console.log(data)
            setImages(data.images)
            setUsers(data.users)
            console.log('Images:', images)
        })
        return () => {
            Socket.off('lobby_canvas_data');
        }
    }, [])

    return (
        <>
            <div className="flex items-center justify-center min-h-screen shadow-2xl">
                <div className="bg-amber-800 p-5 m-5 rounded-md">
                    {users.length > 0 ?
                        (<>
                            <h1 className="text-5xl text-white font-western1">Images from other players:</h1>
                            <div className="flex flex-wrap">
                                {images && images.map((image, index) => {
                                    return (
                                        <div key={index} className="m-2">
                                            <img src={image} alt={`Player ${index + 1} image`} />
                                        </div>
                                    )
                                })}
                            </div>
                        </>)
                        :
                        (<><h1 className="text-5xl text-white font-western1">Waiting for images...</h1></>)
                    }
                </div>
            </div>
        </>
    );
}