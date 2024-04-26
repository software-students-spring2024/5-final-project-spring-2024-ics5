import {
  Box,
  Button,
  ButtonSpinner,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import FadeInUpBox from "../../Components/FadeUp";

export default function Profile({}) {
  const navigate = useNavigate();

  const [user, setUser] = useState(""); // user state
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [joinDate, setJoinDate] = useState("");
  const [avgScore, setAvgScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // set user if logged in
    if (window.sessionStorage.getItem("user")) {
      setUser(window.sessionStorage.getItem("user")); // update user

      // get user games
      fetch(
        `/api/get_user_games?username=${window.sessionStorage.getItem("user")}`
      )
        .then((response) => response.json())
        .then((data) => {
          setGames(data);
          console.log("Games fetched successfully:", data);

          // get user info
          fetch("/api/get_user/" + window.sessionStorage.getItem("user"))
            .then((response) => response.json())
            .then((data) => {
              setJoinDate(data["joined"]);

              // get user info
              fetch(
                "/api/user_score_stats/" + window.sessionStorage.getItem("user")
              )
                .then((response) => response.json())
                .then((data) => {
                  setAvgScore(data["average_score"]);
                  setHighScore(data["high_score"]);
                  setLoading(false);
                });
            });
        });
    }
  }, [user]);

  return (
    <VStack bgGradient="linear(to-r, #F5F5DC, #D8CAB8)" height="100vh" p={50}>
      <Center height="100%">
        <VStack>
          <FadeInUpBox delay={0}>
            <Heading
              fontSize={64}
              color="brand.700"
              fontWeight="900"
              textAlign="center"
              mb={5}
            >
              {user}
            </Heading>
          </FadeInUpBox>

          <HStack width="100%" alignItems="start">
            <FadeInUpBox>
              <Button
                colorScheme="brand"
                leftIcon={<Icon as={FiChevronLeft} />}
                borderRadius={20}
                _hover={{
                  shadow: "lg",
                  transform: "translateY(-5px)",
                  transition: "0.2s",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Back Home
              </Button>
            </FadeInUpBox>
          </HStack>

          <Statistics
            highScore={highScore}
            avgScore={avgScore}
            games={games}
            joinDate={joinDate}
          />

          <Box width="100%">
            <FadeInUpBox delay={0.4}>
              <VStack bg="rgba(255,255,255,0.75)" borderRadius={20} p={5}>
                <GamesBox loading={loading} games={games} user={user} />
              </VStack>
            </FadeInUpBox>
          </Box>
        </VStack>
      </Center>
    </VStack>
  );
}

const Statistics = ({ highScore, avgScore, games, joinDate }) => {
  return (
    <HStack gap={5} my={5}>
      {/* games played */}
      <FadeInUpBox delay={0.2}>
        <Box bg="rgba(255,255,255,0.75)" borderRadius={20} p={7} minW={125}>
          <VStack>
            <Text fontSize={16} fontWeight={400} color="gray.500">
              Games
            </Text>
            <Text
              fontSize={40}
              fontWeight={600}
              color="brand.700"
              fontFamily="monospace"
            >
              {games.length}
            </Text>
          </VStack>
        </Box>
      </FadeInUpBox>

      {/* high score */}
      <FadeInUpBox delay={0.25}>
        <Box bg="rgba(255,255,255,0.75)" borderRadius={20} p={7} minW={150}>
          <VStack>
            <Text fontSize={16} fontWeight={400} color="gray.500">
              Join Date
            </Text>
            <Text
              fontSize={40}
              fontWeight={600}
              color="brand.700"
              fontFamily="monospace"
            >
              {joinDate ? new Date(joinDate).toLocaleDateString() : <Spinner />}
            </Text>
          </VStack>
        </Box>
      </FadeInUpBox>

      {/* high score */}
      <FadeInUpBox delay={0.3}>
        <Box bg="rgba(255,255,255,0.75)" borderRadius={20} p={7} minW={150}>
          <VStack>
            <Text fontSize={16} fontWeight={400} color="gray.500">
              High Score
            </Text>
            <Text
              fontSize={40}
              fontWeight={600}
              color="brand.700"
              fontFamily="monospace"
            >
              {highScore}
            </Text>
          </VStack>
        </Box>
      </FadeInUpBox>

      {/* avg score */}
      <FadeInUpBox delay={0.3}>
        <Box bg="rgba(255,255,255,0.75)" borderRadius={20} p={7} minW={150}>
          <VStack>
            <Text fontSize={16} fontWeight={400} color="gray.500">
              Avg Score
            </Text>
            <Text
              fontSize={40}
              fontWeight={600}
              color="brand.700"
              fontFamily="monospace"
            >
              {avgScore}
            </Text>
          </VStack>
        </Box>
      </FadeInUpBox>
    </HStack>
  );
};

const GamesBox = ({ loading, games, user }) => {
  useEffect(() => {
    console.log(games);
  });
  if (loading) {
    return (
      <Center height="100%">
        <Spinner color="brand.700" />
      </Center>
    );
  }

  if (games.length == 0)
    return (
      <Center height="100%">
        <Text>No games yet.</Text>
      </Center>
    );

  return (
    <VStack w="100%" p={1}>
      <HStack justifyContent="space-between" w="100%">
        <Text
          fontFamily="monospace"
          fontWeight={600}
          color="brand.700"
          fontSize={18}
        >
          Time
        </Text>
        <Text
          fontFamily="monospace"
          fontWeight={600}
          color="brand.700"
          fontSize={18}
        >
          Score
        </Text>
      </HStack>
      <Divider></Divider>
      <VStack w="100%" height={300} overflow="auto">
        {games.map((game) => {
          return (
            <Box w="100%">
              <HStack w="100%" justifyContent="space-between">
                <Text
                  fontFamily="monospace"
                  color="brand.500"
                  fontWeight={600}
                  fontSize={16}
                >
                  {new Date(game["timestamp"]).toLocaleDateString()}{" "}
                  {new Date(game["timestamp"]).toLocaleTimeString()}
                </Text>

                <Text
                  fontFamily="monospace"
                  color="brand.500"
                  fontWeight={600}
                  fontSize={16}
                >
                  {game["score"]}
                </Text>
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
};
