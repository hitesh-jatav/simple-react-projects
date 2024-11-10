import React, { useState } from 'react';

const MemoryCard = ({ id, question, image, dontHide = false, shuffled }) => {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        if (dontHide) return;
        shuffled(id)
        setFlipped(true);

        setTimeout(() => {
            setFlipped(false);
        }, 1000);
    };

    return (
        <div className="card-container" onClick={handleClick}>
            <div className={`card ${(flipped || dontHide) ? 'flipped' : ''}`}>
                <div className="card-face front">
                    <div className="image-container" style={{ backgroundImage: `url(${question})` }}></div>
                </div>

                <div className="card-face back">
                    <div className="image-container" style={{ backgroundImage: `url(${image})` }}></div>
                </div>
            </div>
        </div>
    );
};

export default MemoryCard;
