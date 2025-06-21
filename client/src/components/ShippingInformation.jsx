import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { setShipping } from "../redux/actions/cartActions";
import { setAddress, setPayment } from "../redux/actions/orderActions";
import TextField from "./TextField";
import { Link as ReactLink, useNavigate } from "react-router-dom";

const ShippingInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Added navigation hook
  const { shipping } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.order);

  const onSubmit = (values) => {
    dispatch(setAddress(values));
    dispatch(setPayment());

    // Navigate to payment page after saving info
    navigate("/payment");
  };

  return (
    <Formik
      initialValues={{
        address: shippingAddress?.address || "",
        postalCode: shippingAddress?.postalCode || "",
        city: shippingAddress?.city || "",
        country: shippingAddress?.country || "",
      }}
      validationSchema={Yup.object({
        address: Yup.string()
          .required("We need an address.")
          .min(2, "This address is too short."),
        postalCode: Yup.string()
          .required("We need a postal code.")
          .min(2, "This postal code is too short."),
        city: Yup.string()
          .required("We need a city.")
          .min(2, "This city is too short."),
        country: Yup.string()
          .required("We need a country.")
          .min(2, "This country is too short."),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <>
          <VStack
            as="form"
            spacing={6}
            onSubmit={formik.handleSubmit}
            align="stretch"
          >
            <FormControl>
              <TextField
                name="address"
                placeholder="Street Address"
                label="Street Address"
              />
              <Flex gap={4} mt={4}>
                <Box flex="1">
                  <TextField
                    name="postalCode"
                    placeholder="Postal Code"
                    label="Postal Code"
                    type="text"
                  />
                </Box>
                <Box flex="2">
                  <TextField name="city" placeholder="City" label="City" />
                </Box>
              </Flex>
              <Box mt={4}>
                <TextField name="country" placeholder="Country" label="Country" />
              </Box>
            </FormControl>

            <Box mt={10}>
              <Heading fontSize="2xl" fontWeight="extrabold" mb={6}>
                Shipping Method
              </Heading>
              <RadioGroup
                defaultValue={shipping === 4.99 ? "standard" : "express"}
                onChange={(value) => {
                  const cost = value === "express" ? 14.99 : 4.99;
                  dispatch(setShipping(cost.toFixed(2)));
                }}
              >
                <Stack
                  direction={{ base: "column", lg: "row" }}
                  spacing={10}
                  align={{ lg: "flex-start" }}
                >
                  <Box>
                    <Radio value="express" mb={2}>
                      <Text fontWeight="bold">Express $14.99</Text>
                      <Text fontSize="sm" color="gray.600">
                        Dispatched in 24 hours
                      </Text>
                    </Radio>
                  </Box>
                  <Box>
                    <Radio value="standard">
                      <Text fontWeight="bold">Standard $4.99</Text>
                      <Text fontSize="sm" color="gray.600">
                        Dispatched in 2 - 3 days
                      </Text>
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            </Box>
          </VStack>

          <Flex
            mt={8}
            gap={4}
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
          >
            <Button
              as={ReactLink}
              to="/cart"
              variant="outline"
              colorScheme="red"
              w="100%"
            >
              Back to cart
            </Button>
            <Button
              onClick={formik.handleSubmit}
              variant="solid"
              colorScheme="red"
              w="100%"
            >
              Continue to Payment
            </Button>
          </Flex>
        </>
      )}
    </Formik>
  );
};

export default ShippingInformation;
