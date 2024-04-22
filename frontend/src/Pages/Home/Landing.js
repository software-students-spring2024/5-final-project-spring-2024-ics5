import { VStack, Heading, Text, Button, Icon, HStack } from "@chakra-ui/react";
import { FiSmile } from "react-icons/fi";
import FadeInUpBox from "../../Components/FadeUp";

const Landing = ({ setStage }) => {
  const delay = 0.5;

  return (
    <VStack position="absolute">
      <FadeInUpBox delay={delay}>
        <Heading fontSize={64} color="brand.700" fontWeight="900">
          met guessr
        </Heading>
      </FadeInUpBox>

      <FadeInUpBox delay={delay + 0.1}>
        <Text
          fontSize="lg"
          color="brand.600"
          width={400}
          align="center"
          mb={10}
          mt={5}
          fontWeight="500"
        >
          Guessing game for art pieces in the Metropolitan Museum of Art!
        </Text>
      </FadeInUpBox>

      <FadeInUpBox delay={delay + 0.2}>
        <Button
          borderRadius={25}
          size="lg"
          colorScheme="brand"
          rightIcon={<Icon as={FiSmile} />}
          _hover={{
            shadow: "lg",
            transform: "translateY(-5px)",
            transition: "0.2s",
          }}
          onClick={() => {
            setStage("login");
          }}
        >
          Play as Guest
        </Button>
      </FadeInUpBox>

      <FadeInUpBox delay={delay + 0.3}>
        <HStack mt={10}>
          <Button
            borderRadius={20}
            colorScheme="brand"
            _hover={{
              shadow: "lg",
              transform: "translateY(-5px)",
              transition: "0.2s",
            }}
            onClick={() => {
              setStage("login");
            }}
          >
            Login
          </Button>
          <Button
            borderRadius={20}
            color="brand.700"
            variant="text"
            _hover={{
              color: "brand.500",
            }}
            onClick={() => {
              setStage("login");
            }}
          >
            Sign Up
          </Button>
        </HStack>
      </FadeInUpBox>
    </VStack>
  );
};

export default Landing;
