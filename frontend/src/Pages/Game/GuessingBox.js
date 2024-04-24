import {
  Text,
  VStack,
  Input,
  Button,
  HStack,
  Icon,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import ScoreModal from "../../Components/ScoreModal";

export default function GuessingBox({
  gameState,
  setGameState,
  progression,
  setProgression,
  setStage,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGuess = () => {
    // validate input
    if (guess == "") {
      return;
    }

    // get prev game state
    const playerGuessed = structuredClone(gameState["playerGuessed"]);
    playerGuessed[progression] = true; // set current progression to true

    const guessNumbers = structuredClone(gameState["guesses"]);
    guessNumbers[progression] = guess;

    // calculate round score
    var roundScore = 0;
    const difference = Math.abs(
      gameState["gameObjects"][progression]["objectEndDate"] - parseInt(guess)
    );
    if (difference <= 1000) {
      roundScore = 1000 - difference;
    }
    const roundScoreArr = structuredClone(gameState["roundScores"]);
    roundScoreArr[progression] = roundScore;

    // update total score
    const totalScore = gameState["score"] + roundScore;

    // update game state with updated arrays
    setGameState((prevState) => ({
      ...prevState,
      playerGuessed: playerGuessed,
      guesses: guessNumbers,
      roundScores: roundScoreArr,
      score: totalScore,
    }));

    // open scoring modal
    onOpen();
  };

  const [guess, setGuess] = useState(0);

  useEffect(() => {
    setGuess(gameState["guesses"][progression]);
  }, [progression]);

  return (
    <VStack position="absolute" bottom={20}>
      <motion.div
        initial={{ opacity: 0, y: 25 }} // start state
        animate={{ opacity: 1, y: 0 }} // end state
        transition={{
          duration: 1.2,
          delay: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <HStack gap={10}>
          <Box width={100}></Box>
          <VStack gap={5}>
            <Input
              width={175}
              height={50}
              placeholder="0000"
              textAlign="center"
              fontFamily="monospace"
              borderRadius={20}
              bg="white"
              variant="outlined"
              fontSize={36}
              _hover={{
                shadow: "lg",
                transform: "translateY(-5px)",
                transition: "0.2s",
              }}
              type="number"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
              }}
            ></Input>
            <Text>Guess the year!</Text>
          </VStack>
          <AnimatePresence>
            {guess != "" ? (
              <motion.div
                initial={{ opacity: 0, y: 25 }} // start state
                animate={{ opacity: 1, y: 0 }} // end state
                transition={{
                  duration: 0.6,
                  delay: 0,
                  ease: [0.6, -0.05, 0.01, 0.99],
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
                }}
              >
                <Button
                  rightIcon={<Icon as={FiChevronRight} />}
                  colorScheme="brand"
                  width={100}
                  onClick={handleGuess}
                  borderRadius={20}
                  _hover={{
                    shadow: "lg",
                    transform: "translateY(-5px)",
                    transition: "0.2s",
                  }}
                >
                  Next
                </Button>
              </motion.div>
            ) : (
              <Box width={100} />
            )}
          </AnimatePresence>
        </HStack>
      </motion.div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose(); // close modal
          if (progression < 4) setProgression(progression + 1);
          else setStage("postGame");
        }}
      >
        <ModalOverlay bg="rgba(0,0,0,0.85)" />
        <ModalContent bg="none" boxShadow="none">
          <ModalBody>
            <ScoreModal
              userGuess={guess}
              gameState={gameState}
              progression={progression}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
