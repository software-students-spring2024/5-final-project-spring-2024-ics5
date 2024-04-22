import { useEffect, useState } from "react";
import { HStack, VStack, Image, Spinner, Box } from "@chakra-ui/react";

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
    <HStack>
      {/* additional images */}
      <VStack maxH="500px" overflowY="auto">
        {gameObjects[progression]["additionalImages"].length > 0 &&
          gameObjects[progression]["additionalImages"].map((url) => {
            return (
              <Box>
                <Image src={url} maxW={150} boxShadow="sm" />
              </Box>
            );
          })}
      </VStack>

      {/* image */}
      {loading ? (
        <Spinner size="lg" color="brand.700" />
      ) : (
        <Image src={bigImgSrc} maxH={500} maxW={500} boxShadow="xl" />
      )}
    </HStack>
  );
}
