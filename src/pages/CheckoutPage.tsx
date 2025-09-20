import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Text, VStack, HStack, Divider, useToast, Radio, RadioGroup, Stack, Textarea, Checkbox, Icon } from '@chakra-ui/react';
import { FiArrowLeft, FiCreditCard, FiTruck, FiMapPin, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock cart data
  const cartItems = [
    {
      id: '1',
      title: 'Bàn Ăn Gỗ Sồi Tự Nhiên',
      price_AUD: 5990000,
      quantity: 1,
      image: '/products/ban-an-go-soi/thumb.jpg'
    },
    {
      id: '2',
      title: 'Ghế Gỗ Phong Cách Bắc Âu',
      price_AUD: 1290000,
      quantity: 2,
      image: '/products/ghe-go-phong-cach-bac-au/thumb.jpg'
    }
  ];
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price_AUD * item.quantity), 0);
  const shippingFee = 100000; // Example shipping fee
  const total = subtotal + shippingFee;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Đặt hàng thành công!',
        description: 'Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dat-hang-thanh-cong');
    }, 2000);
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Button 
        as={Link} 
        to="/gio-hang" 
        leftIcon={<FiArrowLeft />} 
        variant="ghost" 
        mb={6}
        _hover={{
          bg: 'gray.50',
          transform: 'translateX(-2px)'
        }}
        transition="all 0.2s"
      >
        Quay lại giỏ hàng
      </Button>
      
      <Heading as="h1" size="xl" mb={8} color="brand.800">Thanh toán</Heading>
      
      <form onSubmit={handleSubmit}>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
          {/* Billing & Shipping */}
          <Box flex={2}>
            <Box 
              bg="white" 
              borderRadius="lg" 
              boxShadow="sm" 
              p={6} 
              mb={6}
            >
              <Heading as="h2" size="md" mb={6} color="brand.800" display="flex" alignItems="center">
                <Icon as={FiUser} mr={2} /> Thông tin khách hàng
              </Heading>
              
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Họ và tên</FormLabel>
                  <Input 
                    type="text" 
                    placeholder="Nhập họ và tên" 
                    size="lg"
                    focusBorderColor="accent1.500"
                  />
                </FormControl>
                
                <HStack width="100%" spacing={4}>
                  <FormControl isRequired flex={1}>
                    <FormLabel>Số điện thoại</FormLabel>
                    <Input 
                      type="tel" 
                      placeholder="Nhập số điện thoại" 
                      size="lg"
                      focusBorderColor="accent1.500"
                    />
                  </FormControl>
                  
                  <FormControl isRequired flex={1}>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      type="email" 
                      placeholder="Nhập email" 
                      size="lg"
                      focusBorderColor="accent1.500"
                    />
                  </FormControl>
                </HStack>
              </VStack>
            </Box>
            
            <Box 
              bg="white" 
              borderRadius="lg" 
              boxShadow="sm" 
              p={6}
              mb={6}
            >
              <Heading as="h2" size="md" mb={6} color="brand.800" display="flex" alignItems="center">
                <Icon as={FiMapPin} mr={2} /> Địa chỉ giao hàng
              </Heading>
              
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select 
                    placeholder="Chọn tỉnh/thành phố" 
                    size="lg"
                    focusBorderColor="accent1.500"
                  >
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="hn">Hà Nội</option>
                    <option value="dn">Đà Nẵng</option>
                  </Select>
                </FormControl>
                
                <HStack width="100%" spacing={4}>
                  <FormControl isRequired flex={1}>
                    <FormLabel>Quận/Huyện</FormLabel>
                    <Select 
                      placeholder="Chọn quận/huyện" 
                      size="lg"
                      focusBorderColor="accent1.500"
                    >
                      <option value="q1">Quận 1</option>
                      <option value="q3">Quận 3</option>
                      <option value="q5">Quận 5</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl isRequired flex={1}>
                    <FormLabel>Phường/Xã</FormLabel>
                    <Select 
                      placeholder="Chọn phường/xã" 
                      size="lg"
                      focusBorderColor="accent1.500"
                    >
                      <option value="bnt">Bến Nghé</option>
                      <option value="bth">Bến Thành</option>
                      <option value="pnt">Phạm Ngũ Lão</option>
                    </Select>
                  </FormControl>
                </HStack>
                
                <FormControl isRequired>
                  <FormLabel>Địa chỉ cụ thể</FormLabel>
                  <Input 
                    type="text" 
                    placeholder="Số nhà, tên đường" 
                    size="lg"
                    focusBorderColor="accent1.500"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Ghi chú (tùy chọn)</FormLabel>
                  <Textarea 
                    placeholder="Ghi chú về đơn hàng, ví dụ: Thời gian giao hàng, hướng dẫn địa điểm giao hàng..." 
                    size="lg"
                    rows={4}
                    focusBorderColor="accent1.500"
                  />
                </FormControl>
              </VStack>
            </Box>
            
            <Box 
              bg="white" 
              borderRadius="lg" 
              boxShadow="sm" 
              p={6}
            >
              <Heading as="h2" size="md" mb={6} color="brand.800" display="flex" alignItems="center">
                <Icon as={FiCreditCard} mr={2} /> Phương thức thanh toán
              </Heading>
              
              <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
                <Stack spacing={4}>
                  <Box 
                    borderWidth="1px" 
                    borderRadius="md" 
                    p={4}
                    _hover={{ borderColor: 'accent1.300' }}
                    borderColor={paymentMethod === 'cod' ? 'accent1.500' : 'gray.200'}
                  >
                    <Radio value="cod" colorScheme="accent1">
                      <Box ml={3}>
                        <Text fontWeight="medium">Thanh toán khi nhận hàng (COD)</Text>
                        <Text fontSize="sm" color="gray.600">Nhận hàng và thanh toán trực tiếp</Text>
                      </Box>
                    </Radio>
                  </Box>
                  
                  <Box 
                    borderWidth="1px" 
                    borderRadius="md" 
                    p={4}
                    _hover={{ borderColor: 'accent1.300' }}
                    borderColor={paymentMethod === 'bank' ? 'accent1.500' : 'gray.200'}
                  >
                    <Radio value="bank" colorScheme="accent1">
                      <Box ml={3}>
                        <Text fontWeight="medium">Chuyển khoản ngân hàng</Text>
                        <Text fontSize="sm" color="gray.600">Chuyển khoản trực tiếp vào tài khoản ngân hàng của chúng tôi</Text>
                      </Box>
                    </Radio>
                  </Box>
                  
                  <Box 
                    borderWidth="1px" 
                    borderRadius="md" 
                    p={4}
                    _hover={{ borderColor: 'accent1.300' }}
                    borderColor={paymentMethod === 'momo' ? 'accent1.500' : 'gray.200'}
                  >
                    <Radio value="momo" colorScheme="accent1">
                      <Box ml={3}>
                        <Text fontWeight="medium">Ví điện tử MoMo</Text>
                        <Text fontSize="sm" color="gray.600">Thanh toán nhanh chóng qua ứng dụng MoMo</Text>
                      </Box>
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
              
              <Box mt={6} p={4} bg="blue.50" borderRadius="md">
                <Text fontSize="sm" color="blue.700">
                  <Icon as={FiLock} mr={2} />
                  Thông tin thanh toán của bạn sẽ được bảo mật và mã hóa.
                </Text>
              </Box>
            </Box>
          </Box>
          
          {/* Order Summary */}
          <Box flex={1}>
            <Box 
              bg="white" 
              borderRadius="lg" 
              boxShadow="sm" 
              p={6}
              position="sticky"
              top="120px"
            >
              <Heading as="h2" size="md" mb={6} color="brand.800">Đơn hàng của bạn</Heading>
              
              <VStack spacing={4} align="stretch" mb={6}>
                {cartItems.map((item) => (
                  <Flex key={item.id} justify="space-between" align="center">
                    <Flex align="center">
                      <Box 
                        w="60px" 
                        h="60px" 
                        bg="gray.100" 
                        borderRadius="md"
                        overflow="hidden"
                        mr={4}
                      >
                        <Box
                          as="img"
                          src={item.image}
                          alt={item.title}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                        />
                      </Box>
                      <Box>
                        <Text fontWeight="medium" noOfLines={1}>{item.title}</Text>
                        <Text fontSize="sm" color="gray.500">Số lượng: {item.quantity}</Text>
                      </Box>
                    </Flex>
                    <Text fontWeight="medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price_AUD * item.quantity)}
                    </Text>
                  </Flex>
                ))}
                
                <Divider my={2} />
                
                <Flex justify="space-between">
                  <Text>Tạm tính</Text>
                  <Text>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</Text>
                </Flex>
                
                <Flex justify="space-between">
                  <Text>Phí vận chuyển</Text>
                  <Text>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}</Text>
                </Flex>
                
                <Divider my={2} />
                
                <Flex justify="space-between" fontWeight="bold" fontSize="lg">
                  <Text>Tổng cộng</Text>
                  <Text color="accent1.600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                  </Text>
                </Flex>
                
                <Checkbox defaultChecked colorScheme="accent1" mt={4}>
                  Tôi đã đọc và đồng ý với các điều khoản và điều kiện của cửa hàng
                </Checkbox>
                
                <Button 
                  type="submit"
                  colorScheme="accent1" 
                  size="lg" 
                  w="100%"
                  mt={4}
                  isLoading={isSubmitting}
                  loadingText="Đang xử lý..."
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                  }}
                  transition="all 0.2s"
                >
                  Đặt hàng
                </Button>
                
                <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
                  Bằng cách nhấp vào nút "Đặt hàng", bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi.
                </Text>
              </VStack>
            </Box>
            
            <Box mt={6} p={6} bg="gray.50" borderRadius="lg">
              <VStack spacing={4} align="stretch">
                <Flex align="center">
                  <Icon as={FiTruck} color="accent1.500" mr={3} boxSize={6} />
                  <Box>
                    <Text fontWeight="medium">Miễn phí vận chuyển</Text>
                    <Text fontSize="sm" color="gray.600">Cho đơn hàng từ 3.000.000₫</Text>
                  </Box>
                </Flex>
                
                <Flex align="center">
                  <Icon as={FiCreditCard} color="accent1.500" mr={3} boxSize={6} />
                  <Box>
                    <Text fontWeight="medium">Thanh toán an toàn</Text>
                    <Text fontSize="sm" color="gray.600">Đảm bảo thông tin thanh toán của bạn</Text>
                  </Box>
                </Flex>
                
                <Flex align="center">
                  <Icon as={FiLock} color="accent1.500" mr={3} boxSize={6} />
                  <Box>
                    <Text fontWeight="medium">Bảo mật thông tin</Text>
                    <Text fontSize="sm" color="gray.600">Dữ liệu cá nhân của bạn được bảo vệ</Text>
                  </Box>
                </Flex>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </form>
    </Container>
  );
};

export default CheckoutPage;
