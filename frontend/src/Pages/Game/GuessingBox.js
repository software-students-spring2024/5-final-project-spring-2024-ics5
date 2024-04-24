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
  const [isCE, setIsCE] = useState(true);

  const handleGuess = () => {
    // validate input
    if (guess == "") {
      return;
    }

    var playerGuess = 0;
    if (!isCE) {
      playerGuess = -1 * guess;
      setGuess(-1 * guess);
    } else playerGuess = 1 * guess;

    // get prev game state
    const playerGuessed = structuredClone(gameState["playerGuessed"]);
    playerGuessed[progression] = true; // set current progression to true

    const guessNumbers = structuredClone(gameState["guesses"]);
    guessNumbers[progression] = playerGuess;

    // calculate round score
    var roundScore = 0;
    const difference = Math.abs(
      gameState["gameObjects"][progression]["objectEndDate"] -
        parseInt(playerGuess)
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
            <HStack
              alignItems="center"
              gap={0}
              borderRadius={20}
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "lg",
                transition: "0.2s",
              }}
            >
              <Input
                autoFocus
                borderBottomLeftRadius={20}
                borderTopLeftRadius={20}
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
                variant="unstyled"
                width={150}
                height={50}
                placeholder="0000"
                textAlign="center"
                fontFamily="monospace"
                bg="white"
                fontSize={36}
                type="number"
                value={guess}
                onChange={(e) => {
                  if (e.target.value.toString().charAt(0) == "-") {
                    setIsCE(false);
                    setGuess(e.target.value.substring(1));
                  } else setGuess(e.target.value);
                }}
              />
              <VStack
                bg="white"
                height={50}
                width={100}
                justifyContent="center"
                borderTopRightRadius={20}
                borderBottomRightRadius={20}
                borderLeftWidth={1}
                _hover={{
                  cursor: "pointer",
                  bg: "green.50",
                  transition: "0.2s",
                }}
                onClick={() => {
                  setIsCE(!isCE);
                }}
              >
                <Text
                  fontSize={18}
                  fontFamily="monospace"
                  fontWeight="600"
                  userSelect="none"
                >
                  {isCE ? "C.E." : "B.C.E."}
                </Text>
              </VStack>
            </HStack>
            <Text>Guess the year!</Text>
          </VStack>

          {/* next button */}
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

      <Modal isOpen={isOpen} closeOnOverlayClick={false}>
        <ModalOverlay bg="rgba(0,0,0,0.85)" />
        <ModalContent bg="none" boxShadow="none">
          <ModalBody>
            <ScoreModal
              userGuess={guess}
              gameState={gameState}
              progression={progression}
              onClose={() => {
                onClose(); // close modal
                if (progression < 4) setProgression(progression + 1);
                else setStage("postGame");
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
