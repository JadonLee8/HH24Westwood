export default function GameBackground() {
    return (
        <div
            style={{
                backgroundImage: 'url(saloon.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                position: 'fixed', // Ensure the background stays fixed
                top: 0,
                left: 0,
                zIndex: -1, // Send the background to the back
            }}
        ></div>
    );
}