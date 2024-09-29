import SketchCanvas from "../SketchCanvas";
// Everyone draws pictures
export default function FifthFrame() {
    return (
        <>
        <div className="flex items-center justify-center min-h-screen shadow-2xl">
                <div className="bg-amber-900 p-5 m-5 rounded-md">
                    <h1 className="text-3xl text-white font-western1">Canvas</h1>
                    <SketchCanvas/>
                </div>
            </div>
            
        </>
    );
}