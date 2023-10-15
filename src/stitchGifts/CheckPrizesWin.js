import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import stitchGifts from '../assets/stitchGifts.png';
import { motion } from 'framer-motion';
import TypeAnimation from '../shared/TypeAnimation';

const titleTextOfThePrizes = { fontSize: '3xl', color: '#FFB6C1' };

function CheckPrizesWin({
  onAnimationComplete,
  typeTextAnimationFinished,
  typeTextsAnimation,
}) {
  useEffect(() => {
    let interval;
    if (typeTextAnimationFinished[typeTextsAnimation.sixTypeText]) {
      interval = setInterval(() => {
        onAnimationComplete(typeTextsAnimation.seventhTypeText);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [onAnimationComplete, typeTextAnimationFinished, typeTextsAnimation.seventhTypeText, typeTextsAnimation.sixTypeText]);

  return (
    <Flex paddingY={20} flexDir="column" alignItems="center">
      {typeTextAnimationFinished[typeTextsAnimation.fiveTypeText] && (
        <TypeAnimation
          typeTextAnimationFinished={typeTextAnimationFinished}
          textProps={titleTextOfThePrizes}
          onAnimationComplete={onAnimationComplete.bind(
            null,
            typeTextsAnimation.sixTypeText
          )}
          text="Now lets check which prizes you can win "
        />
      )}
      {typeTextAnimationFinished[typeTextsAnimation.sixTypeText] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box
            bgPosition={'center'}
            bgSize="cover"
            height="500px"
            width={'580px'}
            bgRepeat="no-repeat"
            bgImage={`url(${stitchGifts})`}
          />
        </motion.div>
      )}
    </Flex>
  );
}

export default CheckPrizesWin;
