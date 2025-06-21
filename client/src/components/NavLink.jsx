import { Button } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const NavLink = ({ children, route }) => (
  <Button
    as={ReactLink}
    to={route}
    variant="ghost"
    rounded="md"
    px="3"
    py="2"
    fontWeight="medium"
    _hover={{ bg: "gray.100", textDecoration: "none" }}
    aria-label={typeof children === "string" ? children : "Navigation link"}
  >
    {children}
  </Button>
);

export default NavLink;
