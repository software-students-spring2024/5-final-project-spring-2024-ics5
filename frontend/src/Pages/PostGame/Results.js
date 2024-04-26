import {
  Heading,
  VStack,
  Text,
  Button,
  Box,
  HStack,
  Image,
  Icon,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FiCheck, FiUser, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import FadeInUpBox from "../../Components/FadeUp";
import { YearEra } from "../../Components/ScoreModal";

export default function Results({ gameState, setStage }) {
  const [congratsText, setCongratsText] = useState("");

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const delay = 0.2;

  // set congrats text
  useEffect(() => {
    if (gameState["score"] >= 4000) setCongratsText("Fantastic job!");
    else if (gameState["score"] >= 2500) setCongratsText("Good work!");
    else if (gameState["score"] >= 1500) setCongratsText("Not bad...");
    else if (gameState["score"] >= 500) setCongratsText("You can do better!");
    else setCongratsText(":(");
  }, [gameState]);

  // set user if logged in
  useEffect(() => {
    if (window.sessionStorage.getItem("user")) {
      setUser(window.sessionStorage.getItem("user"));
    }
  }, [user]);

  // function to add score to leaderboard
  async function addScore(username, score) {
    const response = await fetch("/api/add_score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, score: score }),
    });
    setLoading(false);
    return response.json();
  }

  useEffect(() => {
    // only if logged in
    if (window.sessionStorage.getItem("user") && congratsText !== "") {
      const username = window.sessionStorage.getItem("user");

      const updateData = async () => {
        const resp = await addScore(username, gameState["score"]);
      };
      updateData();
    }
  }, [congratsText]);

  if (loading) {
    return (
      <Center>
        <VStack gap={5}>
          <Spinner size="lg" color="brand.700" />
          <Text fontSize="lg" fontWeight="500" color="brand.700">
            Loading results...
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <VStack gap={40}>
      <VStack>
        {/*  congratulatory text */}
        <FadeInUpBox delay={delay}>
          <Heading color="brand.700" fontWeight="900">
            {congratsText}
          </Heading>
        </FadeInUpBox>

        {/* render score */}
        <VStack mt={5}>
          <FadeInUpBox delay={delay + 0.2}>
            <Text
              color="brand.700"
              fontSize={24}
              fontWeight={600}
              fontFamily="monospace"
            >
              <CountUp
                end={gameState["score"]}
                delay={delay + 0.4}
                style={{
                  fontSize: 48,
                  color: "inherit",
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              />{" "}
              / 5000
            </Text>
          </FadeInUpBox>

          <FadeInUpBox delay={delay + 0.3}>
            <VStack mt={2}>
              <Button
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
            </VStack>
          </FadeInUpBox>
        </VStack>

        {/* recap */}
        <FadeInUpBox delay={delay + 0.4}>
          <HStack mt={5} gap={2}>
            {gameState["gameObjects"].map((obj, index) => {
              return (
                <Box
                  p={5}
                  bg="rgba(255,255,255,0.3)"
                  borderRadius={20}
                  boxShadow="sm"
                >
                  <VStack justifyContent="space-between">
                    {/* artifact image */}
                    <Image
                      src={obj["primaryImage"]}
                      w={150}
                      h={100}
                      objectFit="cover"
                      borderRadius={20}
                    />

                    {/* answers */}
                    <VStack>
                      <HStack opacity={0.5}>
                        {parseInt(obj["objectEndDate"]) ==
                        parseInt(gameState["guesses"][index]) ? (
                          <Icon as={FiCheck} color="brand.700" />
                        ) : (
                          <Icon as={FiX} color="brand.700" />
                        )}
                        <Text
                          color="brand.700"
                          fontSize={16}
                          fontFamily="monospace"
                          fontWeight={400}
                        >
                          <YearEra year={gameState["guesses"][index]} />
                        </Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiCheck} color="brand.700" />
                        <Text
                          color="brand.700"
                          fontSize={16}
                          fontFamily="monospace"
                          fontWeight={600}
                        >
                          <YearEra year={obj["objectEndDate"]} />
                        </Text>
                      </HStack>
                    </VStack>

                    {/* pts earned */}
                    <VStack alignItems="flex-end">
                      <Text
                        color="brand.700"
                        fontSize={16}
                        fontFamily="monospace"
                        fontWeight={500}
                      >
                        {gameState["roundScores"][index]} pts
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              );
            })}
          </HStack>
        </FadeInUpBox>

        {/* button menu */}
        <VStack mt={10}>
          <FadeInUpBox delay={delay + 0.6}>
            <HStack>
              <Button
                variant="text"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back Home
              </Button>
              <Button
                borderRadius={20}
                px={5}
                colorScheme="brand"
                _hover={{
                  shadow: "lg",
                  transform: "translateY(-5px)",
                  transition: "0.2s",
                }}
                onClick={() => {
                  setStage("playAgain");
                }}
              >
                Play Again
              </Button>
            </HStack>
          </FadeInUpBox>

          {user !== "" && (
            <VStack key="loggedInUser" gap={0} mt={5}>
              <FadeInUpBox delay={delay + 0.7}>
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
              <FadeInUpBox delay={delay + 0.8}>
                <Button
                  variant="text"
                  mt={0}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  View Profile
                </Button>
              </FadeInUpBox>
              <FadeInUpBox delay={delay + 0.9}>
                <Button
                  variant="text"
                  onClick={() => {
                    window.sessionStorage.removeItem("user");
                    navigate("/");
                  }}
                >
                  Log out
                </Button>
              </FadeInUpBox>
            </VStack>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}
