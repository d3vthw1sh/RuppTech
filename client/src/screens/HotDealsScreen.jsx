import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Badge,
  Button,
  Skeleton,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaFire } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { Link as ReactLink } from "react-router-dom";

const HotDealsScreen = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const hotDeals = products?.filter((p) => p.isHotDeal);

  return (
    <Box maxW='8xl' mx='auto' p={{ base: 4, md: 8 }}>
      <Flex direction='column' mb={8}>
        <Flex align='center' gap={3}>
          <FaFire size={28} color='#EE3536' />
          <Heading fontSize={{ base: "2xl", md: "4xl" }}>Hot Deals</Heading>
        </Flex>
        <Text color='gray.500' fontSize={{ base: "sm", md: "md" }} mt={2}>
          Limited time only — grab your favorite phones before the deal ends!
        </Text>
      </Flex>

      {loading ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height='280px' borderRadius='xl' />
          ))}
        </SimpleGrid>
      ) : hotDeals && hotDeals.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {hotDeals.map((product) => (
            <Box
              key={product._id}
              borderWidth='1px'
              borderRadius='xl'
              overflow='hidden'
              bg={mode("white", "gray.800")}
              boxShadow='md'
              transition='0.3s'
              _hover={{ transform: "scale(1.02)" }}
            >
              <Image src={product.image} alt={product.name} objectFit='cover' w='100%' h='200px' />
              <Box p={4}>
                <Stack spacing={2}>
                  <Badge colorScheme='red' fontSize='0.8em'>
                    {product.discountPercent || "Deal"}% OFF
                  </Badge>
                  <Text fontWeight='bold' noOfLines={1}>
                    {product.name}
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    ${product.priceBefore} →{" "}
                    <Text as='span' fontWeight='bold' color='red.500'>
                      ${product.priceAfter}
                    </Text>
                  </Text>
                  <Button colorScheme='red' size='sm' mt={2} as={ReactLink} to={`/product/${product._id}`}>
                    View Deal
                  </Button>
                </Stack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text mt={10} textAlign='center' color='gray.500'>
          🔎 No hot deals available at the moment. Check back soon!
        </Text>
      )}
    </Box>
  );
};

export default HotDealsScreen;
