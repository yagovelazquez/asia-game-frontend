import React, { useEffect } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import TypeAnimation from '../shared/TypeAnimation';

const descriptionOfPrizesText = { fontSize: 'lg', color: 'white' };
const containerPropsQuartText = { maxWidth: '500px' };
const titleTextOfThePrizes = { fontSize: '3xl', color: 'white' };
const titleTextOfThePrizesPair = { fontSize: '3xl', color: '#FFB6C1' };
const descriptionOfPrizesTextPair = { fontSize: 'lg', color: '#FFB6C1' };

function Prize({
  variant,
  onAnimationComplete,
  typeTextAnimationFinished,
  imgSrc,
  titleText,
  imgHeight = 270,
  imgWidth = 300,
  componentTypeAnimation,
  titletypeTextAnimation,
  imageTypeTextAnimation,
  descriptionTypeTextAnimation,
  descriptionText,
}) {
  useEffect(() => {
    let interval;
    if (typeTextAnimationFinished[descriptionTypeTextAnimation]) {
      interval = setInterval(() => {
        onAnimationComplete(imageTypeTextAnimation);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [
    descriptionTypeTextAnimation,
    imageTypeTextAnimation,
    onAnimationComplete,
    typeTextAnimationFinished,
  ]);

 
  if (!typeTextAnimationFinished[componentTypeAnimation]) return null;

  return (
    <Flex flexDir="column" bg={variant === 'pair' ? "white" : "#FFB6C1"} padding={20} alignItems="center">
      <TypeAnimation
        typeTextAnimationFinished={typeTextAnimationFinished}
        onAnimationComplete={onAnimationComplete.bind(
          null,
          titletypeTextAnimation
        )}
        containerProps={containerPropsQuartText}
        textProps={variant === 'pair' ? titleTextOfThePrizesPair : titleTextOfThePrizes}
        text={titleText}
      />

      <Flex justifyContent={variant === 'pair' ? "flex-start" : "flex-end"} mt={8} width="100%">
        {variant === 'pair'
          ? (typeTextAnimationFinished[titletypeTextAnimation] )&& (
              <>
                <Box height={imgHeight} mr={4} width={imgWidth}>
                  {typeTextAnimationFinished[descriptionTypeTextAnimation] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <Image
                        height={imgHeight}
                        width={imgWidth}
                        src={imgSrc}
                        alt="Prize Image"
                      />
                    </motion.div>
                  )}
                </Box>
                <TypeAnimation
                  typeTextAnimationFinished={typeTextAnimationFinished}
                  onAnimationComplete={onAnimationComplete.bind(
                    null,
                    descriptionTypeTextAnimation
                  )}
                  speed={10}
                  containerProps={containerPropsQuartText}
                  textProps={descriptionOfPrizesTextPair}
                  text={descriptionText}
                />
              </>
            )
          : (typeTextAnimationFinished[titletypeTextAnimation] )&& (
              <>
                <TypeAnimation
                  typeTextAnimationFinished={typeTextAnimationFinished}
                  onAnimationComplete={onAnimationComplete.bind(
                    null,
                    descriptionTypeTextAnimation
                  )}
                  speed={10}
                  containerProps={containerPropsQuartText}
                  textProps={descriptionOfPrizesText}
                  text={descriptionText}
                />
                <Box ml={4} height={imgHeight} width={imgWidth}>
                  {typeTextAnimationFinished[descriptionTypeTextAnimation] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <Image
                        height={270}
                        width={300}
                        src={imgSrc}
                        alt="Prize Image"
                      />
                    </motion.div>
                  )}
                </Box>
              </>
            )}
      </Flex>
    </Flex>
  );
}

export default Prize;
