import { useState } from "react";
import { VStack, Center, Heading } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

// import components
import Landing from "./Landing";
import Login from "./Login";
import FadeInUpBox from "../../Components/FadeUp";
import Signup from "./Signup";
import HowToPlay from "./HowToPlay";

export default function Home() {
  /**
   * stages:
   * "" - empty string is the home landing page
   * "login" - login page
   * "signup" - signup page
   */
  const [stage, setStage] = useState("");

  return (
    <VStack bgGradient="linear(to-r, #F5F5DC, #D8CAB8)" height="100vh" p={50}>
      <Center height="100vh">
        <VStack pb={400}>
          <FadeInUpBox delay={0.25} position="absolute">
            <Heading fontSize={64} color="brand.700" fontWeight="900">
              met guessr
            </Heading>
          </FadeInUpBox>
          <VStack pt={5}>
            <AnimatePresence mode="wait">
              {stage == "" && <Landing setStage={setStage} key="landing" />}
              {stage == "login" && <Login setStage={setStage} key="login" />}
              {stage == "signup" && <Signup setStage={setStage} key="signup" />}
              {stage == "howToPlay" && (
                <HowToPlay setStage={setStage} key="howToPlay" />
              )}
            </AnimatePresence>
          </VStack>
        </VStack>
      </Center>
    </VStack>
  );
}
