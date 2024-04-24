import { Circle, HStack, VStack, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ProgressBar from "@ramonak/react-progress-bar";

export default function GameProgress({ gameState, progression }) {
  return (
    <HStack gap={10} position="absolute" top={10}>
      <Box width={500} />

      <motion.div
        initial={{ opacity: 0, y: -25 }} // start state
        animate={{ opacity: 1, y: 0 }} // end state
        transition={{
          duration: 1.2,
          delay: 0.4,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <VStack bg="white" p={2} borderRadius={20} boxShadow="lg">
          <ProgressBar
            maxCompleted={5}
            completed={progression + 1}
            width={250}
            height={20}
            bgColor="#276749"
            customLabel={`${progression + 1}/5`}
          />
        </VStack>
      </motion.div>

      <TopMenuBar />
    </HStack>
  );
}

const TopMenuBar = () => {
  return (
    <HStack width={500}>
      <motion.div
        initial={{ opacity: 0, x: -25 }} // start state
        animate={{ opacity: 1, x: 0 }} // end state
        transition={{
          duration: 1.2,
          delay: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <VStack bg="white" p={2} borderRadius={20} boxShadow="lg">
          <Circle />
        </VStack>
      </motion.div>
    </HStack>
  );
};
