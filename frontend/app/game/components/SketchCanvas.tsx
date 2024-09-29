import React, { useRef, useState } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasProps, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { SketchPicker } from 'react-color';

export default function SketchCanvas({ setCanvas }: { setCanvas: (canvas: 
    React.ForwardRefExoticComponent<ReactSketchCanvasProps & React.RefAttributes<ReactSketchCanvasRef>>) => void }) {
    const canvasRef = useRef(null);
    const [strokeColor, setStrokeColor] = useState('black');

    const styles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
    };

    const handleClearCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.clearCanvas();
        }
    };

    const handleColorChange = (color) => {
        setStrokeColor(color.hex);
    };

    const exportCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.exportImage("png")
                .then(data => {
                    setCanvas(data);
                    console.log(data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="flex-initial bg-black">
                <ReactSketchCanvas
                    ref={canvasRef}
                    style={styles}
                    width="500"
                    height="500"
                    strokeWidth={4}
                    strokeColor={strokeColor}
                    className="m-1 w-50 h-[360px]"
                />
            </div>
            <div className="flex-auto mx-3 rounded-md">
                <SketchPicker
                    color={strokeColor}
                    onChangeComplete={handleColorChange}
                    className="mt-4"
                />
                <div className="flex">
                    <button
                        className="py-2 px-4 my-2 bg-blue-600 text-white 
                        rounded-md shadow-md hover:shadow-lg w-1/2 mr-2"
                        onClick={handleClearCanvas}
                    >
                        Clear
                    </button>
                    <button
                        className="py-2 px-4 my-2 bg-blue-600 text-white 
                        rounded-md shadow-md hover:shadow-lg w-1/2"
                        onClick={exportCanvas}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}