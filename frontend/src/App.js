import * as React from "react";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Pages/Home/Home";
import { theme } from "./Theme/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
}

export default App;
