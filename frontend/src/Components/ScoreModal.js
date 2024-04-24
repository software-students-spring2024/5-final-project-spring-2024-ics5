import { Center, VStack, Text, Icon, HStack, Button } from "@chakra-ui/react";
import FadeInUpBox from "./FadeUp";
import CountUp from "react-countup";
import { FiChevronRight, FiMousePointer } from "react-icons/fi";

export default function ScoreModal({
  userGuess,
  gameState,
  progression,
  onClose,
}) {
  const delay = 0.2;

  return (
    <Center>
      <VStack gap={10} pt={20}>
        <FadeInUpBox delay={delay}>
          <VStack>
            <Text color="rgba(255,255,255,0.75)" fontSize={18}>
              You Answered
            </Text>
            <Text fontFamily="monospace" fontSize={36} color="white">
              {userGuess}
            </Text>
          </VStack>
        </FadeInUpBox>
        <FadeInUpBox delay={delay + 0.5}>
          <VStack>
            <Text color="rgba(255,255,255,0.75)" fontSize={18}>
              Correct Answer
            </Text>
            <Text fontFamily="monospace" fontSize={36} color="white">
              {gameState["gameObjects"][progression]["objectEndDate"]}
            </Text>
          </VStack>
        </FadeInUpBox>
        <FadeInUpBox delay={delay + 1}>
          <VStack>
            <Text color="white" fontSize={18}>
              Score
            </Text>
            <Text
              color={
                gameState["roundScores"][progression] == 0
                  ? "red.300"
                  : "green.300"
              }
            >
              <HStack>
                <Text fontSize={24}>+</Text>
                <CountUp
                  end={gameState["roundScores"][progression]}
                  delay={1.2}
                  style={{
                    fontSize: 24,
                    color: "inherit",
                    fontFamily: "monospace",
                    fontWeight: 600,
                  }}
                />
              </HStack>
            </Text>
            <Text color="green.300">
              <CountUp
                end={gameState["score"]}
                delay={1.2}
                style={{
                  fontSize: 48,
                  color: "inherit",
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              />
            </Text>
          </VStack>
        </FadeInUpBox>
        <FadeInUpBox delay={delay + 1.5}>
          <Button
            borderRadius={20}
            colorScheme="brand"
            fontSize={18}
            boxShadow="lg"
            _hover={{
              shadow: "lg",
              transform: "translateY(-5px)",
              transition: "0.2s",
            }}
            fontWeight="400"
            rightIcon={<Icon as={FiChevronRight} />}
            onClick={onClose}
          >
            {progression < 4 && "Continue"}
            {progression == 4 && "See Score"}
          </Button>
        </FadeInUpBox>
      </VStack>
    </Center>
  );
}
