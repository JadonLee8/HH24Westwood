import Socket from "@/components/network/Socket";
import { useEffect, useState } from "react";
import { useGameContext } from '@/components/context/GameContext';

interface UserRating {
    username: string;
    rating: number; // Assuming rating is a number; adjust if it's a different type
}

interface LobbyUserRatings {
    users: UserRating[];
}

export default function SeventhFrame() {
    const [playerRatings, setPlayerRatings] = useState<Record<string, number>>({}); // Use state to hold player ratings

    useEffect(() => {
        // Add event listeners here
        const handleUserRatings = (data: LobbyUserRatings) => {
            console.log('User ratings:', data);
            const ratings: Record<string, number> = {};
            data.users.forEach(user => {
                ratings[user.username] = user.rating; // Collect ratings
            });
            setPlayerRatings(ratings); // Update state with the new ratings
        };

        Socket.on('lobby_user_ratings', handleUserRatings);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            Socket.off('lobby_user_ratings', handleUserRatings);
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <>
            {Object.keys(playerRatings).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {Object.entries(playerRatings).map(([username, rating]) => (
                        <li key={username}>
                            {username}: {rating}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
