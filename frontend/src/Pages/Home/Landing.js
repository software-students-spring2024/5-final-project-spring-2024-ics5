import { VStack, Text, Button, HStack, Icon } from "@chakra-ui/react";
import FadeInUpBox from "../../Components/FadeUp";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

const Landing = ({ setStage }) => {
  const delay = 0.2;
  const navigate = useNavigate();

  const [user, setUser] = useState(""); // user recoil state
  useEffect(() => {
    // set user if logged in
    if (window.sessionStorage.getItem("user")) {
      setUser(window.sessionStorage.getItem("user"));
    }
  }, [user]);

  return (
    <VStack position="absolute">
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
          _hover={{
            shadow: "lg",
            transform: "translateY(-5px)",
            transition: "0.2s",
          }}
          onClick={() => {
            navigate("/game");
          }}
        >
          Play {user == "" && "as Guest"}
        </Button>
      </FadeInUpBox>

      <FadeInUpBox delay={delay + 0.25}>
        <Button
          mt={2}
          size="md"
          variant="outline"
          borderRadius={20}
          colorScheme={"brand"}
          _hover={{
            bg: "rgba(255,255,255,0.5)",
            transition: "0.2s",
          }}
          onClick={() => {
            navigate("/leaderboard");
          }}
        >
          View Leaderboard
        </Button>
      </FadeInUpBox>

      <FadeInUpBox delay={delay + 0.3}>
        <Button
          mt={2}
          size="md"
          variant="outline"
          borderRadius={20}
          colorScheme={"brand"}
          _hover={{
            bg: "rgba(255,255,255,0.5)",
            transition: "0.2s",
          }}
          onClick={() => {
            setStage("howToPlay");
          }}
        >
          How to play?
        </Button>
      </FadeInUpBox>

      {user == "" && (
        <FadeInUpBox delay={delay + 0.35} key="loginButtons">
          <HStack mt={20}>
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
                setStage("signup");
              }}
            >
              Sign Up
            </Button>
          </HStack>
        </FadeInUpBox>
      )}

      {user !== "" && (
        <VStack key="loggedInUser" gap={0}>
          <FadeInUpBox delay={delay + 0.35}>
            <VStack mb={2}>
              <Icon
                as={FiUser}
                color="brand.700"
                fontSize={26}
                mt={10}
                mb={5}
              />
              <HStack gap={1}>
                <Text fontSize={16} color="brand.700" fontWeight={600}>
                  Logged in as
                </Text>
                <Text color="brand.500" fontSize={16} fontWeight={600}>
                  {user}
                </Text>
              </HStack>
            </VStack>
          </FadeInUpBox>
          <FadeInUpBox delay={delay + 0.4}>
            <Button variant="text" mt={0} onClick={() => {}}>
              View Profile
            </Button>
          </FadeInUpBox>
          <FadeInUpBox delay={delay + 0.45}>
            <Button
              variant="text"
              onClick={() => {
                window.sessionStorage.removeItem("user");
                setUser("");
              }}
            >
              Log out
            </Button>
          </FadeInUpBox>
        </VStack>
      )}
    </VStack>
  );
};

export default Landing;
