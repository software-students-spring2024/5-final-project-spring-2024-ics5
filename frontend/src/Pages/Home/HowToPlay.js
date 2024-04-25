import { Button, Icon, VStack, Text, HStack } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import FadeInUpBox from "../../Components/FadeUp";

export default function HowToPlay({ setStage }) {
  return (
    <VStack position="absolute" alignItems="left">
      <FadeInUpBox delay={0}>
        <HStack alignItems="center" gap={5} mt={10}>
          <Text
            fontSize="lg"
            color="brand.600"
            align="center"
            fontWeight="600"
            fontFamily="monospace"
          >
            1.
          </Text>
          <Text
            fontSize="lg"
            color="brand.600"
            width={400}
            align="left"
            fontWeight="500"
          >
            You'll be given a random artifact from the Metropolitan Museum of
            Art.
          </Text>
        </HStack>
      </FadeInUpBox>

      <FadeInUpBox delay={0.1}>
        <HStack alignItems="center" gap={5} mt={5}>
          <Text
            fontSize="lg"
            color="brand.600"
            align="center"
            fontWeight="600"
            fontFamily="monospace"
          >
            2.
          </Text>
          <Text
            fontSize="lg"
            color="brand.600"
            width={400}
            align="left"
            fontWeight="500"
          >
            Guess the year it was from. You'll earn a point for every year
            closer to the actual date.
          </Text>
        </HStack>
      </FadeInUpBox>

      <FadeInUpBox delay={0.2}>
        <HStack alignItems="center" gap={5} mt={5}>
          <Text
            fontSize="lg"
            color="brand.600"
            align="center"
            fontWeight="600"
            fontFamily="monospace"
          >
            3.
          </Text>
          <Text
            fontSize="lg"
            color="brand.600"
            width={400}
            align="left"
            fontWeight="500"
          >
            Play a total of 5 times, and add up the total score!
          </Text>
        </HStack>
      </FadeInUpBox>

      {/* back to landing screen */}
      <FadeInUpBox delay={0.3}>
        <HStack justifyContent="center" gap={5} mt={5}>
          <Button
            mt={5}
            colorScheme="brand"
            borderRadius={20}
            leftIcon={<Icon as={FiArrowLeft} />}
            _hover={{
              shadow: "lg",
              transform: "translateY(-5px)",
              transition: "0.2s",
            }}
            ml={-1}
            onClick={() => {
              setStage("");
            }}
          >
            Back to Menu
          </Button>
        </HStack>
      </FadeInUpBox>
    </VStack>
  );
}
