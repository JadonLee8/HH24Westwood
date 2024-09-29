'use client'
import { useState, useEffect } from "react";
import Socket from "@/components/network/Socket";
import { useGameContext } from "@/components/context/GameContext";
import { Slider } from "@mui/material";

export default function SixthFrame() {
    const game = useGameContext();
    const [images, setImages] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [ratings, setRatings] = useState<number[]>([]);
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        Socket.emit('lobby_canvas_data', { lobby_code: game.lobbyCode })
        Socket.on('lobby_canvas_data', (data) => {
            console.log(data)
            setImages(data.images)
            setUsers(data.users)
            console.log('Images:', images)
        })
        setRatings([])
        // setImages(["data:image/png;base64,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", "data:image/png;base64,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"])
        // setUsers(["Player 1", "Player 2"])
        return () => {
            Socket.off('lobby_canvas_data');
        }
    }, [])

    const rateImage = (index: number, newRating: number) => {
        Socket.emit('user_ratings', { users: users, lobby_code: game.lobbyCode, rating: newRating, index: index })
        setIndex(index + 1)
        if (index === images.length - 1) {
            Socket.emit('end_round', { lobby_code: game.lobbyCode })
        }
    }

    const handleSliderChange = (event, newValue) => {
        setRating(newValue);
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen shadow-2xl">
                <div className="bg-amber-900 p-5 m-5 rounded-md">
                    {images.length > 0 && ratings.length !== users.length ? (
                        <>
                            <h1 className="text-5xl text-white font-western1">Rate Image {index}</h1>
                            <div className="flex flex-wrap">
                                <div className="m-2">
                                    <img src={images[index]} className="h-max" alt={`Player ${index + 1} image`} />
                                    <Slider
                                        aria-label="Rating"
                                        defaultValue={5}
                                        valueLabelDisplay="auto"
                                        shiftStep={2}
                                        onChange={handleSliderChange}
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                    />
                                    <button className="py-2 px-4 bg-red-600 border-black rounded-md w-1/4 font-western2 shadow-md hover:shadow-lg"
                                        onClick={() => rateImage(index, rating)}>Submit</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h1 className="text-5xl text-white font-western1">Waiting for other players to rate images...</h1>
                    )
                    }
                </div>
            </div>
        </>
    );
}