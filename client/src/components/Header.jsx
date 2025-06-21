import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdOutlineAdminPanelSettings } from "react-icons/md";
import { BiUserCheck, BiLogInCircle } from "react-icons/bi";
import { TbShoppingCart } from "react-icons/tb";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { googleLogout } from "@react-oauth/google";

import NavLink from "./NavLink";
import ColorModeToggle from "./ColorModeToggle";
import { toggleFavorites } from "../redux/actions/productActions";
import { logout } from "../redux/actions/userActions";

const navLinks = [
  { name: "Products", route: "/products" },
  { name: "Hot Deals", route: "/hot-deals" },
  { name: "Contact", route: "/contact" },
  { name: "Services", route: "/services" },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const { favoritesToggled } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const [showBanner, setShowBanner] = useState(userInfo ? !userInfo.active : false);

  const iconColor = useColorModeValue("black", "red.400");

  useEffect(() => {
    if (userInfo && !userInfo.active) {
      setShowBanner(true);
    }
  }, [favoritesToggled, userInfo]);

  const logoutHandler = () => {
    googleLogout();
    dispatch(logout());
    toast({
      description: "You have been logged out.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <>
      <Box bg={useColorModeValue("#EE3536", "gray.900")} px="4" boxShadow="lg">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          {/* Mobile Navigation Toggle */}
          <Flex display={{ base: "flex", md: "none" }} alignItems="center">
            <IconButton
              bg="transparent"
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={isOpen ? onClose : onOpen}
              aria-label="Toggle Navigation"
            />
            <IconButton
              ml="12"
              position="absolute"
              icon={<TbShoppingCart size="20px" />}
              as={ReactLink}
              to="/cart"
              variant="ghost"
              aria-label="Shopping Cart"
            />
            {cartItems.length > 0 && (
              <Text fontWeight="bold" fontStyle="italic" position="absolute" ml="74px" mt="-6" fontSize="sm">
                {cartItems.length}
              </Text>
            )}
          </Flex>

          {/* Logo and Desktop Nav */}
          <HStack spacing="6" alignItems="center">
            <Flex as={ReactLink} to="/" align="center">
              <Icon as={HiOutlineDevicePhoneMobile} h="6" w="6" color={iconColor} />
              <Text as="b" fontSize="lg" ml="1">
                RuppTechs
              </Text>
            </Flex>

            <HStack as="nav" spacing="5" display={{ base: "none", md: "flex" }}>
              {navLinks.map((link) => (
                <NavLink route={link.route} key={link.route}>
                  <Text fontWeight="medium">{link.name}</Text>
                </NavLink>
              ))}
              <Box position="relative">
                <IconButton
                  icon={<TbShoppingCart size="20px" />}
                  as={ReactLink}
                  to="/cart"
                  variant="ghost"
                  aria-label="Cart"
                />
                {cartItems.length > 0 && (
                  <Text fontWeight="bold" fontStyle="italic" position="absolute" top="-2" right="-2" fontSize="sm">
                    {cartItems.length}
                  </Text>
                )}
              </Box>
              <ColorModeToggle />
              <IconButton
                onClick={() => dispatch(toggleFavorites(!favoritesToggled))}
                icon={
                  favoritesToggled ? (
                    <MdOutlineFavorite size="20px" />
                  ) : (
                    <MdOutlineFavoriteBorder size="20px" />
                  )
                }
                variant="ghost"
                aria-label="Toggle Favorites"
              />
            </HStack>
          </HStack>

          {/* User Auth Area */}
          <Flex alignItems="center">
            {userInfo ? (
              <Menu>
                <MenuButton rounded="full" variant="link" cursor="pointer" minW="0">
                  <HStack>
                    {userInfo.googleImage ? (
                      <Image
                        borderRadius="full"
                        boxSize="40px"
                        src={userInfo.googleImage}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <BiUserCheck size="30" />
                    )}
                    <ChevronDownIcon />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <HStack px="3" py="2" justifyContent="space-between">
                    <Text fontSize="sm" as="i">
                      {userInfo.email}
                    </Text>
                    {userInfo.googleId && <FcGoogle />}
                  </HStack>
                  <Divider />
                  <MenuItem as={ReactLink} to="/order-history">
                    Order History
                  </MenuItem>
                  <MenuItem as={ReactLink} to="/profile">
                    Profile
                  </MenuItem>
                  {userInfo.isAdmin && (
                    <>
                      <MenuDivider />
                      <MenuItem as={ReactLink} to="/admin-console">
                        <MdOutlineAdminPanelSettings />
                        <Text ml="2">Admin Console</Text>
                      </MenuItem>
                    </>
                  )}
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Menu>
                <MenuButton
                  as={IconButton}
                  variant="ghost"
                  cursor="pointer"
                  icon={<BiLogInCircle size="25px" />}
                  aria-label="Login"
                />
                <MenuList>
                  <MenuItem as={ReactLink} to="/login">
                    Sign in
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as={ReactLink} to="/registration">
                    Sign up
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <Box pb="4" display={{ md: "none" }}>
            <Stack as="nav" spacing="4">
              {navLinks.map((link) => (
                <NavLink route={link.route} key={link.route}>
                  <Text fontWeight="medium">{link.name}</Text>
                </NavLink>
              ))}
            </Stack>
            <IconButton
              onClick={() => dispatch(toggleFavorites(!favoritesToggled))}
              icon={
                favoritesToggled ? (
                  <MdOutlineFavorite size="20px" />
                ) : (
                  <MdOutlineFavoriteBorder size="20px" />
                )
              }
              variant="ghost"
              aria-label="Toggle Favorites"
            />
            <ColorModeToggle />
          </Box>
        )}
      </Box>

      {/* Email Not Verified Banner */}
      {userInfo && !userInfo.active && showBanner && (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Email not verified!</AlertTitle>
          <AlertDescription>You must verify your email address.</AlertDescription>
          <Spacer />
          <CloseIcon cursor="pointer" onClick={() => setShowBanner(false)} />
        </Alert>
      )}
    </>
  );
};

export default Header;
