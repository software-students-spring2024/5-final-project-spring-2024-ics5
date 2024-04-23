import { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Image,
  Spinner,
  Box,
  Text,
  Center,
  Circle,
  IconButton,
  Icon,
} from "@chakra-ui/react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
    <HStack gap={5}>
      {/* additional images */}
      <VStack
        maxH="500px"
        overflowY="auto"
        style={{ scrollBarWidth: "none", msOverflowStyle: "none" }}
      >
        <VStack gap={5}></VStack>
      </VStack>

      <HStack>
        {/* image */}
        {loading ? (
          <Box h={350}>
            <Center h="100%">
              <Spinner size="lg" color="brand.700" />
            </Center>
          </Box>
        ) : (
          <Box maxW={500} maxH={500}>
            <Carousel
              emulateTouch
              showStatus={false}
              showArrows={false}
              showThumbs={
                gameObjects[progression]["additionalImages"].length > 0
              }
              showIndicators={
                gameObjects[progression]["additionalImages"].length > 0
              }
              autoPlay={false}
              renderThumbs={(thumbs) => {
                return thumbs.map((thumb) => {
                  return thumb;
                });
              }}
            >
              {[gameObjects[progression]["primaryImage"]]
                .concat(gameObjects[progression]["additionalImages"])
                .map((url) => {
                  return (
                    <Box key={url} maxW={600} maxH={500}>
                      <Image
                        src={url}
                        maxW={600}
                        maxH={500}
                        objectFit="contain"
                      />
                    </Box>
                  );
                })}
            </Carousel>
          </Box>
        )}
      </HStack>

      {/* image description */}
      <VStack
        bg="rgba(255,255,255,0.75)"
        borderRadius={20}
        p={5}
        px={10}
        maxW={450}
        gap={5}
        boxShadow="lg"
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
        {gameObjects[progression]["country"] &&
          (!gameObjects[progression]["medium"] ||
            !gameObjects[progression]["artistDisplayName"]) && (
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
    </HStack>
  );
}
