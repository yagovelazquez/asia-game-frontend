import React, { useState, useEffect } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
0% {opacity: 0 ;}
50% {opacity: 1 ;}
100% {opacity: 0 ;}
`;


function TypeAnimation({
  text,
  speed = 40,
  containerProps,
  textProps,
  onAnimationComplete
}) {
  const [currentText, setCurrentText] = useState('');
  const [offset, setOffset] = useState(0);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (offset >= text.length) {
        clearInterval(interval);
        setIsAnimationFinished(true);
        onAnimationComplete && onAnimationComplete()
        return;
      }

      const part = text.substr(0, offset);
      setCurrentText(part);
      setOffset(prevOffset => prevOffset + 1);
    }, speed);

    return () => clearInterval(interval);
  }, [offset, onAnimationComplete, speed, text]);

  return (
    <Flex {...containerProps} gap={1} position="relative" alignItems={'bottom'}>
      <Text
        fontSize="3xl"
        _after={
          !isAnimationFinished && {
            position: "absolute",
            marginLeft: '8px',
            background: 'rgb(0, 0, 0, 0.3)',
            color: 'rgb(0, 0, 0, 0)',
            content: "'.'",
            animation: `${pulse} 1s infinite`,
          }
        }
        fontWeight="500"
        color="white"
        {...textProps}
      >
        {currentText}
      </Text>
    </Flex>
  );
}

export default TypeAnimation;
