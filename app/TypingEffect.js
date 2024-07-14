import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, delay = 10 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayText((prevText) => prevText + text.charAt(currentIndex));
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, delay);

        if (currentIndex === text.length) {
            clearTimeout(timeout);
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, delay, text]);

    return <span>{displayText}</span>;
};

export default TypingEffect;