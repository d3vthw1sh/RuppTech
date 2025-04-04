import {
  Box,
  Image,
  Text,
  Badge,
  Flex,
  IconButton,
  Skeleton,
  useToast,
  Tooltip,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { BiExpand } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import { addToFavorites, removeFromFavorites } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";
import { addCartItem } from "../redux/actions/cartActions";
import { TbShoppingCartPlus } from "react-icons/tb";

const ProductCard = ({ product, loading }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const toast = useToast();

  const [isShown, setIsShown] = useState(false);
  const [cartPlusDisabled, setCartPlusDisabled] = useState(false);

  const iconColor = mode("gray.700", "gray.200");
  const hoverBg = mode("gray.100", "whiteAlpha.100");
  const activeBg = mode("gray.200", "whiteAlpha.200");

  useEffect(() => {
    const item = cartItems.find((cartItem) => cartItem.id === product._id);
    if (product.stock <= 0) {
      setCartPlusDisabled(true);
    } else if (item && item.qty >= product.stock) {
      setCartPlusDisabled(true);
    } else {
      setCartPlusDisabled(false);
    }
  }, [product, cartItems]);

  const addItem = (id) => {
    const existing = cartItems.find((item) => item.id === id);
    const qty = existing ? existing.qty + 1 : 1;
    dispatch(addCartItem(id, qty));

    toast({
      description: "Item has been added.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Skeleton isLoaded={!loading}>
      <Box
        _hover={{ transform: "scale(1.1)", transitionDuration: "0.5s" }}
        borderWidth='1px'
        overflow='hidden'
        p='4'
        shadow='md'
      >
        <Image
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          src={product.images[isShown && product.images.length === 2 ? 1 : 0]}
          fallbackSrc='https://via.placeholder.com/150'
          alt={product.name}
          height='200px'
        />

        {product.stock < 5 ? (
          <Badge colorScheme='yellow'>only {product.stock} left</Badge>
        ) : product.stock < 1 ? (
          <Badge colorScheme='red'>Sold out</Badge>
        ) : (
          <Badge colorScheme='green'>In Stock</Badge>
        )}

        {product.productIsNew && (
          <Badge ml='2' colorScheme='purple'>
            new
          </Badge>
        )}

        <Text noOfLines={1} fontSize='xl' fontWeight='semibold' mt='2'>
          {product.brand} {product.name}
        </Text>

        <Text noOfLines={1} fontSize='md' color='gray.600'>
          {product.subtitle}
        </Text>

        <Flex justify='space-between' alignItems='center' mt='2'>
          <Badge colorScheme='gray'>{product.category}</Badge>
          <Text fontSize='xl' fontWeight='semibold' color='gray.200'>
            ${product.price}
          </Text>
        </Flex>

        <Flex justify='space-between' mt='2'>
          {/* Favorite button */}
          <IconButton
            icon={
              favorites.includes(product._id) ? (
                <MdOutlineFavorite size='20px' />
              ) : (
                <MdOutlineFavoriteBorder size='20px' />
              )
            }
            onClick={() =>
              favorites.includes(product._id)
                ? dispatch(removeFromFavorites(product._id))
                : dispatch(addToFavorites(product._id))
            }
            aria-label='Toggle Favorite'
            variant='ghost'
            size='sm'
            color={iconColor}
            _hover={{ bg: hoverBg }}
            _active={{ bg: activeBg }}
          />

          {/* Expand button */}
          <IconButton
            icon={<BiExpand size='20' />}
            as={ReactLink}
            to={`/product/${product._id}`}
            aria-label='View Details'
            variant='ghost'
            size='sm'
            color={iconColor}
            _hover={{ bg: hoverBg }}
            _active={{ bg: activeBg }}
          />

          {/* Add to cart button */}
          <Tooltip
            isDisabled={!cartPlusDisabled}
            hasArrow
            label={product.stock <= 0 ? "Out of stock" : "You reached the maximum quantity of this product."}
          >
            <IconButton
              isDisabled={product.stock <= 0 || cartPlusDisabled}
              onClick={() => addItem(product._id)}
              icon={<TbShoppingCartPlus size='20' />}
              aria-label='Add to Cart'
              variant='ghost'
              size='sm'
              color={iconColor}
              _hover={{ bg: hoverBg }}
              _active={{ bg: activeBg }}
            />
          </Tooltip>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductCard;
