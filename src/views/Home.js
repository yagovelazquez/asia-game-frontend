import React, { useCallback, useState } from 'react';
import {
  Box,
  Flex,
  Image,
} from '@chakra-ui/react';
import TypeAnimation from '../shared/TypeAnimation';
import angelBg from '../assets/angelBg.png';
import stitchSlap from '../assets/stitchSlap.gif';
import gdanskStitch from '../assets/gdanskStitch.jpg';
import stitchAmusement from '../assets/stitchAmusement.png';
import stitchCroatia from '../assets/stitchCroatia.png';
import stitchIceland from '../assets/stitchIceland.png';
import stitchLeprechaun from '../assets/stitchLeprechaun.png';
import stitchPinapple from '../assets/stitchPinapple.jpg';
import stitchRome from '../assets/stitchRome.png';
import stitchGreece from '../assets/stitchGreece.jpg';
import stitchScotland from '../assets/stitchScotland.jpg';
import stitchDancing from '../assets/stitchDancing.gif';

import CheckPrizesWin from '../stitchGifts/CheckPrizesWin';
import Prize from '../stitchGifts/Prize';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';

const textPropsSecondText = { fontSize: 'lg' };
const containerPropsSecondText = { maxWidth: '500px', mt: 8 };
const containerPropsTercText = { maxWidth: '500px', my: 1 };
const containerPropsQuartText = { maxWidth: '500px' };

const typeTextsAnimation = Object.freeze({
  firstTypeText: 'firstTypeText',
  secondTypeText: 'secondTypeText',
  tercerTypeText: 'tercerTypeText',
  quartTypeText: 'quartTypeText',
  fiveTypeText: 'fiveTypeText',
  sixTypeText: 'sixTypeText',
  seventhTypeText: 'seventhTypeText',
  eighthTypeText: 'eighthTypeText',
  ninthTypeText: 'ninthTypeText',
  tenthTypeText: 'tenthTypeText',
  eleventhTypeText: 'eleventhTypeText',
  twelfthTypeText: 'twelfthTypeText',
  thirteenthTypeText: 'thirteenthTypeText',
  fourteenthTypeText: 'fourteenthTypeText',
  fifteenthTypeText: 'fifteenthTypeText',
  sixteenthTypeText: 'sixteenthTypeText',
  seventeenthTypeText: 'seventeenthTypeText',
  eighteenthTypeText: 'eighteenthTypeText',
  nineteenthTypeText: 'nineteenthTypeText',
  twentiethTypeText: 'twentiethTypeText',
  twentyFirstTypeText: 'twentyFirstTypeText',
  twentySecondTypeText: 'twentySecondTypeText',
  twentyThirdTypeText: 'twentyThirdTypeText',
  twentyFourthTypeText: 'twentyFourthTypeText',
  twentyFifthTypeText: 'twentyFifthTypeText',
  twentySixthTypeText: 'twentySixthTypeText',
  twentySeventhTypeText: 'twentySeventhTypeText',
  twentyEighthTypeText: 'twentyEighthTypeText',
  twentyNinthTypeText: 'twentyNinthTypeText',
  thirtiethTypeText: 'thirtiethTypeText',
  thirtyFirstTypeText: 'thirtyFirstTypeText',
  thirtySecondTypeText: 'thirtySecondTypeText',
  thirtyThirdTypeText: 'thirtyThirdTypeText',
  thirtyFourthTypeText: 'thirtyFourthTypeText',
  thirtyFifthTypeText: 'thirtyFifthTypeText',
  thirtySixthTypeText: 'thirtySixthTypeText',
  thirtySeventhTypeText: 'thirtySeventhTypeText',
  thirtyEighthTypeText: 'thirtyEighthTypeText',
  thirtyNinthTypeText: 'thirtyNinthTypeText',
  fortiethTypeText: 'fortiethTypeText',
});

