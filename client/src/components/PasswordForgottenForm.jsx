import { Text, Stack, Box, Button, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendResetEmail } from "../redux/actions/userActions";

const PasswordForgottenForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      toast({
        title: "Email required.",
        description: "Please enter your email address.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(sendResetEmail(email));
    toast({
      title: "Reset email sent.",
      description: "Check your inbox for the reset link.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box my={6}>
      <Text fontWeight="bold" mb={1}>
        Enter your email address below
      </Text>
      <Text mb={4}>We'll send you a link to reset your password.</Text>

      <Stack spacing={4}>
        <Input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          colorScheme="red"
          size="lg"
          onClick={handleSubmit}
        >
          Send Reset Email
        </Button>
      </Stack>
    </Box>
  );
};

export default PasswordForgottenForm;
