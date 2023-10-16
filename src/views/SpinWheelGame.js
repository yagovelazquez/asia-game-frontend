import {
  Center,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  Spinner,
  useQuery,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import stitchDancing from '../assets/stitchDancing.gif';
import stitchLove from '../assets/stitchLove.jpg';
import stitchHugging from '../assets/stitchHugging.png';
import stitchHeart from '../assets/stitchHeart.gif';
import SpinWheel from '../shared/SpinWheel';
import { queryKeys } from '../config/config';
import { gameClient } from '../client/speelWheelGameClient';

function SpinWheelGame() {
  const navigate = useNavigate();
  const playTheGameHandler = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const { data, error, isLoading } = useQuery([queryKeys.gameData], () =>
    gameClient.fetchData('data')
  );

  const [fakeIsloading, setIsFakeLoading] = useState(true);

  useEffect(() => {
    let timer;
    if (fakeIsloading) {
      timer = setTimeout(() => {
        setIsFakeLoading(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [fakeIsloading, isLoading]);

  return (
    <>
      <Modal isOpen={isLoading || fakeIsloading} isCentered>
        <ModalOverlay bg="white">
          <Center height="100vh">
            <Spinner size="xl" />
          </Center>
        </ModalOverlay>
      </Modal>
      {!fakeIsloading && (
        <Flex
          minHeight={'100vh'}
          w="100%"
          justifyContent="center"
          alignItems={'center'}
          flexDir="column"
          position="relative"
        >
          <Image
            height={270}
            position="absolute"
            top={'10%'}
            left="0"
            width={300}
            src={stitchLove}
            alt="Prize Image"
          />
          <Image
            height={270}
            position="absolute"
            top={'50%'}
            left="0"
            width={300}
            src={stitchHugging}
            alt="Prize Image"
          />
          <Image
            height={270}
            position="absolute"
            top={'1/2'}
            right="0"
            width={300}
            src={stitchHeart}
            alt="Prize Image"
          />
          <SpinWheel />
          <Flex alignSelf="flex-end">
            <Image
              height={270}
              width={300}
              src={stitchDancing}
              alt="Prize Image"
            />
            <Button
              variant="solid"
              mb={4}
              mr={4}
              alignSelf="flex-end"
              onClick={playTheGameHandler}
            >
              Back to home
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default SpinWheelGame;
