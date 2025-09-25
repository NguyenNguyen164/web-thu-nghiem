import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Flex, 
  Image, 
  IconButton, 
  Badge,
  HStack,
  useDisclosure,
  useBreakpointValue
} from '@chakra-ui/react';
import { FiShoppingCart, FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import SearchBar from './common/SearchBar';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { cart } = useCart();
  const navigate = useNavigate();
  const cartItemsCount = cart.lines.reduce((total, item) => total + item.qty, 0);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();
  const headerQuery = new URLSearchParams(location.search).get('q') || '';

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
      if (isMobile) {
        onToggle();
      }
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

          {/* Search Bar - Desktop */}
          <Box 
            flex="1" 
            mx={4} 
            display={{ base: 'none', md: 'block' }}
          >
            <SearchBar 
              onSearch={handleSearch}
              initialValue={headerQuery}
              placeholder="Tìm kiếm sản phẩm..."
              showButton={false}
            />
          </Box>

          {/* Mobile Search Button */}
          {!isOpen && (
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Tìm kiếm"
              icon={<FiSearch />}
              onClick={onToggle}
              variant="ghost"
              mr={2}
            />
          )}

          {/* Right side icons */}
          <HStack spacing={4}>
            {/* Mobile Search Overlay */}
            {isOpen && isMobile && (
              <Box
                position="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="white"
                zIndex={9999}
                p={4}
                display="flex"
                alignItems="center"
              >
                <Box flex={1}>
                  <SearchBar 
                    onSearch={(query) => {
                      handleSearch(query);
                      onToggle();
                    }}
                    initialValue={headerQuery}
                    placeholder="Tìm kiếm sản phẩm..."
                    showButton={true}
                    autoFocus
                  />
                </Box>
                <IconButton
                  aria-label="Đóng tìm kiếm"
                  icon={<FiX />}
                  variant="ghost"
                  onClick={onToggle}
                  ml={2}
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