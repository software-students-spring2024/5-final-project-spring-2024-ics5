import { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Image,
  Spinner,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";

export default function ArtifactViewer({ gameObjects, progression }) {
  const [bigImgSrc, setBigImgSrc] = useState(gameObjects[0]["primaryImage"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setBigImgSrc(gameObjects[progression]["primaryImage"]);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [progression]);

  return (
    <VStack gap={5}>
      {/* additional images */}
      <HStack maxW="500px">
        {gameObjects[progression]["additionalImages"].length > 0 &&
          gameObjects[progression]["additionalImages"].map((url) => {
            return (
              <Box key={url}>
                <Image src={url} maxW={150} boxShadow="sm" />
              </Box>
            );
          })}
      </HStack>

      {/* image */}
      {loading ? (
        <Box h={350}>
          <Center h="100%">
            <Spinner size="lg" color="brand.700" />
          </Center>
        </Box>
      ) : (
        <Image
          src={bigImgSrc}
          maxH={500}
          maxW={500}
          boxShadow="xl"
          borderRadius={10}
        />
      )}

      {/* image description */}
      <VStack
        bg="rgba(255,255,255,0.75)"
        borderRadius={20}
        p={5}
        px={10}
        maxW={450}
        gap={5}
      >
        {gameObjects[progression]["title"] && (
          <VStack>
            <Text color="gray.500" fontFamily="monospace">
              Title
            </Text>
            <Text
              fontSize={18}
              fontWeight="600"
              color="brand.700"
              fontFamily="monospace"
              textAlign="center"
            >
              {gameObjects[progression]["title"]}
            </Text>
          </VStack>
        )}
        {gameObjects[progression]["artistDisplayName"] && (
          <VStack>
            <Text color="gray.500" fontFamily="monospace">
              Artist
            </Text>
            <Text
              fontSize={18}
              fontWeight="600"
              color="brand.700"
              fontFamily="monospace"
              textAlign="center"
            >
              {gameObjects[progression]["artistDisplayName"]}
            </Text>
          </VStack>
        )}
        {gameObjects[progression]["medium"] && (
          <VStack>
            <Text color="gray.500" fontFamily="monospace">
              Medium
            </Text>
            <Text
              fontSize={18}
              fontWeight="600"
              color="brand.700"
              fontFamily="monospace"
              textAlign="center"
            >
              {gameObjects[progression]["medium"]}
            </Text>
          </VStack>
        )}
        {gameObjects[progression]["country"] && (
          <VStack>
            <Text color="gray.500" fontFamily="monospace">
              Medium
            </Text>
            <Text
              fontSize={18}
              fontWeight="600"
              color="brand.700"
              fontFamily="monospace"
              textAlign="center"
            >
              {gameObjects[progression]["country"]}
            </Text>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
