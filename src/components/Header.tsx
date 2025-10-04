import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Flex, 
  Image, 
  IconButton, 
  Badge,
  HStack,
  Input,
  Button,
  useColorModeValue,
  Text,
  Link,
  useDisclosure
} from '@chakra-ui/react';
import { FiShoppingCart, FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState, type KeyboardEvent } from 'react';

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { cart, itemCount } = useCart();
  const navigate = useNavigate();
  const cartItemsCount = itemCount || 0;
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery.trim();
    if (searchTerm) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchTerm)}`);
      setMobileSearchOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box>
      {/* Top Bar */}
      <Box bg="#81c784" color="white" py={2}>
        <Container maxW="container.xl" px={4}>
          <Flex justifyContent="center" alignItems="center" gap={4} fontSize="sm">
            <Text>Ưu đãi mùa Thu: Miễn phí giao hàng cho đơn từ 2.000.000đ</Text>
            <Box w="6px" h="6px" bg="rgba(255,255,255,0.5)" borderRadius="full" />
            <Text>Đổi trả trong 30 ngày</Text>
          </Flex>
        </Container>
      </Box>

      {/* Main Header */}
      <Box as="header" bg="white" borderBottom="1px solid" borderColor="gray.200" position="sticky" top={0} zIndex={10}>
        <Container maxW="container.xl" px={4}>
          <Flex h="80px" alignItems="center" justifyContent="space-between">
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

            {/* Desktop Search Bar */}
            <Flex 
              flex="1" 
              mx={{ base: 2, md: 4 }} 
              maxW="600px" 
              display={{ base: 'none', md: 'flex' }}
            >
              <Input
                type="text"
                placeholder="Tìm bàn, ghế, tủ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                bg="white"
                borderColor="gray.300"
                borderRightRadius="none"
                _focus={{
                  borderColor: '#81c784',
                  boxShadow: 'none',
                }}
                h="44px"
              />
              <Button
                bg="#81c784"
                color="white"
                _hover={{ bg: '#66bb6a' }}
                borderLeftRadius="none"
                px={6}
                h="44px"
                onClick={() => handleSearch()}
              >
                Tìm
              </Button>
            </Flex>

            <HStack spacing={4}>
              {/* Mobile Search Button */}
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Tìm kiếm"
                icon={<FiSearch />}
                variant="ghost"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              />

              {/* Cart */}
              <Box position="relative">
                <IconButton
                  as={RouterLink}
                  to="/gio-hang"
                  aria-label="Giỏ hàng"
                  icon={<FiShoppingCart size={20} />}
                  variant="ghost"
                  size="lg"
                  fontSize="20px"
                  w="44px"
                  h="44px"
                  borderRadius="full"
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  boxShadow="sm"
                />
                {cartItemsCount > 0 && (
                  <Badge
                    colorScheme="red"
                    borderRadius="full"
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    fontSize="0.7em"
                    minW="20px"
                    h="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Box>

              {/* Mobile menu button */}
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onToggle}
                icon={isOpen ? <FiX size="20px" /> : <FiMenu size="20px" />}
                variant="ghost"
                aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
              />
            </HStack>
          </Flex>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <Box py={4} display={{ base: 'block', md: 'none' }}>
              <HStack>
                <Input
                  type="text"
                  placeholder="Tìm bàn, ghế, tủ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  bg="white"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: '#81c784',
                    boxShadow: 'none',
                  }}
                  h="44px"
                />
                <Button
                  bg="#81c784"
                  color="white"
                  _hover={{ bg: '#66bb6a' }}
                  px={6}
                  h="44px"
                  onClick={() => handleSearch()}
                >
                  Tìm
                </Button>
              </HStack>
            </Box>
          )}
        </Container>

        {/* Navigation */}
        <Box borderTop="1px solid" borderColor="gray.200" bg="white" display={{ base: isOpen ? 'block' : 'none', md: 'block' }}>
          <Container maxW="container.xl" px={4}>
            <HStack as="nav" spacing={8} h="50px" overflowX="auto" className="hide-scrollbar">
              <Link as={RouterLink} to="/danh-muc/ban-go" fontWeight="600" _hover={{ textDecoration: 'underline' }}>Bàn gỗ</Link>
              <Link as={RouterLink} to="/danh-muc/ghe-stool" fontWeight="600" _hover={{ textDecoration: 'underline' }}>Ghế & Stool</Link>
              <Link as={RouterLink} to="/danh-muc/tu-ke" fontWeight="600" _hover={{ textDecoration: 'underline' }}>Tủ - Kệ</Link>
              <Link as={RouterLink} to="/danh-muc/den-go" fontWeight="600" _hover={{ textDecoration: 'underline' }}>Đèn gỗ</Link>
              <Link as={RouterLink} to="/danh-muc/phu-kien" fontWeight="600" _hover={{ textDecoration: 'underline' }}>Phụ kiện</Link>
            </HStack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;