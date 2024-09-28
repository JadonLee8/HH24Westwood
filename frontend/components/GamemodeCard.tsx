import React from 'react';

interface GamemodeCardProps {
    imageSrc: string;
    title: string;
    description: string;
    link: string;
}

const GamemodeCard: React.FC<GamemodeCardProps> = ({ imageSrc, title, description, link }) => {
    return (
        <a className="max-w-sm rounded overflow-hidden shadow-lg" href={link}>
            <img className="w-full rounded-t" src={imageSrc} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{title}</div>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
            </div>
        </a>
    );
};

export default GamemodeCard;