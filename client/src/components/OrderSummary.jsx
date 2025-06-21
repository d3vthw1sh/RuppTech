import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";

const OrderSummary = ({ checkoutSreen = false }) => {
  const { subtotal = 0, shipping = 0 } = useSelector((state) => state.cart);
  const total = Number(subtotal) + Number(shipping);

  return (
    <Stack
      minW="300px"
      spacing={6}
      borderWidth="1px"
      borderColor={mode("red.300", "red.600")}
      rounded="lg"
      p={6}
      bg={mode("white", "gray.800")}
      boxShadow="md"
      w="full"
    >
      <Heading size="md">Order Summary</Heading>

      <Stack spacing={4}>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
            Subtotal
          </Text>
          <Text fontWeight="medium">${subtotal.toFixed(2)}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
            Shipping
          </Text>
          <Text fontWeight="medium">${shipping.toFixed(2)}</Text>
        </Flex>
        <Flex justify="space-between" pt={2}>
          <Text fontSize="lg" fontWeight="bold">
            Total
          </Text>
          <Text fontWeight="semibold" fontSize="lg">
            ${total.toFixed(2)}
          </Text>
        </Flex>
      </Stack>

      {!checkoutSreen && (
        <Button
          as={ReactLink}
          to="/checkout"
          colorScheme="red"
          size="lg"
          rightIcon={<FaArrowRight />}
        >
          Checkout
        </Button>
      )}
    </Stack>
  );
};

export default OrderSummary;
