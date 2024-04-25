import { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Image,
  Spinner,
  Box,
  Text,
  Center,
  Icon,
} from "@chakra-ui/react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import FadeInUpBox from "../../Components/FadeUp";
import { FiZoomIn } from "react-icons/fi";

export default function ArtifactViewer({ gameObjects, progression }) {
  const [bigImgSrc, setBigImgSrc] = useState(gameObjects[0]["primaryImage"]);
  const [loading, setLoading] = useState(true);

  // slight delay for transition animation
  useEffect(() => {
    setLoading(true);
    setBigImgSrc(gameObjects[progression]["primaryImage"]);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [progression]);

  return (
    <HStack gap={5} pb={10}>
      <VStack>
        {/* image */}
        {loading ? (
          <Box h={400} w={400}>
            <Center h="100%">
              <Spinner size="lg" color="brand.700" />
            </Center>
          </Box>
        ) : (
          <Zoom zoomMargin={200}>
            <Image src={bigImgSrc} maxW={400} maxH={500} objectFit="cover" />
          </Zoom>
        )}
        <FadeInUpBox delay={2}>
          <HStack mt={2}>
            <Icon as={FiZoomIn} color="gray.500" fontSize={14} />
            <Text color="gray.500" fontSize={14}>
              Click image to enlarge
            </Text>
          </HStack>
        </FadeInUpBox>
      </VStack>

      {/* image description */}
      <VStack
        borderRadius={20}
        p={5}
        px={10}
        maxW={350}
        gap={5}
        alignItems="left"
      >
        {gameObjects[progression]["title"] && (
          <VStack alignItems="left">
            <Text color="gray.500" fontFamily="monospace">
              Title
            </Text>
            <Text
              fontSize={18}
              fontWeight="600"
              color="brand.700"
              fontFamily="monospace"
            >
              {gameObjects[progression]["title"].substring(0, 75)}
              {gameObjects[progression]["title"].length >= 75 && "..."}
            </Text>
          </VStack>
        )}
        {gameObjects[progression]["artistDisplayName"] && (
          <VStack alignItems="left">
            <Text color="gray.500" fontFamily="monospace">
              Artist
            </Text>
            <Text
              fontSize={18}
              fontWeight="600"
              color="brand.700"
              fontFamily="monospace"
            >
              {gameObjects[progression]["artistDisplayName"].substring(0, 50)}
              {gameObjects[progression]["artistDisplayName"].length >= 50 &&
                "..."}
            </Text>
          </VStack>
        )}
        {gameObjects[progression]["medium"] && (
          <VStack alignItems="left">
            <Text color="gray.500" fontFamily="monospace">
              Medium
            </Text>
            <Text
              fontSize={18}
              fontWeight="600"
              color="brand.700"
              fontFamily="monospace"
            >
              {gameObjects[progression]["medium"].substring(0, 75)}
              {gameObjects[progression]["medium"].length >= 75 && "..."}
            </Text>
          </VStack>
        )}
        {gameObjects[progression]["country"] && (
          <VStack alignItems="left">
            <Text color="gray.500" fontFamily="monospace">
              Country
            </Text>
            <Text
              fontSize={18}
              fontWeight="600"
              color="brand.700"
              fontFamily="monospace"
            >
              {gameObjects[progression]["country"]}
            </Text>
          </VStack>
        )}
      </VStack>
    </HStack>
  );
}
