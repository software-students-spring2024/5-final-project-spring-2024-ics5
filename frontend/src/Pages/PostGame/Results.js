import {
  Heading,
  VStack,
  Text,
  Button,
  Box,
  HStack,
  Image,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FiCheck, FiX } from "react-icons/fi";
import FadeInUpBox from "../../Components/FadeUp";

export default function Results({ gameState, setStage }) {
  const [congratsText, setCongratsText] = useState("");

  const delay = 0.5;

  useEffect(() => {
    if (gameState["score"] >= 4000) setCongratsText("Fantastic job!");
    else if (gameState["score"] >= 2500) setCongratsText("Good work!");
    else if (gameState["score"] >= 1500) setCongratsText("Not bad...");
    else if (gameState["score"] >= 500) setCongratsText("You can do better!");
    else setCongratsText(":(");
  }, [gameState]);

  return (
    <VStack>
      {/*  congratulatory text */}
      <FadeInUpBox delay={delay}>
        <Heading color="brand.700" fontWeight="900">
          {congratsText}
        </Heading>
      </FadeInUpBox>

      {/* render score */}
      <VStack mt={5}>
        <FadeInUpBox delay={delay + 0.2}>
          <Text
            color="brand.700"
            fontSize={24}
            fontWeight={600}
            fontFamily="monospace"
          >
            <CountUp
              end={gameState["score"]}
              delay={delay + 0.4}
              style={{
                fontSize: 48,
                color: "inherit",
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            />{" "}
            / 5000
          </Text>
        </FadeInUpBox>
      </VStack>

      {/* recap */}
      <FadeInUpBox delay={delay + 0.4}>
        <VStack mt={10} gap={2}>
          {gameState["gameObjects"].map((obj, index) => {
            return (
              <Box
                px={5}
                py={2}
                bg="rgba(255,255,255,0.3)"
                borderRadius={20}
                width={500}
                boxShadow="sm"
              >
                <HStack justifyContent="space-between">
                  {/* artifact image */}
                  <Image
                    src={obj["primaryImage"]}
                    w={150}
                    h={100}
                    objectFit="contain"
                    borderRadius={20}
                  />

                  {/* answers */}
                  <VStack>
                    <HStack opacity={0.5}>
                      {parseInt(obj["objectEndDate"]) ==
                      parseInt(gameState["guesses"][index]) ? (
                        <Icon as={FiCheck} color="brand.700" />
                      ) : (
                        <Icon as={FiX} color="brand.700" />
                      )}
                      <Text
                        color="brand.700"
                        fontSize={20}
                        fontFamily="monospace"
                        fontWeight={400}
                      >
                        {gameState["guesses"][index]}
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={FiCheck} color="brand.700" />
                      <Text
                        color="brand.700"
                        fontSize={20}
                        fontFamily="monospace"
                        fontWeight={600}
                      >
                        {obj["objectEndDate"]}
                      </Text>
                    </HStack>
                  </VStack>

                  {/* pts earned */}
                  <VStack alignItems="flex-end">
                    <Text
                      color="brand.700"
                      fontSize={20}
                      fontFamily="monospace"
                      fontWeight={500}
                    >
                      {gameState["roundScores"][index]} pts
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </FadeInUpBox>

      {/* button menu */}
      <VStack mt={10}>
        <FadeInUpBox delay={delay + 0.6}>
          <Button
            borderRadius={20}
            px={5}
            colorScheme="brand"
            _hover={{
              shadow: "lg",
              transform: "translateY(-5px)",
              transition: "0.2s",
            }}
            onClick={() => {
              setStage("playAgain");
            }}
          >
            Play Again
          </Button>
        </FadeInUpBox>
        <FadeInUpBox delay={delay + 0.7}>
          <Button>Play Again</Button>
        </FadeInUpBox>
        <FadeInUpBox delay={delay + 0.8}>
          <Button>Play Again</Button>
        </FadeInUpBox>
        <FadeInUpBox delay={delay + 0.9}>
          <Button>Play Again</Button>
        </FadeInUpBox>
      </VStack>
    </VStack>
  );
}