function Home() {
  const [typeTextAnimationFinished, setTypeTextAnimationFinished] =
    useState(false);

  const handleFirstAnimationComplete = useCallback(
    typeAnimation => {
      if (!typeTextAnimationFinished.hasOwnProperty(typeAnimation)) {
        setTypeTextAnimationFinished({
          ...typeTextAnimationFinished,
          [typeAnimation]: true,
        });
      }
    },
    [typeTextAnimationFinished]
  );

  const navigate = useNavigate();

  const playTheGameHandler = useCallback(() => {
    navigate('/spin-wheel-game');
  }, [navigate]);

  return (
    <>
      <Flex flexDir={'column'} minHeight={'100vh'}>
        <Box
          padding={20} // You can adjust the padding as needed
          bgPosition={'center'}
          bgSize="cover"
          height={'500px'}
          width={'100%'}
          bgRepeat="no-repeat"
          bgImage={`url(${angelBg})`}
        >
          <TypeAnimation
            typeTextAnimationFinished={typeTextAnimationFinished}
            onAnimationComplete={handleFirstAnimationComplete.bind(
              null,
              typeTextsAnimation.firstTypeText
            )}
            text="Welcome to Angel's special gift game!"
          />
          {typeTextAnimationFinished[typeTextsAnimation.firstTypeText] && (
            <TypeAnimation
              typeTextAnimationFinished={typeTextAnimationFinished}
              onAnimationComplete={handleFirstAnimationComplete.bind(
                null,
                typeTextsAnimation.secondTypeText
              )}
              containerProps={containerPropsSecondText}
              textProps={textPropsSecondText}
              text="The game is very simple, you will go to the next page and there is a wheel of prizes, you will spin the wheel and you can choose to claim the prize or spin again. "
            />
          )}
          {typeTextAnimationFinished[typeTextsAnimation.secondTypeText] && (
            <TypeAnimation
              typeTextAnimationFinished={typeTextAnimationFinished}
              onAnimationComplete={handleFirstAnimationComplete.bind(
                null,
                typeTextsAnimation.tercerTypeText
              )}
              containerProps={containerPropsSecondText}
              textProps={textPropsSecondText}
              text={`Rules: `}
            />
          )}
          {typeTextAnimationFinished[typeTextsAnimation.tercerTypeText] && (
            <TypeAnimation
              typeTextAnimationFinished={typeTextAnimationFinished}
              onAnimationComplete={handleFirstAnimationComplete.bind(
                null,
                typeTextsAnimation.quartTypeText
              )}
              containerProps={containerPropsTercText}
              textProps={textPropsSecondText}
              text={` • You can try 2 times before choosing your gift. `}
            />
          )}
          {typeTextAnimationFinished[typeTextsAnimation.quartTypeText] && (
            <TypeAnimation
              typeTextAnimationFinished={typeTextAnimationFinished}
              onAnimationComplete={handleFirstAnimationComplete.bind(
                null,
                typeTextsAnimation.fiveTypeText
              )}
              containerProps={containerPropsQuartText}
              textProps={textPropsSecondText}
              text={` • Every spin takes 6h to reveal which prize you won! `}
            />
          )}
        </Box>
        <CheckPrizesWin
          typeTextsAnimation={typeTextsAnimation}
          typeTextAnimationFinished={typeTextAnimationFinished}
          onAnimationComplete={handleFirstAnimationComplete}
        />
        <Prize
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={stitchSlap}
          titleText={'Slap on Your Face '}
          descriptionText={`A slap on the face is a brief but sharp physical gesture where an open hand strikes someone's cheek or jaw, typically causing a stinging sensation. It is often used to express disapproval, annoyance, or as a form of playful jest. While it is generally light-hearted and not intended to cause harm, it can serve as a way to convey a point or provide a moment of comic relief in certain situations. However, it is essential to ensure that any physical contact is consensual, respectful, and appropriate in the given context, to maintain a sense of mutual respect and understanding between individuals. `}
          componentTypeAnimation={typeTextsAnimation.seventhTypeText}
          titletypeTextAnimation={typeTextsAnimation.eighthTypeText}
          descriptionTypeTextAnimation={typeTextsAnimation.ninthTypeText}
          imageTypeTextAnimation={typeTextsAnimation.tenthTypeText}
        />
        <Prize
          variant="pair"
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={stitchAmusement}
          imgWidth={400}
          titleText={'Trip to Energylandia '}
          descriptionText={`A trip to Energylandia in Zator, Poland, guarantees an exciting adventure. With over 70 rides, including thrilling roller coasters like Hyperion and Zadra, the park offers excitement for all ages. The vibrant atmosphere, live entertainment, and themed zones create a magical experience.
          Visitors can enjoy the refreshing Water Park Jungle and explore the prehistoric Dinolandia area. Delicious food options and souvenir shops add to the overall experience. Energylandia is a must-visit destination for those seeking unforgettable thrills and family fun in the heart of Europe. `}
          componentTypeAnimation={typeTextsAnimation.tenthTypeText}
          titletypeTextAnimation={typeTextsAnimation.eleventhTypeText}
          descriptionTypeTextAnimation={typeTextsAnimation.twelfthTypeText}
          imageTypeTextAnimation={typeTextsAnimation.thirteenthTypeText}
        />
        <Prize
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={stitchGreece}
          titleText={'Trip to Greece '}
          imgWidth={400}
          descriptionText={`A trip to Greece promises an unforgettable Mediterranean adventure. This European gem boasts a rich history, with iconic ancient sites like the Acropolis and Delphi. Its beautiful islands, including Santorini and Mykonos, offer pristine beaches and crystal-clear waters. Greek cuisine is a delight, featuring fresh seafood, olives, and feta cheese. The warm hospitality of the Greek people adds to the charm of this destination. Whether you're exploring historic ruins, sunbathing on stunning shores, or savoring moussaka in a traditional taverna, Greece's blend of history, natural beauty, and culinary delights ensures an extraordinary journey. `}
          componentTypeAnimation={typeTextsAnimation.thirteenthTypeText}
          titletypeTextAnimation={typeTextsAnimation.fourteenthTypeText}
          descriptionTypeTextAnimation={typeTextsAnimation.fifteenthTypeText}
          imageTypeTextAnimation={typeTextsAnimation.sixteenthTypeText}
        />
        <Prize
          variant="pair"
          componentTypeAnimation={typeTextsAnimation.sixteenthTypeText}
          titletypeTextAnimation={typeTextsAnimation.seventeenthTypeText}
          descriptionTypeTextAnimation={typeTextsAnimation.eighteenthTypeText}
          imageTypeTextAnimation={typeTextsAnimation.nineteenthTypeText}
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={stitchCroatia}
          titleText={'Trip to Croatia '}
          descriptionText={`A trip to Croatia offers a mesmerizing experience. This enchanting European destination boasts a stunning coastline along the Adriatic Sea, historical cities like Dubrovnik and Split, and breathtaking natural wonders. Visitors can explore ancient architecture, crystal-clear waters, and picturesque islands, creating a perfect blend of history and natural beauty. Croatian cuisine is a delight for food lovers, with a Mediterranean influence that includes fresh seafood and local wines. Whether you're wandering through charming old towns, sunbathing on pristine beaches, or hiking in lush national parks, Croatia's diverse landscapes and rich culture ensure an unforgettable journey. `}
        />
        <Prize
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={stitchRome}
          componentTypeAnimation={typeTextsAnimation.nineteenthTypeText}
          titletypeTextAnimation={typeTextsAnimation.twentiethTypeText}
          descriptionTypeTextAnimation={typeTextsAnimation.twentyFirstTypeText}
          imageTypeTextAnimation={typeTextsAnimation.twentySecondTypeText}
          titleText={'Trip to Rome '}
          descriptionText={`A trip to Rome, Italy, is a journey through centuries of history, art, and culture. The Eternal City is a living museum, with iconic landmarks like the Colosseum, Roman Forum, and the Vatican. Roam cobblestone streets to discover charming piazzas, where you can enjoy authentic Italian cuisine and gelato. Rome's Renaissance architecture and Baroque fountains add to its timeless beauty. Immerse yourself in the city's romantic ambiance and appreciate the artistry of masters like Michelangelo and Caravaggio. Whether you're making a wish at the Trevi Fountain or admiring the Pantheon, Rome's allure as the heart of Italy is a truly enchanting experience. `}
        />
        <Prize
          variant="pair"
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={stitchLeprechaun}
          titleText={'Trip to Dublin '}
          descriptionText={`A trip to Dublin, Ireland, introduces you to a city steeped in history and alive with modern charm. Explore the rich cultural heritage of this vibrant capital, from historic landmarks like Trinity College and Dublin Castle to the lively atmosphere of Temple Bar. Savor the flavors of Irish cuisine in cozy pubs, and immerse yourself in traditional music and dance. Dublin's warmth and friendliness make it an inviting destination for travelers, and its proximity to the stunning Irish countryside offers a unique blend of urban and natural beauty. Whether you're sipping a pint of Guinness or strolling along the River Liffey, Dublin's unique character makes for an enriching experience. `}
          componentTypeAnimation={typeTextsAnimation.twentySecondTypeText}
          titletypeTextAnimation={typeTextsAnimation.twentyThirdTypeText}
          descriptionTypeTextAnimation={typeTextsAnimation.twentyFourthTypeText}
          imageTypeTextAnimation={typeTextsAnimation.twentyFifthTypeText}
        />
        <Prize
          imgWidth={400}
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={stitchScotland}
          titleText={'Trip to Scotland '}
          descriptionText={`A trip to Scotland invites you to explore a land of breathtaking landscapes, rich history, and warm hospitality. From the rugged Highlands to the historic streets of Edinburgh, Scotland offers a diverse range of experiences. Discover ancient castles like Edinburgh Castle, sample the finest Scotch whisky, and immerse yourself in traditional Scottish culture, including the sound of bagpipes and Highland games. The dramatic scenery, including Loch Ness and the Isle of Skye, showcases the country's natural beauty. Whether you're hiking in the wilderness or enjoying a cozy pub evening, Scotland's unique charm and landscapes make it a captivating destination. `}
          componentTypeAnimation={typeTextsAnimation.twentyFifthTypeText}
          titletypeTextAnimation={typeTextsAnimation.twentySixthTypeText}
          descriptionTypeTextAnimation={
            typeTextsAnimation.twentySeventhTypeText
          }
          imageTypeTextAnimation={typeTextsAnimation.twentyEighthTypeText}
        />
        <Prize
          variant="pair"
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={stitchPinapple}
          titleText={'Pineapple '}
          descriptionText={`Pineapple is a tropical fruit known for its sweet and tangy flavor. With its distinctive spiky skin and juicy, yellow flesh, it's a popular addition to various dishes and beverages. Pineapples are rich in vitamin C, and they offer a range of health benefits. Whether enjoyed fresh, as a juice, or as a topping on pizza, this versatile fruit adds a delightful tropical twist to culinary creations. Pineapples are also a symbol of hospitality and are often associated with warm, welcoming gestures. `}
          componentTypeAnimation={typeTextsAnimation.twentyEighthTypeText}
          titletypeTextAnimation={typeTextsAnimation.twentyNinthTypeText}
          descriptionTypeTextAnimation={typeTextsAnimation.thirtiethTypeText}
          imageTypeTextAnimation={typeTextsAnimation.thirtyFirstTypeText}
        />{' '}
        <Prize
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={stitchIceland}
          titleText={'Trip to Iceland '}
          descriptionText={`A trip to Iceland is an expedition into a world of natural wonders. This Nordic island nation is renowned for its dramatic landscapes, including volcanoes, geysers, and glaciers. The Blue Lagoon offers a geothermal spa experience like no other, while the Northern Lights illuminate the night sky in winter. Iceland is a paradise for outdoor enthusiasts, with opportunities for hiking, horseback riding, and whale watching. Its vibrant capital, Reykjavik, is a hub of culture and cuisine, and the iconic Golden Circle route leads to iconic sites like the Geysir geothermal area and Gullfoss waterfall. Exploring Iceland is an adventure through a land of fire and ice, offering a unique and unforgettable journey. `}
          componentTypeAnimation={typeTextsAnimation.thirtyFirstTypeText}
          titletypeTextAnimation={typeTextsAnimation.thirtySecondTypeText}
          descriptionTypeTextAnimation={typeTextsAnimation.thirtyThirdTypeText}
          imageTypeTextAnimation={typeTextsAnimation.thirtyFourthTypeText}
        />
        <Prize
          variant="pair"
          imgWidth={400}
          onAnimationComplete={handleFirstAnimationComplete}
          typeTextAnimationFinished={typeTextAnimationFinished}
          imgSrc={gdanskStitch}
          titleText={'Trip to Gdansk '}
          descriptionText={`
          A trip to Gdańsk, Poland, is like stepping into a fairy tale. This charming coastal city on the Baltic Sea is a treasure trove of history and maritime adventure. Stroll along the colorful streets of the Old Town, where you'll encounter medieval architecture and delightful amber shops. Gdańsk's shipyard history adds a touch of maritime magic, and the waterfront promenade offers sea views and lively bars. `}
          componentTypeAnimation={typeTextsAnimation.thirtyFourthTypeText}
          titletypeTextAnimation={typeTextsAnimation.thirtyFifthTypeText}
          descriptionTypeTextAnimation={typeTextsAnimation.thirtySixthTypeText}
          imageTypeTextAnimation={typeTextsAnimation.thirtySeventhTypeText}
        />
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
            isDisabled={!typeTextAnimationFinished[typeTextsAnimation.thirtySeventhTypeText]}
            mr={4}
            alignSelf="flex-end"
            onClick={playTheGameHandler}
          >
            Play the game
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default Home;
