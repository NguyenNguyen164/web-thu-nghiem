import { Box, Button, Container, Flex, Heading, Text, VStack, Icon, HStack, Divider, SimpleGrid } from '@chakra-ui/react';
import { FiCheckCircle, FiShoppingBag, FiMessageSquare, FiHome, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  // In a real app, you would get the order details from the URL or state
  const orderNumber = '#' + Math.floor(100000 + Math.random() * 900000);
  
  return (
    <Container maxW="container.lg" py={16}>
      <VStack spacing={8} textAlign="center">
        <Box p={4} bg="green.50" borderRadius="full" mb={4}>
          <Icon as={FiCheckCircle} boxSize={16} color="green.500" />
        </Box>
        
        <Heading as="h1" size="xl" color="brand.800">
          Đặt hàng thành công!
        </Heading>
        
        <Text fontSize="xl" color="gray.600" maxW="2xl">
          Cảm ơn bạn đã đặt hàng tại cửa hàng chúng tôi. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
        </Text>
        
        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm" w="100%" maxW="2xl">
          <Text fontWeight="medium" mb={4}>
            Mã đơn hàng: <Text as="span" color="accent1.600" fontWeight="bold">{orderNumber}</Text>
          </Text>
          
          <Text mb={6}>
            Chúng tôi đã gửi thông tin đơn hàng đến email của bạn. Vui lòng kiểm tra hộp thư đến hoặc thư mục spam.
          </Text>
          
          <Divider my={6} />
          
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Icon as={FiShoppingBag} boxSize={6} color="accent1.500" />
              <Box>
                <Text fontWeight="medium">Theo dõi đơn hàng</Text>
                <Text fontSize="sm" color="gray.600">Bạn có thể theo dõi trạng thái đơn hàng trong email xác nhận.</Text>
              </Box>
            </HStack>
            
            <HStack spacing={4}>
              <Icon as={FiMessageSquare} boxSize={6} color="accent1.500" />
              <Box>
                <Text fontWeight="medium">Hỗ trợ khách hàng</Text>
                <Text fontSize="sm" color="gray.600">
                  Cần hỗ trợ? Liên hệ chúng tôi qua email <Text as="span" color="accent1.600">hotro@cuahanggo.vn</Text> hoặc gọi <Text as="span" color="accent1.600">1900 1234</Text>
                </Text>
              </Box>
            </HStack>
          </VStack>
        </Box>
        
        <Flex direction={{ base: 'column', sm: 'row' }} gap={4} mt={8}>
          <Button 
            as={Link} 
            to="/" 
            colorScheme="accent1" 
            variant="outline" 
            leftIcon={<FiHome />}
            size="lg"
            _hover={{
              bg: 'accent1.50',
              transform: 'translateY(-2px)'
            }}
            transition="all 0.2s"
          >
            Về trang chủ
          </Button>
          
          <Button 
            as={Link} 
            to="/san-pham" 
            colorScheme="accent1" 
            leftIcon={<FiShoppingCart />}
            size="lg"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}
            transition="all 0.2s"
          >
            Tiếp tục mua sắm
          </Button>
        </Flex>
        
        <Box mt={12} pt={8} borderTopWidth="1px" w="100%" maxW="3xl">
          <Heading as="h2" size="md" mb={6} color="brand.800">Những điều bạn có thể làm tiếp theo</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" textAlign="center">
              <Box p={3} bg="blue.50" borderRadius="full" display="inline-block" mb={4}>
                <Icon as={FiUser} boxSize={6} color="blue.500" />
              </Box>
              <Text fontWeight="medium" mb={2}>Tạo tài khoản</Text>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Tạo tài khoản để lưu địa chỉ giao hàng, xem lịch sử đơn hàng và nhiều tiện ích khác.
              </Text>
              <Button size="sm" colorScheme="blue" variant="link">Đăng ký ngay</Button>
            </Box>
            
            <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" textAlign="center">
              <Box p={3} bg="green.50" borderRadius="full" display="inline-block" mb={4}>
                <Icon as={FiShoppingBag} boxSize={6} color="green.500" />
              </Box>
              <Text fontWeight="medium" mb={2}>Theo dõi đơn hàng</Text>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Kiểm tra tình trạng đơn hàng của bạn bất cứ lúc nào với mã đơn hàng và email.
              </Text>
              <Button size="sm" colorScheme="green" variant="link">Theo dõi đơn hàng</Button>
            </Box>
            
            <Box p={6} bg="white" borderRadius="lg" boxShadow="sm" textAlign="center">
              <Box p={3} bg="purple.50" borderRadius="full" display="inline-block" mb={4}>
                <Icon as={FiMessageSquare} boxSize={6} color="purple.500" />
              </Box>
              <Text fontWeight="medium" mb={2}>Liên hệ hỗ trợ</Text>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Bạn có câu hỏi về đơn hàng? Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ.
              </Text>
              <Button size="sm" colorScheme="purple" variant="link">Liên hệ ngay</Button>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default OrderSuccessPage;
