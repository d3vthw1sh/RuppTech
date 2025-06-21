import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, resetProductError } from "../redux/actions/productActions";
import ProductTableItem from "./ProductTableItem";
import AddNewProduct from "./AddNewProduct";

const ProductsTab = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { error, loading } = useSelector((state) => state.admin);
  const { products, productUpdate } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());

    if (productUpdate) {
      toast({
        description: "Product has been updated.",
        status: "success",
        isClosable: true,
      });
    }
  }, [dispatch, toast, productUpdate]);

  return (
    <Box>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Wrap justify="center" my={10}>
          <Stack direction="row" spacing={4}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="red.400"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <Accordion allowToggle mb={6}>
            <AccordionItem>
              <AccordionButton justifyContent="flex-end" fontWeight="bold">
                Add a new Product
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Table size="sm" variant="simple">
                  <AddNewProduct />
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Table variant="simple" size="lg">
            <Thead bg="gray.100">
              <Tr>
                <Th>Images</Th>
                <Th>Description</Th>
                <Th>Brand & Name</Th>
                <Th>StripeId & Subtitle</Th>
                <Th>Category & Price</Th>
                <Th>Stock & New Badge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <ProductTableItem key={product._id} product={product} />
                ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ProductsTab;
