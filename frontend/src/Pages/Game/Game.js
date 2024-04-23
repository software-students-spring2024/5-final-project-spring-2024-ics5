import { useEffect, useState } from "react";
import { VStack, Center, Text, Spinner } from "@chakra-ui/react";

// import components
import ArtifactViewer from "./ArtifactViewer";
import GameProgress from "./GameProgress";
import GuessingBox from "./GuessingBox";

export default function Game({ setStage, gameState, setGameState }) {
  // loading states
  const [loading, setLoading] = useState(true);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const loadingText = [
    "Creating Game...",
    "Looking at Art...",
    "Found over 488,048 Artifacts...",
    "Nearly Done...",
  ];

  // game progression
  // ranges 0 to 4 for each item
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    const createGame = async () => {
      fetch("/create-game")
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          console.log(data); // debug

          // update game state with objects
          setGameState((prevState) => ({
            ...prevState,
            gameObjects: data,
          }));

          setLoading(false);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };

    if (gameState["gameObjects"].length == 0) {
      createGame();
    }
  }, [gameState, loading]);

  // scroll through loading text
  useEffect(() => {
    setTimeout(() => {
      if (loadingTextIndex == 3) setLoadingTextIndex(0);
      else setLoadingTextIndex(loadingTextIndex + 1);
    }, 2000);
  }, [loadingTextIndex]);

  // show spinner if loading
  if (loading) {
    return (
      <Center>
        <VStack gap={5}>
          <Spinner size="lg" color="brand.700" />
          <Text fontSize="lg" fontWeight="500" color="brand.700">
            {loadingText[loadingTextIndex]}
          </Text>
        </VStack>
      </Center>
    );
  }

  // return game content
  return (
    <VStack gap={10}>
      {/* top legend */}
      <GameProgress
        gameState={gameState}
        setGameState={setGameState}
        progression={progression}
        setProgression={setProgression}
      />

      {/* main content */}
      <ArtifactViewer
        gameObjects={gameState["gameObjects"]}
        progression={progression}
      />

      {/* guessor */}
      <GuessingBox
        gameState={gameState}
        setGameState={setGameState}
        progression={progression}
      />
    </VStack>
  );
}
