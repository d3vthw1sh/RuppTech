import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Wrap,
  useToast,
  Textarea,
  Input,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiCheckShield, BiPackage, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/actions/productActions";
import { useEffect, useState } from "react";
import { addCartItem } from "../redux/actions/cartActions";
import Star from "../components/Star";
import { createProductReview } from "../redux/actions/productActions";

const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // FIXED HERE: use 'product' slice (singular) to avoid undefined
  const { loading, error, product, reviewed } = useSelector((state) => state.product);
  
  const { cartItems } = useSelector((state) => state.cart);
  const toast = useToast();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [buttonLoading, setButtonLoading] = useState(false);

  const textColor = useColorModeValue("gray.800", "gray.100");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const badgeBg = useColorModeValue("gray.100", "gray.700");
  const fallbackTextColor = useColorModeValue("blackAlpha.800", "whiteAlpha.900");

  useEffect(() => {
    dispatch(getProduct(id));
    setReviewBoxOpen(false);

    if (reviewed) {
      toast({
        description: "Product review saved.",
        status: "success",
        isClosable: true,
      });
      setReviewBoxOpen(false);
    }
  }, [dispatch, id, toast, reviewed]);

  const changeAmount = (input) => {
    if (input === "plus" && amount < product.stock) {
      setAmount(amount + 1);
    }
    if (input === "minus" && amount > 1) {
      setAmount(amount - 1);
    }
  };

  const addItem = () => {
    dispatch(addCartItem(id, amount));
    toast({
      description: "Item has been added.",
      status: "success",
      isClosable: true,
    });
  };

  const hasUserReviewed = () =>
    product.reviews.some((item) => item.user.toString() === userInfo._id);

  const onSubmit = () => {
    setButtonLoading(true);
    dispatch(createProductReview(product._id, userInfo._id, comment, rating, title));
  };

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing="4">
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#EE3536.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: "3xl", lg: "5xl" }}
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            <Stack direction={{ base: "column", lg: "row" }} align="flex-start">
              <Stack pr={{ base: "0", md: "row" }} flex="1.5" mb={{ base: "12", md: "none" }}>
                {product.productIsNew && (
                  <Badge p="2" rounded="md" w="50px" fontSize="0.8em" colorScheme="green">
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge rounded="full" w="70px" fontSize="0.8em" colorScheme="red">
                    sold out
                  </Badge>
                )}
                <Heading fontSize="2xl" fontWeight="extrabold" color={textColor}>
                  {product.brand} {product.name}
                </Heading>
                <Stack spacing="5">
                  <Box>
                    <Text fontSize="xl" color={textColor}>
                      ${product.price}
                    </Text>
                    <Flex>
                      <HStack spacing="2px">
                        <Star color="#EE3536.500" />
                        <Star rating={product.rating} star={2} />
                        <Star rating={product.rating} star={3} />
                        <Star rating={product.rating} star={4} />
                        <Star rating={product.rating} star={5} />
                      </HStack>
                      <Text fontSize="md" fontWeight="bold" ml="4px" color={textColor}>
                        {product.numberOfReviews} Reviews
                      </Text>
                    </Flex>
                  </Box>
                  <Text color={textColor}>{product.subtitle}</Text>
                  <Text color={textColor}>{product.description}</Text>
                  <Text fontWeight="bold" color={textColor}>
                    Quantity
                  </Text>
                  <Flex w="170px" p="5px" border="1px" borderColor={borderColor} alignItems="center">
                    <Button isDisabled={amount <= 1} onClick={() => changeAmount("minus")}>
                      <MinusIcon />
                    </Button>
                    <Text mx="30px" color={textColor}>
                      {amount}
                    </Text>
                    <Button isDisabled={amount >= product.stock} onClick={() => changeAmount("plus")}>
                      <SmallAddIcon />
                    </Button>
                  </Flex>
                  <Badge fontSize="lg" width="170px" textAlign="center" bg={badgeBg} color={textColor}>
                    In Stock: {product.stock}
                  </Badge>
                  <Button
                    variant="outline"
                    isDisabled={product.stock === 0}
                    colorScheme="red"
                    onClick={addItem}
                  >
                    Add to cart
                  </Button>
                  <Stack width="270px">
                    <Flex alignItems="center">
                      <BiPackage size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2" color={textColor}>
                        Shipped in 2 - 3 days
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <BiCheckShield size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2" color={textColor}>
                        2 year extended warranty
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <BiSupport size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2" color={textColor}>
                        We're here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction="column" align="center" flex="1" _dark={{ bg: "gray.900" }}>
                <Image
                  mb="30px"
                  src={product.images && product.images[0] ? product.images[0] : "https://via.placeholder.com/250"}
                  alt={product.name}
                  fallbackSrc="https://via.placeholder.com/250"
                />
                <Image
                  mb="30px"
                  src={product.images && product.images[1] ? product.images[1] : "https://via.placeholder.com/250"}
                  alt={product.name}
                  fallbackSrc="https://via.placeholder.com/250"
                />
              </Flex>
            </Stack>

            {userInfo && (
              <>
                <Tooltip label={hasUserReviewed() ? "You have already reviewed this product." : ""} fontSize="medium">
                  <Button
                    isDisabled={hasUserReviewed()}
                    my="20px"
                    w="140px"
                    colorScheme="red"
                    onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
                  >
                    Write a review
                  </Button>
                </Tooltip>
                {reviewBoxOpen && (
                  <Stack mb="20px">
                    <HStack spacing="2px">
                      {[1, 2, 3, 4, 5].map((starNum) => (
                        <Button key={starNum} variant="outline" onClick={() => setRating(starNum)}>
                          <Star rating={rating} star={starNum} />
                        </Button>
                      ))}
                    </HStack>
                    <Input
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Review title (optional)"
                    />
                    <Textarea
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={`The ${product.brand} ${product.name} is...`}
                    />
                    <Button
                      isLoading={buttonLoading}
                      loadingText="Saving"
                      w="140px"
                      colorScheme="red"
                      onClick={onSubmit}
                    >
                      Publish review
                    </Button>
                  </Stack>
                )}
              </>
            )}
            <Stack>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                Reviews
              </Text>
              <SimpleGrid minChildWidth="300px" spacingX="40px" spacingY="20px">
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing="2px" alignItems="center">
                      <Star color="#EE3536.500" />
                      <Star rating={product.rating} star={2} />
                      <Star rating={product.rating} star={3} />
                      <Star rating={product.rating} star={4} />
                      <Star rating={product.rating} star={5} />
                      <Text fontWeight="semibold" ml="4px" color={fallbackTextColor}>
                        {review.title}
                      </Text>
                    </Flex>
                    <Box py="12px" color={textColor}>
                      {review.comment}
                    </Box>
                    <Text fontSize="sm" color="gray.400">
                      by {review.name}, {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProductScreen;
