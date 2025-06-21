import {
  Tr,
  Td,
  Button,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDriveFolderUpload } from "react-icons/md";
import { uploadProduct } from "../redux/actions/adminActions";

const AddNewProduct = () => {
  const dispatch = useDispatch();

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [productIsNew, setProductIsNew] = useState(false);
  const [description, setDescription] = useState("");
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [stripeId, setStripeId] = useState("");

  const handleSubmit = () => {
    dispatch(
      uploadProduct({
        brand,
        name,
        category,
        stock,
        price,
        stripeId,
        subtitle,
        images: [`/images/${imageOne}`, `/images/${imageTwo}`],
        productIsNew,
        description,
      })
    );
  };

  return (
    <Tr>
      <Td>
        <Text fontSize="sm" mb={1}>Image File Name 1</Text>
        <Tooltip label="e.g., iphone.jpg" fontSize="sm">
          <Input size="sm" value={imageOne} onChange={(e) => setImageOne(e.target.value)} />
        </Tooltip>

        <Spacer my={2} />

        <Text fontSize="sm" mb={1}>Image File Name 2</Text>
        <Tooltip label="e.g., iphone2.jpg" fontSize="sm">
          <Input size="sm" value={imageTwo} onChange={(e) => setImageTwo(e.target.value)} />
        </Tooltip>
      </Td>

      <Td>
        <Text fontSize="sm" mb={1}>Description</Text>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          size="sm"
          w="270px"
          h="120px"
        />
      </Td>

      <Td>
        <Text fontSize="sm" mb={1}>Brand</Text>
        <Input size="sm" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Apple / Samsung" />

        <Text fontSize="sm" mt={3} mb={1}>Name</Text>
        <Input size="sm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Galaxy S24" />
      </Td>

      <Td>
        <Text fontSize="sm" mb={1}>Stripe ID</Text>
        <Input size="sm" value={stripeId} onChange={(e) => setStripeId(e.target.value)} />

        <Text fontSize="sm" mt={3} mb={1}>Subtitle</Text>
        <Input size="sm" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Premium Android phone" />
      </Td>

      <Td>
        <Text fontSize="sm" mb={1}>Category</Text>
        <Input size="sm" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Smartphone" />

        <Text fontSize="sm" mt={3} mb={1}>Price ($)</Text>
        <Input size="sm" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="299.99" />
      </Td>

      <Td>
        <Text fontSize="sm" mb={1}>Stock</Text>
        <Input size="sm" value={stock} onChange={(e) => setStock(e.target.value)} />

        <FormControl display="flex" alignItems="center" mt={4}>
          <FormLabel htmlFor="productIsNew" fontSize="sm" mb="0">
            Show
            <Badge ml={1} px={1} fontSize="0.8em" colorScheme="green">new</Badge>
            badge?
          </FormLabel>
          <Switch
            id="productIsNew"
            isChecked={productIsNew}
            onChange={() => setProductIsNew(!productIsNew)}
          />
        </FormControl>
      </Td>

      <Td>
        <VStack>
          <Button
            leftIcon={<MdDriveFolderUpload />}
            variant="solid"
            colorScheme="blue"
            size="sm"
            w="160px"
            onClick={handleSubmit}
          >
            Save Product
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
