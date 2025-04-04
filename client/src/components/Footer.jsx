import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
  Box,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

const Footer = () => (
  <Box w='100%' bg={mode("#EE3536", "gray.900")}>
    <Container as='footer' maxW='7xl'>
      <Stack
        spacing='8'
        direction={{ base: "column", md: "row" }}
        justify='space-between'
        py={{ base: "12", md: "16" }}
      >
        {/* Branding */}
        <Stack spacing={{ base: "6", md: "8" }} align='start'>
          <Flex alignItems='center'>
            <Icon as={HiOutlineDevicePhoneMobile} h='10' w='10' color={mode("black", "red.300")} />
            <Text fontSize='2xl' fontWeight='extrabold' ml={2} color={mode("black", "whiteAlpha.900")}>
              RuppTechs
            </Text>
          </Flex>
          <Text fontSize='sm' color={mode("blackAlpha.800", "whiteAlpha.700")}>
            We love phones.
          </Text>
        </Stack>

        {/* Links and subscription */}
        <Stack direction={{ base: "column-reverse", md: "column", lg: "row" }} spacing={{ base: "12", md: "8" }}>
          <Stack direction='row' spacing='8'>
            <Stack spacing='4' minW='36' flex='1'>
              <Text fontSize='sm' fontWeight='semibold' color={mode("black", "whiteAlpha.700")}>
                Product
              </Text>
              <Stack spacing='3' shouldWrapChildren>
                <Button variant='link' color={mode("black", "whiteAlpha.900")}>
                  How it works
                </Button>
                <Button variant='link' color={mode("black", "whiteAlpha.900")}>
                  Pricing
                </Button>
              </Stack>
            </Stack>
            <Stack spacing='4' minW='36' flex='1'>
              <Text fontSize='sm' fontWeight='semibold' color={mode("black", "whiteAlpha.700")}>
                Legal
              </Text>
              <Stack spacing='3' shouldWrapChildren>
                <Button variant='link' color={mode("black", "whiteAlpha.900")}>
                  Privacy
                </Button>
                <Button variant='link' color={mode("black", "whiteAlpha.900")}>
                  Terms
                </Button>
                <Button variant='link' color={mode("black", "whiteAlpha.900")}>
                  License
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* Subscribe */}
          <Stack spacing='4'>
            <Text fontSize='sm' fontWeight='semibold' color={mode("black", "whiteAlpha.700")}>
              Stay up to date
            </Text>
            <Stack spacing='4' direction={{ base: "column", sm: "row" }} maxW={{ lg: "360px" }}>
              <Input placeholder='Enter your email' type='email' required bg='white' />
              <Button
                type='submit'
                flexShrink={0}
                bg={mode("black", "red.500")}
                color='white'
                _hover={{ bg: mode("gray.800", "red.600") }}
              >
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Bottom */}
      <Divider borderColor={mode("blackAlpha.300", "gray.700")} />
      <Stack pt='8' pb='12' justify='space-between' direction={{ base: "column-reverse", md: "row" }} align='center'>
        <Text fontSize='sm' color={mode("black", "whiteAlpha.700")}>
          &copy; {new Date().getFullYear()} RuppTechs, Inc. All rights reserved.
        </Text>
        <ButtonGroup variant='ghost'>
          <IconButton as='a' href='#' icon={<FaLinkedin fontSize='1.25rem' />} color={mode("black", "white")} />
          <IconButton as='a' href='#' icon={<FaGithub fontSize='1.25rem' />} color={mode("black", "white")} />
          <IconButton as='a' href='#' icon={<FaFacebook fontSize='1.25rem' />} color={mode("black", "white")} />
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
