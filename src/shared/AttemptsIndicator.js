import React from 'react';
import { GiArcheryTarget } from 'react-icons/gi';
import { Box, Icon } from '@chakra-ui/react';

function AttemptsIndicator({ remainingAttempts = 0 }) {
  const maxAttempts = 3;
  
  return (
    <Box display="flex" gap={2}>
      {[...Array(maxAttempts)].map((_, index) => (
        <Icon 
          as={GiArcheryTarget} 
          color={index < remainingAttempts ? 'currentColor' : 'gray.300'}
          w={"56px"} 
          h={"56px"} 
          key={index}
        />
      ))}
    </Box>
  );
}

export default AttemptsIndicator;
