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
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import FadeInUpBox from "../../Components/FadeUp";
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

    // update total score
    const totalScore = gameState["score"] + roundScore;

    // update game state with updated arrays
    setGameState((prevState) => ({
      ...prevState,
      playerGuessed: playerGuessed,
      guesses: guessNumbers,
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
        </HStack>
      </motion.div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="rgba(0,0,0,0.75)" />
        <ModalContent bg="none" boxShadow="none">
          <ModalHeader color="white">{progression + 1}/5</ModalHeader>
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
