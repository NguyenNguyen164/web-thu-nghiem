import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Flex, 
  Image, 
  IconButton, 
  Badge,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Kbd,
  useDisclosure
} from '@chakra-ui/react';
import { FiShoppingCart, FiMenu, FiSearch } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import type { KeyboardEvent } from 'react';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const cartItemsCount = cart.lines.reduce((total, item) => total + item.qty, 0);

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <Box as="header" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
      <Container maxW="container.xl" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <RouterLink to="/">
            <Image
              src="/logo.png"
              alt="Logo"
              h="40px"
              w="auto"
              objectFit="contain"
            />
          </RouterLink>

          {/* Search Bar */}
          <Box flex="1" maxW="2xl" mx={{ base: 4, md: 8 }}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.400" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                bg="white"
                borderColor="gray.200"
                _hover={{ borderColor: 'gray.300' }}
                _focus={{
                  borderColor: 'accent1.500',
                  boxShadow: '0 0 0 1px var(--chakra-colors-accent1-500)'
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                pr="4.5rem"
                size="lg"
              />
              <InputRightElement width="auto" mr={2} pointerEvents="none">
                <Kbd>Enter</Kbd>
              </InputRightElement>
            </InputGroup>
          </Box>

          {/* Right side icons */}
          <HStack spacing={4}>
              {/* Cart Button */}
              <Box position="relative">
                <IconButton
                  as={RouterLink}
                  to="/gio-hang"
                  aria-label="Giỏ hàng"
                  icon={<>
                    <FiShoppingCart size="20px" />
                    {cartItemsCount > 0 && (
                      <Badge
                        position="absolute"
                        top="0"
                        right="0"
                        colorScheme="red"
                        borderRadius="full"
                        fontSize="xs"
                        transform="translate(25%, -25%)"
                      >
                        {cartItemsCount}
                      </Badge>
                    )}
                  </>}
                  variant="ghost"
                  colorScheme="accent1"
                  _hover={{ bg: 'gray.100' }}
                  position="relative"
                  size="md"
                />
            </Box>

            {/* Mobile menu button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onToggle}
              icon={isOpen ? <FiMenu size="20px" /> : <FiMenu size="20px" />}
              variant="ghost"
              aria-label="Mở menu"
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
