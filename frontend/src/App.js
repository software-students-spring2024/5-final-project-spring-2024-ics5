import * as React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Pages/Home/Home";
import { theme } from "./Theme/theme";
import Start from "./Pages/Game/Start";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/game", element: <Start /> },
  { path: "/leaderboard", element: <Leaderboard /> },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
