
import { useState, useEffect } from 'react';

export const useCountdown = (expiryTime) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(expiryTime) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                total: difference,
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { total: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryTime]);

    // Determine urgency level
    const getUrgency = (totalMs) => {
        const hours = totalMs / (1000 * 60 * 60);
        if (totalMs <= 0) return 'expired';
        if (hours <= 6) return 'critical';
        if (hours <= 24) return 'approaching';
        return 'fresh';
    };

    return { ...timeLeft, urgency: getUrgency(timeLeft.total) };
};
