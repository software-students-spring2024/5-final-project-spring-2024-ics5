import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      50: "#f0fdf4", // very light green for background accents
      100: "#c6f6d5", // lighter green for hover states or accents
      200: "#9ae6b4", // possible for badges or indicators
      300: "#68d391", // interactive elements like buttons
      400: "#48bb78", // also for interactive elements that need emphasis
      500: "#38a169", // base brand color, suitable for strong CTAs and icons
      600: "#2f855a", // for text or active states
      700: "#276749", // for headers or emphasized text
      800: "#22543d", // darker shade for depth and shadow
      900: "#1c4532", // darkest shade, can be used sparingly for text or outlines
    },
  },
  fonts: {
    body: "Work Sans",
    heading: "Work Sans",
    mono: "Space Mono, monospace",
  },
  components: {
    Button: {
      variants: {
        text: (props) => ({
          color: "brand.700", // Normal state color
          _hover: {
            color: "brand.500", // Hover state color
            textDecoration: "none", // Optional: removes the underline text on hover
            transition: "0.2s",
          },
        }),
      },
    },
    Input: {
      variants: {
        outlined: (props) => ({
          field: {
            borderRadius: 20,
            px: 5,
            bg: "rgba(255,255,255,0.9)",
            borderColor: "brand.500",
            _hover: {
              borderColor: "brand.600",
            },
            _focus: {
              borderColor: "brand.700",
              boxShadow: `0 0 0 1px ${props.theme.colors.brand[500]}`,
            },
          },
        }),
      },
    },
  },
});
