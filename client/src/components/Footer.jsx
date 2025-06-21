import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';

const Footer = () => {
  const bgColor = useColorModeValue('#EE3536', 'gray.900');
  const textColor = useColorModeValue('black', 'whiteAlpha.900');
  const subTextColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.700');
  const sectionHeading = useColorModeValue('black', 'whiteAlpha.700');
  const dividerColor = useColorModeValue('blackAlpha.300', 'gray.700');
  const btnBg = useColorModeValue('black', 'red.500');
  const btnHover = useColorModeValue('gray.800', 'red.600');
  const iconColor = useColorModeValue('black', 'white');

  return (
    <Box w="100%" bg={bgColor}>
      <Container as="footer" maxW="7xl">
        <Stack
          spacing="8"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          py={{ base: '12', md: '16' }}
        >
          {/* Branding */}
          <Stack spacing={{ base: 6, md: 8 }} align="start">
            <Flex align="center">
              <Icon as={HiOutlineDevicePhoneMobile} h="10" w="10" color={textColor} />
              <Text fontSize="2xl" fontWeight="extrabold" ml={2} color={textColor}>
                RuppTechs
              </Text>
            </Flex>
            <Text fontSize="sm" color={subTextColor}>
              We love phones.
            </Text>
          </Stack>

          {/* Links + Subscribe */}
          <Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: 12, md: 8 }}>
            <Stack direction="row" spacing="8">
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" color={sectionHeading}>
                  Product
                </Text>
                <Stack spacing="3">
                  <Button variant="link" color={textColor}>
                    How it works
                  </Button>
                  <Button variant="link" color={textColor}>
                    Pricing
                  </Button>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" color={sectionHeading}>
                  Legal
                </Text>
                <Stack spacing="3">
                  <Button variant="link" color={textColor}>
                    Privacy
                  </Button>
                  <Button variant="link" color={textColor}>
                    Terms
                  </Button>
                  <Button variant="link" color={textColor}>
                    License
                  </Button>
                </Stack>
              </Stack>
            </Stack>

            {/* Subscribe */}
            <Stack spacing="4">
              <Text fontSize="sm" fontWeight="semibold" color={sectionHeading}>
                Stay up to date
              </Text>
              <Stack spacing="4" direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
                <Input placeholder="Enter your email" type="email" required bg="white" />
                <Button type="submit" flexShrink={0} bg={btnBg} color="white" _hover={{ bg: btnHover }}>
                  Subscribe
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* Bottom */}
        <Divider borderColor={dividerColor} />
        <Stack
          pt="8"
          pb="12"
          justify="space-between"
          direction={{ base: 'column-reverse', md: 'row' }}
          align="center"
        >
          <Text fontSize="sm" color={sectionHeading}>
            &copy; {new Date().getFullYear()} RuppTechs, Inc. All rights reserved.
          </Text>
          <ButtonGroup variant="ghost">
            <IconButton as="a" href="#" icon={<FaLinkedin fontSize="1.25rem" />} color={iconColor} />
            <IconButton as="a" href="#" icon={<FaGithub fontSize="1.25rem" />} color={iconColor} />
            <IconButton as="a" href="#" icon={<FaFacebook fontSize="1.25rem" />} color={iconColor} />
          </ButtonGroup>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
