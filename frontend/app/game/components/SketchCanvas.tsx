'use client'
import { ReactSketchCanvas } from "react-sketch-canvas";

export default function SketchCanvas() {
    const styles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
      };
      
    return (
        <div className="flex items-center justify-center">
            <div className="flex-initial bg-black">
                <ReactSketchCanvas
                style={styles}
                width="100"
                height="100"
                strokeWidth={4}
                strokeColor="red"
                className="h-1/2 w-1/2"
                />
            </div>
            <div className="flex-auto mx-3">
                
            </div>
        </div>
    );
}