import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Button,
  VStack,
  Text,
  Center,
  UnorderedList,
  ListItem,
  Flex,
} from '@chakra-ui/react';
import { FaRedo } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gameClient } from '../client/speelWheelGameClient';
import { ChakraProvider, Modal, ModalOverlay, Spinner } from '@chakra-ui/react';
import { queryKeys } from '../config/config';
import CountdownTimer from './CountdownTimer';
import AttemptsIndicator from './AttemptsIndicator';

const segments = [
  'Face Slap',
  'Energylandia',
  'Greece',
  'Croatia',
  'Rome',
  'Dublin',
  'Scotland',
  'Pineapple',
  'Iceland',
  'Gdansk',
];

const segmentColors = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'brown',
  'cyan',
  'magenta',
];

const INITIAL_SPEED = 1; // Initial slow speed
const ACCELERATED_SPEED = 10; // Speed when button is clicked

function SpinWheel() {
  const canvasSize = 500;
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery([queryKeys.gameData], () =>
    gameClient.fetchData('data')
  );
  const { mutate: mutateUpdateGameData, isLoading: isLoadingMutateGameData } =
    useMutation(gameClient.updateData, {
      onSuccess: async () => {
        await queryClient.invalidateQueries([queryKeys.gameData]);
      },
    });

  const [currentDegree, setCurrentDegree] = useState(0);
  const [isDecelerating, setIsDecelerating] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [stopTime, setStopTime] = useState(null); 
  console.log(stopTime)

  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const handleSpinClick = useCallback(async () => {
    if (data?.finishData) return;
    console.log(data?.timeRunning, typeof data?.timeRunning)
    setSpeed(ACCELERATED_SPEED);
    const randomStopTime =
      new Date().getTime() + data?.timeRunning + Math.random() * 2000;
    setStopTime(randomStopTime);
    await mutateUpdateGameData({
      path: 'data',
      updateData: {
        attemptTryRemaining:
          data?.attemptTryRemaining <= 0 ? 0 : data?.attemptTryRemaining - 1,
        finishData: randomStopTime,
      },
    });
  }, [
    data?.attemptTryRemaining,
    data?.finishData,
    data?.timeRunning,
    mutateUpdateGameData,
  ]);

  const drawWheel = useCallback(
    degree => {
      if (isLoading) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const centerX = canvasSize / 2;
      const centerY = (canvasSize + 50) / 2; // Previously adjusted to shift the wheel slightly. Adjust the "+ 50" part if needed.

      ctx.clearRect(0, 0, canvasSize, canvasSize + 50);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((degree * Math.PI) / 180 - (18 * Math.PI) / 180);

      segments.forEach((segment, index) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(
          0,
          0,
          canvasSize / 2,
          index * ((2 * Math.PI) / segments.length),
          (index + 1) * ((2 * Math.PI) / segments.length)
        );
        ctx.closePath();
        ctx.fillStyle = segmentColors[index];
        ctx.fill();

        const angle =
          index * ((2 * Math.PI) / segments.length) +
          (2 * Math.PI) / (2 * segments.length); // angle in the middle of the segment
        const distanceFromCenter = canvasSize / 3; // Change this value to move text closer/further from center
        const textX = Math.cos(angle) * distanceFromCenter;
        const textY = Math.sin(angle) * distanceFromCenter;

        ctx.save(); // Save the current state
        ctx.translate(textX, textY);
        ctx.rotate(angle + Math.PI * 2); // To make the text upright
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black'; // Text color
        ctx.font = '25px sans-serif'; // Font size and type
        ctx.fillText(segment, 0, 0); // Draw the text
        ctx.restore(); // Restore the original state
      });

      ctx.restore();
    },
    [isLoading]
  );

  const drawArrow = useCallback(() => {
    if (isLoading) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const center = canvasSize / 2;
    const arrowTipY = 0;
    const arrowHeight = 135; // Previously 90
    const arrowBaseWidth = 60; // Previously 40

    const leftBaseX = -arrowBaseWidth / 2; // Adjusted due to the translation of context
    const rightBaseX = arrowBaseWidth / 2; // Adjusted due to the translation of context

    ctx.save(); // Save the current state
    ctx.translate(center, arrowTipY + arrowHeight / 2); // Translate to the center
    ctx.rotate(Math.PI); // Rotate by 180 degrees

    ctx.beginPath();
    ctx.moveTo(0, arrowTipY); // tip of the triangle
    ctx.lineTo(leftBaseX, arrowTipY + arrowHeight); // left base point
    ctx.lineTo(rightBaseX, arrowTipY + arrowHeight); // right base point
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2; // Shadow slightly below, as arrow is pointing upwards after rotation
    ctx.fill();
    ctx.shadowColor = 'transparent'; // Reset shadow after drawing the arrow

    ctx.restore(); // Restore the original state
  }, [isLoading]);

  useEffect(() => {
    const now = new Date().getTime();
    const removeFinishData = async () => {
      const randomIndex = Math.floor(Math.random() * segments.length);

      const prizesArray = Array.isArray(data?.prizesWon) ? data.prizesWon : [];
      prizesArray.push(segments[randomIndex]);

      await mutateUpdateGameData({
        path: 'data',
        updateData: {
          finishData: null,
          prizesWon: prizesArray,
        },
      });
    };

    if (now > data?.finishData) {
      removeFinishData();
    }
  }, [data?.finishData, data?.prizesWon, mutateUpdateGameData]);

  useEffect(() => {
    const now = new Date().getTime();
    if (speed === INITIAL_SPEED && now < data?.finishData) {
      setSpeed(ACCELERATED_SPEED);
    }
  }, [data?.finishData, speed]);

  useEffect(() => {
    const animate = async () => {
      const now = new Date().getTime();

      if (stopTime && now >= stopTime && !isDecelerating) {
        setIsDecelerating(true);
      }

      if (isDecelerating) {
        setSpeed(prevSpeed => Math.max(prevSpeed - 1, 0));
      }

      const newDegree =
        currentDegree + speed >= 360
          ? 0 + (currentDegree + speed - 360)
          : currentDegree + speed;
      setCurrentDegree(newDegree);

      drawWheel(newDegree);
      drawArrow();

      if (speed <= 0) {
        cancelAnimationFrame(animationRef.current);

        const segmentDegree = 360 / segments.length;
        const winningIndex = Math.floor((newDegree % 360) / segmentDegree);
        const reverseSegments = [...segments].reverse();
        let winningSegment;
        const realWinningIndex = winningIndex + 2;
        if (realWinningIndex >= segments.length) {
          winningSegment = reverseSegments[realWinningIndex - segments.length];
        } else {
          winningSegment = reverseSegments[realWinningIndex];
        }

        const prizesArray = Array.isArray(data?.prizesWon)
          ? data.prizesWon
          : [];
        prizesArray.push(winningSegment);

        if (!isLoadingMutateGameData && data?.finishData) {
          await mutateUpdateGameData({
            path: 'data',
            updateData: {
              prizesWon: prizesArray,
              finishData: null,
            },
          });
        }
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [
    isDecelerating,
    currentDegree,
    drawWheel,
    speed,
    drawArrow,
    stopTime,
    data?.prizesWon,
    mutateUpdateGameData,
    isLoadingMutateGameData,
    data?.finishData,
  ]);

  return (
    <>
      {!isLoading && (
        <VStack spacing={4}>
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize + 50}
            style={{ marginTop: '25px' }}
          />

          <Button
            isDisabled={data?.finishData || !data?.attemptTryRemaining > 0}
            onClick={handleSpinClick}
          >
            Spin
          </Button>

          <Flex gap={20}>
            <Flex
              justifyContent={'center'}
              flexDir="column"
              alignItems={'center'}
            >
              <Text fontSize={25} fontWeight={600}>
                Remaining attempts
              </Text>

              <AttemptsIndicator
                remainingAttempts={data?.attemptTryRemaining}
              />
            </Flex>
            <Flex
              justifyContent={'center'}
              flexDir="column"
              alignItems={'center'}
            >
              <Text fontSize={25} fontWeight={600}>
                Prizes
              </Text>
              {data?.prizesWon && (
                <UnorderedList>
                  {data.prizesWon.map((prize, index) => (
                    <ListItem
                      key={index}
                      opacity={index === data.prizesWon.length - 1 ? 1 : 0.4}
                    >
                      {prize}
                    </ListItem>
                  ))}
                </UnorderedList>
              )}
            </Flex>
            {data?.finishData && (
              <Flex
                justifyContent={'center'}
                flexDir="column"
                alignItems={'center'}
              >
                <Text fontSize={25} fontWeight={600}>
                  Time left:
                </Text>

                <CountdownTimer finishDateTimestamp={data?.finishData} />
              </Flex>
            )}
          </Flex>
        </VStack>
      )}
    </>
  );
}

export default SpinWheel;
