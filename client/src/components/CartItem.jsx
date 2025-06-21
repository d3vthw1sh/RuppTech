import {
  CloseButton,
  Flex,
  Image,
  Select,
  Text,
  VStack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addCartItem, removeCartItem } from "../redux/actions/cartActions";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, image, price, stock, qty, id, brand } = cartItem;

  const handleQtyChange = (e) => {
    dispatch(addCartItem(id, Number(e.target.value)));
  };

  const handleRemove = () => {
    dispatch(removeCartItem(id));
  };

  return (
    <Flex
      minW="300px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={2}
      bg={mode("white", "gray.800")}
      boxShadow="sm"
      align="center"
      gap={4}
    >
      <Image
        w="100px"
        h="100px"
        borderRadius="md"
        objectFit="cover"
        src={image}
        fallbackSrc="https://via.placeholder.com/100"
        alt={name}
      />

      <VStack align="start" spacing={2} w="100%">
        <Flex w="100%" align="center" justify="space-between">
          <Text fontWeight="semibold" fontSize="sm">
            {brand} {name}
          </Text>
          <CloseButton onClick={handleRemove} />
        </Flex>

        <Flex w="100%" align="center" justify="space-between">
          <Select
            size="sm"
            w="70px"
            value={qty}
            onChange={handleQtyChange}
            focusBorderColor={mode("blue.500", "blue.300")}
            isDisabled={stock === 0}
          >
            {[...Array(stock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Select>

          <Text fontWeight="bold" fontSize="sm">${price.toFixed(2)}</Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default CartItem;
