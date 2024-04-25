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
import { FiArrowLeft, FiCheck, FiLock, FiUser } from "react-icons/fi";
import FadeInUpBox from "../../Components/FadeUp";
import { AnimatePresence } from "framer-motion";

const Signup = ({ setStage }) => {
  const delay = 0;

  const [error, setError] = useState(""); // error for input handling
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginValidated = () => {
    if (username == "") {
      setError("Please enter a username!");
      return false;
    } else if (password == "") {
      setError("Please enter a password!");
      return false;
    } else if (confirmPassword != password) {
      setError("Please make sure the two passwords match!");
      return false;
    }
    return true;
  };

  async function signup() {
    return fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => {
      return response.json();
    });
  }

  // handle login
  const handleSignup = async () => {
    // handle error
    const isValidLogin = loginValidated();
    if (!isValidLogin) return;

    const resp = await signup();
    if (resp["error"]) {
      setError("Username already exists.");
    } else {
      console.log("Signed up successfully as:", username);
      window.sessionStorage.setItem("user", username);
      setStage(""); // go home
    }
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

          {/* confirm password */}
          <InputGroup>
            <InputLeftElement>
              <Icon color="brand.500" as={FiLock} />
            </InputLeftElement>
            <Input
              variant="outlined"
              placeholder="confirm password"
              type="password"
              width="100%"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />
          </InputGroup>
        </VStack>
      </FadeInUpBox>

      <FadeInUpBox delay={delay + 0.2}>
        <HStack gap={5} justifyContent="left" mt={5}>
          <Button
            colorScheme="brand"
            borderRadius={20}
            rightIcon={<Icon as={FiCheck} />}
            _hover={{
              shadow: "lg",
              transform: "translateY(-5px)",
              transition: "0.2s",
            }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </HStack>
      </FadeInUpBox>

      <VStack mt={10} width={250}>
        <AnimatePresence>
          {error !== "" && (
            <FadeInUpBox key="errorText">
              <Text color="red.500" fontWeight="600" textAlign="center">
                {error}
              </Text>
            </FadeInUpBox>
          )}
        </AnimatePresence>
      </VStack>
    </VStack>
  );
};

export default Signup;
