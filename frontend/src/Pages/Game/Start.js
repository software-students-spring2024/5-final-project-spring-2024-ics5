import { useState } from "react";
import { VStack, Center, Text, Button } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

// import components
import FadeInUpBox from "../../Components/FadeUp";
import Game from "./Game";

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
    guesses: [0, 0, 0, 0, 0],
    playerGuessed: [false, false, false, false, false],
    roundScores: [0, 0, 0, 0, 0],
    score: 0,
  });

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
          {stage == "postGame" && <Text fontSize={12}>post game</Text>}
        </AnimatePresence>
      </Center>
    </VStack>
  );
}

const Menu = ({ setStage }) => {
  return (
    <VStack>
      <FadeInUpBox delay={0.25}>
        <Text>Start</Text>
        <Button
          onClick={() => {
            setStage("game");
          }}
        >
          Fetch
        </Button>
      </FadeInUpBox>
    </VStack>
  );
};
