'use client'
import SketchCanvas from "../SketchCanvas";
import Socket from "@/components/network/Socket";
import { useState, useEffect } from "react";
import { useGameContext } from "@/components/context/GameContext";
// Everyone draws pictures
export default function FifthFrame() {
    const game = useGameContext();
    const [sent, setSent] = useState(false);

    const setCanvas = (canvasData) => {
        Socket.emit('canvas_data', { canvas_data: canvasData, lobby_code: game.lobbyCode });
        setSent(true);
    }

    return (
        <div className="flex items-center justify-center min-h-screen shadow-2xl">
            <div className="bg-amber-800 p-5 m-5 rounded-md">
                <div>
                    {sent || game.role !== "citizen"? (
                        <h1 className="text-3xl text-white font-western1">{game.role !== "citizen" ? "Waiting for citizens to draw..." : "Drawing Sent!"}</h1>
                    ) : (
                        <>
                            <h1 className="text-5xl text-white font-western1">Draw a picture of the scene</h1>
                            <SketchCanvas setCanvas={setCanvas} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}