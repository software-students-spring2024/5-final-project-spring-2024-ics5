import { Center, VStack, Text, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FadeInUpBox from "./FadeUp";
import CountUp from "react-countup";

export default function ScoreModal({ userGuess, gameState, progression }) {
  const [showContent, setShowContent] = useState(false);
  const delay = 0.2;

  return (
    <Center>
      <VStack gap={10}>
        <FadeInUpBox delay={delay}>
          <VStack>
            <Text color="white" fontSize={18}>
              You answered
            </Text>
            <Text fontFamily="monospace" fontSize={24} color="white">
              {userGuess}
            </Text>
          </VStack>
        </FadeInUpBox>
        <FadeInUpBox delay={delay + 0.5}>
          <VStack>
            <Text color="white" fontSize={18}>
              Correct answer
            </Text>
            <Text fontFamily="monospace" fontSize={24} color="white">
              {gameState["gameObjects"][progression]["objectEndDate"]}
            </Text>
          </VStack>
        </FadeInUpBox>
        <FadeInUpBox delay={delay + 1}>
          <VStack>
            <Text color="white" fontSize={18}>
              Score
            </Text>
            <CountUp
              end={gameState["score"]}
              delay={1.2}
              style={{
                fontSize: 36,
                color: "white",
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            />
          </VStack>
        </FadeInUpBox>
      </VStack>
    </Center>
  );
}
