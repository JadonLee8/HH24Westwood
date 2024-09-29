import React, { useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { SketchPicker } from 'react-color';

export default function SketchCanvas() {
    const canvasRef = useRef(null);
    const [strokeColor, setStrokeColor] = useState('red');

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
                <button
                    className="py-2 px-4 my-2 bg-blue-600 text-white rounded-md shadow-md hover:shadow-lg"
                    onClick={handleClearCanvas}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}