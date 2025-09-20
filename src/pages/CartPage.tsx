import { Box, Button, Container, Flex, Heading, Image, Text, useToast, IconButton, Input, VStack, Divider } from '@chakra-ui/react';
import { FiPlus, FiMinus, FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fmt, mul } from '../utils/money';

const CartPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { cart, updateQty, removeItem, clear } = useCart();
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQty(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast({
      title: 'Đã xóa sản phẩm',
      status: 'success',
      duration: 2000,
      position: 'top-right'
    });
  };

  const handleClearCart = () => {
    clear();
    toast({
      title: 'Đã xóa tất cả sản phẩm',
      status: 'info',
      duration: 2000,
    });
  };

  if (!cart) {
    return (
      <Container maxW="container.xl" py={8} textAlign="center">
        <Text>Đang tải giỏ hàng...</Text>
      </Container>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <Container maxW="container.xl" py={8} textAlign="center">
        <FiShoppingCart size={64} style={{ margin: '0 auto 16px', color: '#718096' }} />
        <Heading as="h1" size="lg" mb={4}>Giỏ hàng của bạn đang trống</Heading>
        <Text color="gray.600" mb={6}>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</Text>
        <Button 
          as={Link} 
          to="/san-pham" 
          colorScheme="accent1"
          _hover={{ textDecoration: 'none' }}
        >
          Tiếp tục mua sắm
        </Button>
      </Container>
    );
  }

  // Calculate subtotal from cart lines
  const subtotal = cart.lines.reduce((sum, item) => {
    return sum + (item.unitPrice.amount * item.qty);
  }, 0);

  return (
    <Container maxW="container.xl" py={8}>
      {/* Breadcrumb */}
      <Flex align="center" mb={6} color="gray.600" fontSize="sm">
        <Box as={Link} to="/" textDecoration="none" _hover={{ textDecoration: 'underline' }}>Trang chủ</Box>
        <Text as="span" mx={2}>/</Text>
        <Text>Giỏ hàng</Text>
      </Flex>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        {/* Cart Items */}
        <Box flex={1}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading as="h1" size="lg">Giỏ hàng của bạn</Heading>
            <Text color="gray.500">{cart.lines.length} sản phẩm</Text>
          </Flex>

          <Box>
            <Box 
              display={{ base: 'none', md: 'grid' }} 
              gridTemplateColumns="2fr 1fr 1fr 1fr auto"
              gap={4}
              py={3}
              borderBottomWidth="1px"
              borderColor="gray.100"
              fontWeight="medium"
              color="gray.600"
            >
              <Text>Sản phẩm</Text>
              <Text textAlign="center">Đơn giá</Text>
              <Text textAlign="center">Số lượng</Text>
              <Text textAlign="right">Thành tiền</Text>
              <Box w={8} />
            </Box>

            {cart.lines.map((item) => (
              <Box 
                key={item.id}
                borderBottomWidth="1px"
                borderColor="gray.100"
                py={4}
              >
                <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                  <Flex flex={2} gap={4}>
                    <Box 
                      w="80px" 
                      h="80px" 
                      bg="gray.50" 
                      borderRadius="md"
                      overflow="hidden"
                      flexShrink={0}
                    >
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    </Box>
                    <Box>
                      <Text 
                        as={Link} 
                        to={`/san-pham/${item.slug || item.id}`}
                        fontWeight="medium" 
                        mb={1} 
                        noOfLines={1}
                        _hover={{ color: 'accent1.500', textDecoration: 'underline' }}
                      >
                        {item.name}
                      </Text>
                      <Text color="gray.500" fontSize="sm" mb={2}>
                        Mã SP: {item.sku}
                      </Text>
                    </Box>
                  </Flex>

                  <Box 
                    display={{ base: 'none', md: 'flex' }} 
                    alignItems="center"
                    justifyContent="center"
                    flex={1}
                  >
                    <Text>{fmt(item.unitPrice)}</Text>
                  </Box>

                  <Box 
                    display="flex" 
                    alignItems="center"
                    justifyContent={{ base: 'space-between', md: 'center' }}
                    flex={1}
                  >
                    <Flex 
                      borderWidth="1px" 
                      borderRadius="md" 
                      overflow="hidden"
                      w={{ base: '120px', md: '100px' }}
                    >
                      <IconButton 
                        icon={<FiMinus />} 
                        aria-label="Giảm số lượng"
                        size="sm"
                        borderRadius="none"
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        isDisabled={item.qty <= 1}
                      />
                      <Input 
                        type="number" 
                        value={item.qty} 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        min={1}
                        borderX="none"
                        borderRadius="none"
                        textAlign="center"
                        px={2}
                        _focus={{
                          boxShadow: 'none',
                          borderColor: 'gray.300'
                        }}
                      />
                      <IconButton 
                        icon={<FiPlus />} 
                        aria-label="Tăng số lượng"
                        size="sm"
                        borderRadius="none"
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                      />
                    </Flex>
                  </Box>

                  <Box 
                    display="flex" 
                    alignItems="center"
                    justifyContent={{ base: 'space-between', md: 'flex-end' }}
                    flex={1}
                  >
                    <Text fontWeight="medium">
                      {fmt(mul(item.unitPrice, item.qty))}
                    </Text>
                    <IconButton 
                      icon={<FiTrash2 />} 
                      aria-label="Xóa sản phẩm"
                      variant="ghost" 
                      colorScheme="red" 
                      size="sm"
                      ml={2}
                      onClick={() => handleRemoveItem(item.id)}
                    />
                  </Box>
                </Flex>
              </Box>
            ))}

            <Flex justify="space-between" mt={6}>
              <Button 
                as={Link}
                to="/san-pham"
                leftIcon={<FiArrowLeft />}
                variant="outline"
                _hover={{ textDecoration: 'none' }}
              >
                Tiếp tục mua sắm
              </Button>
              <Button 
                colorScheme="red" 
                variant="outline"
                onClick={handleClearCart}
              >
                Xóa tất cả
              </Button>
            </Flex>
          </Box>
        </Box>

        {/* Order Summary */}
        <Box w={{ base: '100%', lg: '400px' }}>
          <Box borderWidth="1px" borderRadius="lg" p={6} bg="white" boxShadow="sm">
            <Heading as="h2" size="md" mb={4}>
              Tóm tắt đơn hàng
            </Heading>
            
            <VStack spacing={3} align="stretch" mb={6}>
              <Flex justify="space-between">
                <Text color="gray.600">Tạm tính</Text>
                <Text>{fmt(cart.subtotal)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.600">Phí vận chuyển</Text>
                <Text>{fmt(cart.shipping)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.600">Thuế ({Math.round((cart.tax.amount / cart.subtotal.amount) * 100)}%)</Text>
                <Text>{fmt(cart.tax)}</Text>
              </Flex>
              <Divider />
              <Flex justify="space-between" fontSize="lg" fontWeight="bold">
                <Text>Tổng cộng</Text>
                <Text color="accent1.500">{fmt(cart.total)}</Text>
              </Flex>
            </VStack>

            <Button 
              colorScheme="accent1" 
              size="lg" 
              w="100%"
              onClick={() => navigate('/thanh-toan')}
            >
              Tiến hành thanh toán
            </Button>

            <Text mt={3} fontSize="sm" color="gray.500" textAlign="center">
              {cart.subtotal.amount >= 1000000 ? (
                <Text as="span" color="green.500">Đơn hàng của bạn được miễn phí vận chuyển</Text>
              ) : (
                `Miễn phí vận chuyển cho đơn hàng từ ${fmt({ amount: 1000000, currency: 'VND' })}`
              )}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default CartPage;
