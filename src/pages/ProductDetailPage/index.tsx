import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box, Container, Heading, Text, Stack, HStack, Button, useToast, 
  Spinner, Flex, useBreakpointValue, IconButton, SimpleGrid, 
  Divider, VStack, Badge, Image, Tabs, TabList, TabPanels, 
  Tab, TabPanel, List, ListItem, ListIcon, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, 
  ModalCloseButton, Wrap, WrapItem, Tooltip, AspectRatio
} from '@chakra-ui/react';
import { 
  FiArrowLeft, FiShoppingCart, FiHeart, FiShare2, FiArrowUp,
  FiCheck, FiTruck, FiShield, FiCreditCard, FiTag, FiInfo,
  FiTruck as FiTruckIcon, FiCheckCircle, FiRefreshCw
} from 'react-icons/fi';
import { fetchProductById, fetchRelatedProducts } from '../../services/productService';
import type { Product } from '../../types/product';
import ProductCard from '../../components/ProductCard';

// Price formatter helper
const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(price);

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProductData = useCallback(async () => {
    if (!id) {
      setError('Không tìm thấy ID sản phẩm');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const productData = await fetchProductById(id);
      setProduct(productData);

      if (productData?.category_ids?.[0]) {
        const related = await fetchRelatedProducts(id, productData.category_ids[0]);
        setRelatedProducts(related);
      } else {
        setRelatedProducts([]);
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Không thể tải thông tin sản phẩm');
      toast({
        title: 'Lỗi',
        description: 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    loadProductData();
  }, [loadProductData]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      // TODO: Implement add to cart logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: 'Đã thêm vào giỏ hàng',
        description: `${product.title} (x${quantity}) đã được thêm vào giỏ hàng`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    onOpen();
  };

  const productImages = product ? [
    product.image || '/images/placeholder.jpg', 
    ...(Array.isArray(product.images) ? product.images : [])
  ].filter(Boolean) : [];

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={12}>
        <Flex justify="center" align="center" minH="50vh">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={12} textAlign="center">
        <Heading size="lg" mb={4} color="red.500">Đã xảy ra lỗi</Heading>
        <Text mb={6} color="gray.600">{error}</Text>
        <Button leftIcon={<FiArrowLeft />} colorScheme="blue" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxW="container.xl" py={12} textAlign="center">
        <Heading size="lg" mb={4} color="gray.700">Không tìm thấy sản phẩm</Heading>
        <Text mb={6} color="gray.600">Xin lỗi, chúng tôi không thể tìm thấy sản phẩm bạn yêu cầu.</Text>
        <Button leftIcon={<FiArrowLeft />} colorScheme="blue" onClick={() => navigate('/')}>
          Về trang chủ
        </Button>
      </Container>
    );
  }

  const isOnSale = product.compare_at_price && product.compare_at_price > (product.price || 0);
  const discountPercent = isOnSale && product.compare_at_price
    ? Math.round(((product.compare_at_price - (product.price || 0)) / product.compare_at_price) * 100)
    : 0;

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        {/* Breadcrumb */}
        <HStack mb={6} spacing={2} fontSize="sm" color="gray.600">
          <Button 
            variant="link" 
            colorScheme="blue" 
            leftIcon={<FiArrowLeft />} 
            onClick={() => navigate(-1)}
            p={0}
            height="auto"
            _hover={{ textDecoration: 'underline' }}
          >
            Quay lại
          </Button>
          <Text>/</Text>
          <Button 
            variant="link" 
            colorScheme="blue" 
            onClick={() => navigate('/')}
            p={0}
            height="auto"
            _hover={{ textDecoration: 'underline' }}
          >
            Trang chủ
          </Button>
          <Text>/</Text>
          {product.categories?.[0] && (
            <Button 
              variant="link" 
              colorScheme="blue" 
              onClick={() => navigate(`/danh-muc/${product.categories?.[0]}`)}
              p={0}
              height="auto"
              _hover={{ textDecoration: 'underline' }}
            >
              {product.categories?.[0]}
            </Button>
          )}
          <Text>/</Text>
          <Text fontWeight="medium">{product.title}</Text>
        </HStack>

        {/* Product Main Section */}
        <Box bg="white" borderRadius="lg" shadow="sm" p={{ base: 4, md: 6 }} mb={8}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* Product Images */}
            <Box>
              <AspectRatio ratio={1} maxW="100%" borderRadius="md" overflow="hidden" mb={4}>
                <Image 
                  src={productImages[currentImageIndex] || '/images/placeholder.jpg'}
                  alt={product.title}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  cursor="pointer"
                  onClick={() => handleImageClick(productImages[currentImageIndex])}
                />
              </AspectRatio>
              
              {/* Thumbnails */}
              {productImages.length > 1 && (
                <HStack spacing={2} overflowX="auto" py={2}>
                  {productImages.map((img, index) => (
                    <Box
                      key={index}
                      w="60px"
                      h="60px"
                      borderRadius="md"
                      overflow="hidden"
                      borderWidth={currentImageIndex === index ? '2px' : '1px'}
                      borderColor={currentImageIndex === index ? 'blue.500' : 'gray.200'}
                      cursor="pointer"
                      flexShrink={0}
                      onClick={() => setCurrentImageIndex(index)}
                      _hover={{ borderColor: 'blue.300' }}
                    >
                      <Image 
                        src={img} 
                        alt={`${product.title} ${index + 1}`}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    </Box>
                  ))}
                </HStack>
              )}
              
              {/* Share and Wishlist */}
              <HStack mt={4} spacing={4} color="gray.600">
                <Button 
                  leftIcon={<FiShare2 />} 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: 'Đã sao chép liên kết',
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    });
                  }}
                >
                  Chia sẻ
                </Button>
                <Button leftIcon={<FiHeart />} variant="outline" size="sm">
                  Yêu thích
                </Button>
              </HStack>
            </Box>

            {/* Product Info */}
            <Box>
              <Box mb={4}>
                {isOnSale && (
                  <Badge colorScheme="red" px={2} py={1} borderRadius="md" mb={2}>
                    Giảm {discountPercent}%
                  </Badge>
                )}
                <Heading as="h1" size="xl" mb={2} color="gray.800">
                  {product.title}
                </Heading>
                <Text color="gray.500" fontSize="sm" mb={4}>
                  Mã sản phẩm: {product.id}
                </Text>
                
                <Box bg="blue.50" p={4} borderRadius="md" mb={4}>
                  <Text fontSize="xl" color="red.600" fontWeight="bold" mb={1}>
                    {formatPrice(product.price || 0)}
                  </Text>
                  {isOnSale && (
                    <Text as="s" color="gray.500" fontSize="sm">
                      {formatPrice(product.compare_at_price || 0)}
                    </Text>
                  )}
                  {product.attributes?.in_stock ? (
                    <HStack color="green.600" mt={1}>
                      <FiCheckCircle />
                      <Text fontSize="sm" fontWeight="500">Còn hàng</Text>
                    </HStack>
                  ) : (
                    <HStack color="red.500" mt={1}>
                      <FiInfo />
                      <Text fontSize="sm" fontWeight="500">Tạm hết hàng</Text>
                    </HStack>
                  )}
                </Box>
                
                <Text color="gray.700" mb={6} whiteSpace="pre-line">
                  {product.short_description || product.description || 'Không có mô tả chi tiết.'}
                </Text>
                
                {/* Quantity Selector */}
                <HStack mb={6}>
                  <Text fontWeight="medium">Số lượng:</Text>
                  <HStack borderWidth="1px" borderRadius="md" px={2}>
                    <IconButton 
                      aria-label="Giảm số lượng"
                      icon={<Text>-</Text>} 
                      size="sm"
                      variant="ghost"
                      isDisabled={quantity <= 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    />
                    <Text w="40px" textAlign="center">{quantity}</Text>
                    <IconButton 
                      aria-label="Tăng số lượng"
                      icon={<Text>+</Text>} 
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(quantity + 1)}
                    />
                  </HStack>
                  <Text color="gray.500" fontSize="sm">
                    {product.attributes?.in_stock ? `${product.attributes.in_stock} sản phẩm có sẵn` : ''}
                  </Text>
                </HStack>
                
                {/* Action Buttons */}
                <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mb={6}>
                  <Button 
                    colorScheme="blue" 
                    size="lg" 
                    leftIcon={<FiShoppingCart />}
                    onClick={handleAddToCart}
                    isLoading={isAddingToCart}
                    loadingText="Đang thêm..."
                    isDisabled={!product.attributes?.in_stock}
                    flex={1}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button 
                    colorScheme="green" 
                    size="lg"
                    variant="outline"
                    flex={1}
                    isDisabled={!product.attributes?.in_stock}
                  >
                    Mua ngay
                  </Button>
                </Stack>
                
                {/* Highlights */}
                <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
                  <List spacing={2}>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FiTruck} color="green.500" />
                        <Text>Miễn phí vận chuyển cho đơn hàng từ 5.000.000đ</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FiShield} color="green.500" />
                        <Text>Bảo hành chính hãng 12 tháng</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FiCreditCard} color="green.500" />
                        <Text>Thanh toán khi nhận hàng hoặc trả góp 0%</Text>
                      </HStack>
                    </ListItem>
                  </List>
                </Box>
              </Box>
              
              {/* Categories and Tags */}
              <Box borderTopWidth="1px" pt={4}>
                <HStack spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={1}>Danh mục:</Text>
                    <Wrap>
                      {product.categories?.map((cat, index) => (
                        <WrapItem key={index}>
                          <Button 
                            size="xs" 
                            variant="outline" 
                            rightIcon={<FiArrowUp style={{ transform: 'rotate(45deg)' }} />}
                            onClick={() => navigate(`/danh-muc/${cat}`)}
                          >
                            {cat}
                          </Button>
                        </WrapItem>
                      )) || <Text fontSize="sm">Không có danh mục</Text>}
                    </Wrap>
                  </Box>
                </HStack>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
        
        {/* Product Tabs */}
        <Box bg="white" borderRadius="lg" shadow="sm" p={{ base: 4, md: 6 }} mb={8}>
          <Tabs variant="enclosed">
            <TabList>
              <Tab _selected={{ color: 'blue.500', borderBottom: '2px solid', borderColor: 'blue.500' }}>
                Mô tả sản phẩm
              </Tab>
              <Tab _selected={{ color: 'blue.500', borderBottom: '2px solid', borderColor: 'blue.500' }}>
                Thông số kỹ thuật
              </Tab>
              <Tab _selected={{ color: 'blue.500', borderBottom: '2px solid', borderColor: 'blue.500' }}>
                Chính sách bảo hành
              </Tab>
            </TabList>
            
            <TabPanels mt={4}>
              <TabPanel px={0}>
                <Box dangerouslySetInnerHTML={{ __html: product.description || 'Không có mô tả chi tiết.' }} />
              </TabPanel>
              <TabPanel px={0}>
                {product.attributes ? (
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {Object.entries(product.attributes).map(([key, value]) => (
                      <Box key={key}>
                        <Text fontWeight="medium" color="gray.700">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                        </Text>
                        <Text color="gray.600">{String(value) || 'Không có thông tin'}</Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text>Không có thông số kỹ thuật.</Text>
                )}
              </TabPanel>
              <TabPanel px={0}>
                <VStack align="stretch" spacing={4}>
                  <Box>
                    <HStack color="blue.600" mb={2}>
                      <FiShield />
                      <Heading size="md">Chính sách bảo hành</Heading>
                    </HStack>
                    <List spacing={2}>
                      <ListItem>
                        <HStack align="flex-start">
                          <ListIcon as={FiCheck} color="green.500" mt={1} />
                          <Text>Bảo hành chính hãng 12 tháng</Text>
                        </HStack>
                      </ListItem>
                      <ListItem>
                        <HStack align="flex-start">
                          <ListIcon as={FiCheck} color="green.500" mt={1} />
                          <Text>Hỗ trợ kỹ thuật trọn đời sản phẩm</Text>
                        </HStack>
                      </ListItem>
                      <ListItem>
                        <HStack align="flex-start">
                          <ListIcon as={FiCheck} color="green.500" mt={1} />
                          <Text>Đổi trả trong vòng 7 ngày nếu có lỗi từ nhà sản xuất</Text>
                        </HStack>
                      </ListItem>
                    </List>
                  </Box>
                  
                  <Divider my={2} />
                  
                  <Box>
                    <HStack color="blue.600" mb={2}>
                      <FiTruckIcon />
                      <Heading size="md">Chính sách giao hàng</Heading>
                    </HStack>
                    <List spacing={2}>
                      <ListItem>
                        <HStack align="flex-start">
                          <ListIcon as={FiCheck} color="green.500" mt={1} />
                          <Text>Miễn phí vận chuyển cho đơn hàng từ 5.000.000đ</Text>
                        </HStack>
                      </ListItem>
                      <ListItem>
                        <HStack align="flex-start">
                          <ListIcon as={FiCheck} color="green.500" mt={1} />
                          <Text>Giao hàng toàn quốc</Text>
                        </HStack>
                      </ListItem>
                      <ListItem>
                        <HStack align="flex-start">
                          <ListIcon as={FiCheck} color="green.500" mt={1} />
                          <Text>Nhận hàng và thanh toán tại nhà</Text>
                        </HStack>
                      </ListItem>
                    </List>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box mb={8}>
            <Heading size="lg" mb={6} color="gray.800">Sản phẩm liên quan</Heading>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
              {relatedProducts.map((item) => (
                <ProductCard 
                  key={item.id} 
                  product={item} 
                  onAddToCart={(e) => {
                    e.preventDefault();
                    // Handle add to cart
                  }}
                />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
      
      {/* Image Preview Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{product.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Image 
              src={selectedImage} 
              alt={product.title}
              w="100%"
              maxH="80vh"
              objectFit="contain"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      
      {/* Back to top button */}
      <Box 
        position="fixed" 
        bottom="40px" 
        right="40px" 
        zIndex={10}
        display={{ base: 'none', md: 'block' }}
      >
        <Tooltip label="Lên đầu trang" placement="left">
          <Button 
            colorScheme="blue" 
            size="lg" 
            isRound 
            boxShadow="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <FiArrowUp />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
