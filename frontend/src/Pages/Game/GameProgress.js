import { Box, HStack, VStack, Icon, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiCircle,
} from "react-icons/fi";

export default function GameProgress({
  gameState,
  setGameState,
  progression,
  setProgression,
}) {
  return (
    <HStack gap={10} position="absolute" top={10}>
      <motion.div
        initial={{ opacity: 0, x: 15 }} // start state
        animate={{ opacity: 1, x: 0 }} // end state
        transition={{
          duration: 1.2,
          delay: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <IconButton
          colorScheme="brand"
          boxShadow="md"
          borderRadius={25}
          onClick={() => {
            if (progression != 0) setProgression(progression - 1);
          }}
          icon={<Icon as={FiChevronLeft} />}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -25 }} // start state
        animate={{ opacity: 1, y: 0 }} // end state
        transition={{
          duration: 1.2,
          delay: 0.4,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <VStack bg="white" p={5} borderRadius={20} boxShadow="lg" width={300}>
          <HStack>
            {gameState["playerGuessed"].map((guessed, index) => {
              return (
                <VStack w={8} key={index}>
                  {guessed ? (
                    <Icon
                      as={FiCheckCircle}
                      boxSize={7}
                      color={index == progression ? "yellow.500" : "brand.500"}
                      onClick={() => {
                        setProgression(index);
                      }}
                      _hover={{ cursor: "pointer" }}
                    />
                  ) : (
                    <Icon
                      as={FiCircle}
                      boxSize={7}
                      color={index == progression ? "yellow.500" : "gray.500"}
                      onClick={() => {
                        setProgression(index);
                      }}
                      _hover={{ cursor: "pointer" }}
                    />
                  )}
                </VStack>
              );
            })}
          </HStack>
        </VStack>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -15 }} // start state
        animate={{ opacity: 1, x: 0 }} // end state
        transition={{
          duration: 1.2,
          delay: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <IconButton
          colorScheme="brand"
          boxShadow="md"
          borderRadius={25}
          onClick={() => {
            if (progression != 4) setProgression(progression + 1);
          }}
          icon={<Icon as={FiChevronRight} />}
        />
      </motion.div>
    </HStack>
  );
}
