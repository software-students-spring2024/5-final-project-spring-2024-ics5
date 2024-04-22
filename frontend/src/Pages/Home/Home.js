import { useState } from "react";
import { VStack, Center } from "@chakra-ui/react";

// import components
import Landing from "./Landing";
import Login from "./Login";
import { AnimatePresence } from "framer-motion";

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
      <Center height="100%">
        <AnimatePresence>
          {stage == "" && <Landing setStage={setStage} key="landing" />}
          {stage == "login" && <Login setStage={setStage} key="login" />}
        </AnimatePresence>
      </Center>
    </VStack>
  );
}
