import { Text, VStack, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GuessingBox({ gameState, setGameState, progression }) {
  const [sliderValue, setSliderValue] = useState(1500);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <VStack position="absolute" bottom={40}>
      <motion.div
        initial={{ opacity: 0, y: 25 }} // start state
        animate={{ opacity: 1, y: 0 }} // end state
        transition={{
          duration: 1.2,
          delay: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <VStack gap={5}>
          <Input
            width={200}
            height={75}
            placeholder="0000"
            textAlign="center"
            fontFamily="monospace"
            borderRadius={25}
            bg="white"
            variant="outlined"
            fontSize={36}
            _hover={{
              shadow: "lg",
              transform: "translateY(-5px)",
              transition: "0.2s",
            }}
          />
          <Text>Guess the year!</Text>
        </VStack>
      </motion.div>
    </VStack>
  );
}
