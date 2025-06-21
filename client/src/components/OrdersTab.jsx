import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  deleteOrder,
  resetErrorAndRemoval,
  setDelivered,
} from "../redux/actions/adminActions";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert";
import { TbTruckDelivery } from "react-icons/tb";

const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState("");
  const dispatch = useDispatch();
  const { error, loading, orders, deliveredFlag, orderRemoval } = useSelector((state) => state.admin);
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());

    if (orderRemoval) {
      toast({
        description: "Order has been removed.",
        status: "success",
        isClosable: true,
      });
    }

    if (deliveredFlag) {
      toast({
        description: "Order has been set to delivered.",
        status: "success",
        isClosable: true,
      });
    }
  }, [dispatch, toast, orderRemoval, deliveredFlag]);

  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
  };

  return (
    <Box>
      {error && (
        <Alert status='error' mb='4'>
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Wrap justify='center'>
          <Stack direction='row' spacing='4'>
            <Spinner
              mt='20'
              thickness='2px'
              speed='0.65s'
              emptyColor='gray.200'
              color='#EE3536'
              size='xl'
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant='simple'>
              <Thead bg='gray.100'>
                <Tr>
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Shipping</Th>
                  <Th>Items</Th>
                  <Th>Shipping</Th>
                  <Th>Total</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders.map((order) => (
                    <Tr key={order._id}>
                      <Td>{new Date(order.createdAt).toDateString()}</Td>
                      <Td>{order.username}</Td>
                      <Td>{order.email}</Td>
                      <Td>
                        <Text>
                          <strong>Address:</strong> {order.shippingAddress.address}
                        </Text>
                        <Text>
                          <strong>City:</strong> {order.shippingAddress.city} - {order.shippingAddress.postalCode}
                        </Text>
                        <Text>
                          <strong>Country:</strong> {order.shippingAddress.country}
                        </Text>
                      </Td>
                      <Td>
                        {order.orderItems.map((item) => (
                          <Text key={item._id}>
                            {item.qty} × {item.name}
                          </Text>
                        ))}
                      </Td>
                      <Td>${order.shippingPrice.toFixed(2)}</Td>
                      <Td>${order.totalPrice.toFixed(2)}</Td>
                      <Td>
                        {order.isDelivered ? (
                          <CheckCircleIcon color='green.500' />
                        ) : (
                          <Text color='orange.400' fontWeight='semibold'>
                            Pending
                          </Text>
                        )}
                      </Td>
                      <Td>
                        <Flex direction='column' gap={2}>
                          <Button
                            colorScheme='red'
                            size='sm'
                            variant='outline'
                            onClick={() => openDeleteConfirmBox(order)}
                            leftIcon={<DeleteIcon />}
                          >
                            Remove
                          </Button>
                          {!order.isDelivered && (
                            <Button
                              size='sm'
                              variant='outline'
                              colorScheme='green'
                              onClick={() => onSetToDelivered(order)}
                              leftIcon={<TbTruckDelivery />}
                            >
                              Mark Delivered
                            </Button>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>

          <ConfirmRemovalAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={orderToDelete}
            deleteAction={deleteOrder}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersTab;
