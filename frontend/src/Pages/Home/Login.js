import { useState } from "react";
import {
  VStack,
  Input,
  Icon,
  Button,
  HStack,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight, FiLock, FiUser } from "react-icons/fi";
import FadeInUpBox from "../../Components/FadeUp";
import { AnimatePresence } from "framer-motion";

const Login = ({ setStage }) => {
  const delay = 0.5;

  const [error, setError] = useState(""); // error for input handling
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginValidated = () => {
    if (username == "") {
      setError("Please enter a username!");
      return false;
    } else if (password == "") {
      setError("Please enter a password!");
      return false;
    }
    return true;
  };

  // handle login
  const handleLogin = () => {
    // handle error
    const isValidLogin = loginValidated();
    if (!isValidLogin) return;

    alert("do something");
  };

  return (
    <VStack position="absolute">
      {/* back to landing screen */}
      <FadeInUpBox delay={delay}>
        <Button
          variant="text"
          leftIcon={<Icon as={FiArrowLeft} />}
          ml={-3}
          onClick={() => {
            setStage("");
          }}
        >
          Back
        </Button>
        <VStack width={300}></VStack>
      </FadeInUpBox>

      {/* login input */}
      <FadeInUpBox delay={delay + 0.1}>
        <VStack width={300} mt={3}>
          {/* username */}
          <InputGroup>
            <InputLeftElement>
              <Icon color="brand.500" as={FiUser} />
            </InputLeftElement>
            <Input
              variant="outlined"
              placeholder="username"
              width="100%"
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />
          </InputGroup>

          {/* password */}
          <InputGroup>
            <InputLeftElement>
              <Icon color="brand.500" as={FiLock} />
            </InputLeftElement>
            <Input
              variant="outlined"
              placeholder="password"
              type="password"
              width="100%"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </InputGroup>
        </VStack>
      </FadeInUpBox>

      <FadeInUpBox delay={delay + 0.2}>
        <HStack gap={5} justifyContent="left" mt={10}>
          <Button
            colorScheme="brand"
            borderRadius={20}
            rightIcon={<Icon as={FiArrowRight} />}
            _hover={{
              shadow: "lg",
              transform: "translateY(-5px)",
              transition: "0.2s",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button color="brand.700" variant="text">
            Sign Up
          </Button>
        </HStack>
      </FadeInUpBox>

      <VStack mt={10} height={20}>
        <AnimatePresence>
          {error !== "" && (
            <FadeInUpBox key="errorText">
              <Text color="red.500" fontWeight="600">
                {error}
              </Text>
            </FadeInUpBox>
          )}
        </AnimatePresence>
      </VStack>
    </VStack>
  );
};

export default Login;
