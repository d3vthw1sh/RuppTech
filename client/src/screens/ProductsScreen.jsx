import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Box,
  Button,
  Center,
  Wrap,
  WrapItem,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../redux/actions/productActions";

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products, pagination, favoritesToggled } = useSelector((state) => state.product);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);

  const paginationButtonClick = (page) => {
    dispatch(getProducts(page));
  };

  // 🔍 Filter logic (client-side)
  const filteredProducts = products?.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      {products.length >= 1 && (
        <Box>
          {/* 🔍 Search bar */}
          <InputGroup maxW='400px' mx='auto' mt='6' mb='6'>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.400' />
            </InputLeftElement>
            <Input
              type='text'
              placeholder='Search products...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg={mode("white", "gray.700")}
            />
          </InputGroup>

          <Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: "12", md: "20", lg: "32" }}>
            {error ? (
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>We are sorry!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              filteredProducts.map((product) => (
                <WrapItem key={product._id}>
                  <Center w='250px' h='450px'>
                    <ProductCard product={product} loading={loading} />
                  </Center>
                </WrapItem>
              ))
            )}
          </Wrap>

          {!favoritesToggled && (
            <Wrap spacing='10px' justify='center' p='5'>
              <Button colorScheme='#EE3536' onClick={() => paginationButtonClick(1)}>
                <ArrowLeftIcon />
              </Button>
              {Array.from(Array(pagination.totalPages), (e, i) => {
                return (
                  <Button
                    colorScheme={pagination.currentPage === i + 1 ? "#EE3536" : "gray"}
                    key={i}
                    onClick={() => paginationButtonClick(i + 1)}
                  >
                    {i + 1}
                  </Button>
                );
              })}
              <Button colorScheme='#EE3536' onClick={() => paginationButtonClick(pagination.totalPages)}>
                <ArrowRightIcon />
              </Button>
            </Wrap>
          )}
        </Box>
      )}
    </>
  );
};

export default ProductsScreen;
