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
  useDisclosure,
  useBreakpointValue,
  Button
} from '@chakra-ui/react';
import { FiShoppingCart, FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const cartItemsCount = cart.lines.reduce((total, item) => total + item.qty, 0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      if (isMobile) {
        setSearchQuery('');
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Auto-focus search input on mobile when search is opened
  useEffect(() => {
    if (isOpen && isMobile) {
      const searchInput = document.getElementById('search-input');
      searchInput?.focus();
    }
  }, [isOpen, isMobile]);

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

          {/* Search Bar - Desktop */}
          <Box 
            flex="1" 
            maxW="2xl" 
            mx={4} 
            display={{ base: 'none', md: 'block' }}
          >
            <form onSubmit={handleSearch}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  bg="white"
                  borderColor="gray.200"
                  _hover={{ borderColor: 'gray.300' }}
                  _focus={{
                    borderColor: 'blue.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
                  }}
                  pr="4.5rem"
                />
                <InputRightElement width="auto" mr={1}>
                  <Kbd>Enter</Kbd>
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>

          {/* Mobile Search Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label="Tìm kiếm"
            icon={<FiSearch />}
            onClick={onToggle}
            variant="ghost"
            mr={2}
          />

          {/* Right side icons */}
          <HStack spacing={4}>
            {/* Mobile Search Overlay */}
            {isOpen && isMobile && (
              <Box
                position="fixed"
                top="0"
                left="0"
                right="0"
                bg="white"
                p={4}
                zIndex="overlay"
                boxShadow="md"
                display="flex"
                alignItems="center"
              >
                <form onSubmit={handleSearch} style={{ flex: 1 }}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiSearch color="gray.400" />
                    </InputLeftElement>
                    <Input
                      id="search-input"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      bg="white"
                      borderColor="gray.200"
                      _hover={{ borderColor: 'gray.300' }}
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
                      }}
                      pr="4.5rem"
                    />
                    <InputRightElement width="auto" mr={1}>
                      <Button 
                        size="sm" 
                        colorScheme="blue" 
                        h="1.75rem" 
                        onClick={handleSearch}
                      >
                        Tìm
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </form>
                <IconButton
                  aria-label="Đóng tìm kiếm"
                  icon={<FiX />}
                  onClick={onToggle}
                  ml={2}
                  variant="ghost"
                />
              </Box>
            )}

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
