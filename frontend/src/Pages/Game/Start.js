import { useEffect, useState } from "react";
import {
  VStack,
  Center,
  Text,
  Button,
  HStack,
  Icon,
  Image,
  Heading,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

// import components
import FadeInUpBox from "../../Components/FadeUp";
import Game from "./Game";
import Results from "../PostGame/Results";
import { FiChevronRight } from "react-icons/fi";

export default function Start() {
  /**
   * stages:
   * "start" - beginning screen with options
   * "game" - game screen
   */
  const [stage, setStage] = useState("");

  // game state to be shared by all game pages
  const [gameState, setGameState] = useState({
    gameObjects: [],
    guesses: ["", "", "", "", ""],
    playerGuessed: [false, false, false, false, false],
    roundScores: [0, 0, 0, 0, 0],
    score: 0,
  });

  useEffect(() => {
    if (stage == "playAgain") {
      // reset game state
      setGameState({
        gameObjects: [],
        guesses: ["", "", "", "", ""],
        playerGuessed: [false, false, false, false, false],
        roundScores: [0, 0, 0, 0, 0],
        score: 0,
      });
      setStage("");
    }
  }, [stage]);

  return (
    <VStack bgGradient="linear(to-r, #F5F5DC, #D8CAB8)" height="100vh" p={50}>
      <Center height="100%">
        <AnimatePresence>
          {stage == "" && <Menu setStage={setStage} />}
          {stage == "game" && (
            <Game
              setStage={setStage}
              gameState={gameState}
              setGameState={setGameState}
            />
          )}
          {stage == "postGame" && (
            <Results gameState={gameState} setStage={setStage} />
          )}
        </AnimatePresence>
      </Center>
    </VStack>
  );
}

const Menu = ({ setStage }) => {
  return (
    <VStack gap={3}>
      <FadeInUpBox delay={0}>
        <Heading fontSize={64} color="brand.700" fontWeight="900" mb={10}>
          gamemode
        </Heading>
      </FadeInUpBox>

      <FadeInUpBox delay={0.2}>
        <HStack
          p={5}
          gap={5}
          width={540}
          borderRadius={20}
          bg="rgba(255,255,255,0.75)"
          _hover={{
            cursor: "pointer",
            bg: "white",
            transition: "0.2s",
            shadow: "lg",
            transform: "translateY(-5px)",
          }}
          onClick={() => {
            setStage("game");
          }}
        >
          <Image src="/icons/temple.png" boxSize={20} />
          <VStack alignItems="left">
            <Text fontSize={20} fontWeight="600">
              Classic
            </Text>
            <Text fontSize={16} fontWeight="400">
              Play the regular mode with all artifacts from the MET included.
            </Text>
          </VStack>
          <Icon as={FiChevronRight} fontSize={24} />
        </HStack>
      </FadeInUpBox>

      <FadeInUpBox delay={0.4}>
        <HStack
          p={5}
          gap={5}
          width={540}
          borderRadius={20}
          bg="rgba(255,255,255,0.75)"
          _hover={{
            cursor: "pointer",
            bg: "white",
            transition: "0.2s",
            shadow: "lg",
            transform: "translateY(-5px)",
          }}
          onClick={() => {
            setStage("game");
          }}
        >
          <Image src="/icons/bamboo.png" boxSize={20} />
          <VStack alignItems="left">
            <Text fontSize={20} fontWeight="600">
              Asian
            </Text>
            <Text fontSize={16} fontWeight="400">
              Play the game but with artifacts from the Asian Art Wing only.
            </Text>
          </VStack>
          <Icon as={FiChevronRight} fontSize={24} />
        </HStack>
      </FadeInUpBox>

      <FadeInUpBox delay={0.6}>
        <HStack
          p={5}
          gap={5}
          width={540}
          borderRadius={20}
          bg="rgba(255,255,255,0.75)"
          _hover={{
            cursor: "pointer",
            bg: "white",
            transition: "0.2s",
            shadow: "lg",
            transform: "translateY(-5px)",
          }}
          onClick={() => {
            setStage("game");
          }}
        >
          <Image src="/icons/knight-on-horseback.png" boxSize={20} />
          <VStack alignItems="left">
            <Text fontSize={20} fontWeight="600">
              Medieval
            </Text>
            <Text fontSize={16} fontWeight="400">
              Play the game but with artifacts from the Medieval Art Department
              only.
            </Text>
          </VStack>
          <Icon as={FiChevronRight} fontSize={24} />
        </HStack>
      </FadeInUpBox>

      <FadeInUpBox delay={0.8}>
        <HStack
          p={5}
          gap={5}
          width={540}
          borderRadius={20}
          bg="rgba(255,255,255,0.75)"
          _hover={{
            cursor: "pointer",
            bg: "white",
            transition: "0.2s",
            shadow: "lg",
            transform: "translateY(-5px)",
          }}
          onClick={() => {
            setStage("game");
          }}
        >
          <Image src="/icons/cello.png" boxSize={20} />
          <VStack alignItems="left">
            <Text fontSize={20} fontWeight="600">
              Musical Instruments
            </Text>
            <Text fontSize={16} fontWeight="400">
              Play the game but with artifacts from the Musical Instruments
              Collection only.
            </Text>
          </VStack>
          <Icon as={FiChevronRight} fontSize={24} />
        </HStack>
      </FadeInUpBox>
    </VStack>
  );
};
