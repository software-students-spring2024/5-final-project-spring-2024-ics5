import { Center, VStack, Text, Icon, HStack } from "@chakra-ui/react";
import FadeInUpBox from "./FadeUp";
import CountUp from "react-countup";
import { FiMousePointer } from "react-icons/fi";

export default function ScoreModal({ userGuess, gameState, progression }) {
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
                <Text fontSize={36}>+</Text>
                <CountUp
                  end={gameState["roundScores"][progression]}
                  delay={1.2}
                  style={{
                    fontSize: 36,
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
          <VStack mt={20} gap={5}>
            <Icon as={FiMousePointer} boxSize={10} color="white" />
            <Text color="white" fontSize={18}>
              Click anywhere to continue.
            </Text>
          </VStack>
        </FadeInUpBox>
      </VStack>
    </Center>
  );
}
