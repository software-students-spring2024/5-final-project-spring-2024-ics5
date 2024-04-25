import {
  Center,
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import FadeInUpBox from "../../Components/FadeUp";

export default function Leaderboard({}) {
  const [scores, setScores] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const navigate = useNavigate();

  // fetch leaderboard
  useEffect(() => {
    const getScores = async () => {
      const response = await fetch("/api/get_leaderboard", {
        method: "GET",
      });
      return response.json();
    };
    getScores().then((data) => {
      setScores(data);
      console.log(data);
    });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  useEffect(() => {
    console.log(scores);
  }, [scores]);

  return (
    <VStack bgGradient="linear(to-r, #F5F5DC, #D8CAB8)" height="100vh" p={50}>
      <Center height="100%">
        <VStack>
          <FadeInUpBox delay={0}>
            <Heading fontSize={64} color="brand.700" fontWeight="900" mb={5}>
              leaderboard
            </Heading>
          </FadeInUpBox>

          <FadeInUpBox delay={0.1}>
            <Button
              mb={5}
              borderRadius={20}
              colorScheme="brand"
              leftIcon={<Icon as={FiChevronLeft} />}
              onClick={() => {
                navigate("/");
              }}
              _hover={{
                shadow: "lg",
                transform: "translateY(-5px)",
                transition: "0.2s",
              }}
            >
              Back Home
            </Button>
          </FadeInUpBox>

          {/* leaderboard */}
          <FadeInUpBox delay={0.2}>
            {scores != [] && (
              <VStack bg="rgba(255,255,255,0.75)" p={5} borderRadius={20}>
                {scores
                  .slice(page * pageSize, (page + 1) * pageSize)
                  .map((score, index) => {
                    return (
                      <HStack
                        alignItems="center"
                        justifyContent="flex-start"
                        width={400}
                        my={2}
                        px={2}
                      >
                        <Text
                          width={10}
                          fontFamily="monospace"
                          color="gray.800"
                          fontWeight={600}
                          fontSize={18}
                        >
                          {index + 1 + page * pageSize}.
                        </Text>
                        <VStack alignItems="left" width={250} gap={0}>
                          <Text color="brand.700" fontSize={22}>
                            {score["username"]}
                          </Text>
                          <Text color="gray.600" fontSize={18}>
                            {formatDate(score["timestamp"])}
                          </Text>
                        </VStack>
                        <VStack
                          width={24}
                          justifyContent="flex-end"
                          alignItems="right"
                        >
                          <Text
                            fontFamily="monospace"
                            fontSize={22}
                            color="brand.700"
                            fontWeight={600}
                            textAlign="end"
                          >
                            {score["score"]}
                          </Text>
                        </VStack>
                      </HStack>
                    );
                  })}
              </VStack>
            )}
          </FadeInUpBox>
          <FadeInUpBox delay={0.3}>
            <HStack mt={5}>
              <IconButton
                borderRadius={20}
                colorScheme="brand"
                icon={<Icon as={FiChevronLeft} />}
                onClick={() => {
                  if (page > 0) setPage(page - 1);
                }}
                _hover={{
                  shadow: "lg",
                  transform: "translateY(-5px)",
                  transition: "0.2s",
                }}
              />
              <IconButton
                borderRadius={20}
                colorScheme="brand"
                icon={<Icon as={FiChevronRight} />}
                onClick={() => {
                  const maxPages = Math.floor(scores.length / pageSize);
                  if (page < maxPages) setPage(page + 1);
                }}
                _hover={{
                  shadow: "lg",
                  transform: "translateY(-5px)",
                  transition: "0.2s",
                }}
              />
            </HStack>
          </FadeInUpBox>
        </VStack>
      </Center>
    </VStack>
  );
}
