import {
  Slider,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GuessingBox({ gameState, setGameState, progression }) {
  const [sliderValue, setSliderValue] = useState(1500);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <VStack position="absolute" bottom={150}>
      <motion.div
        initial={{ opacity: 0, y: 25 }} // start state
        animate={{ opacity: 1, y: 0 }} // end state
        transition={{
          duration: 1.2,
          delay: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <VStack
          bg="rgba(255,255,255,0.75)"
          borderRadius={20}
          p={10}
          px={20}
          w={800}
          gap={5}
          boxShadow="lg"
        >
          <Slider
            defaultValue={1500}
            min={-1500}
            max={2020}
            step={5}
            onChange={(v) => setSliderValue(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderTrack bg="red.100">
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${sliderValue}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </VStack>
      </motion.div>
    </VStack>
  );
}
