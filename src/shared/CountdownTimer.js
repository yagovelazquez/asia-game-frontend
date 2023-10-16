import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

const calculateTimeLeft = (finishDateTimestamp) => {
    const now = new Date().getTime();
    const timeDifference = finishDateTimestamp - now;
    return {
        days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
    };
};

function CountdownTimer({ finishDateTimestamp }) {


    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(finishDateTimestamp));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(finishDateTimestamp));
        }, 1000);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, [finishDateTimestamp]);

    if (timeLeft.days < 0 || timeLeft.hours < 0 || timeLeft.minutes < 0 || timeLeft.seconds < 0) {
        return null; // Don't show the timer if the finishDate is in the past
    }

    return (
        <Box>
            <Text>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</Text>
        </Box>
    );
}

export default CountdownTimer;
