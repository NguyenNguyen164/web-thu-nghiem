import { Box, Container, Grid, Text, Heading, Badge, Divider, VStack, HStack, Button, useToast } from '@chakra-ui/react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiArrowLeft, FiTruck, FiShield, FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductGallery from '../components/ProductGallery';
import type { Product } from '../types/product';

const ProductDetailPage = () => {
  const { product } = useLoaderData() as { product: Product };
  const navigate = useNavigate();
  const toast = useToast();

  // Convert price to VND for display
  const price = Math.round(product.price_AUD * 17000);
  const compareAtPrice = product.compare_at_price_AUD 
    ? Math.round(product.compare_at_price_AUD * 17000)
    : undefined;

  const formatPrice = (value: number | undefined) => {
    if (value === undefined) return 'Liên hệ';
    
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const isOnSale = compareAtPrice && compareAtPrice > price;
  const discountPercent = isOnSale && compareAtPrice && price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add the product to the cart
    addItem({
      sku: product.id, // Using product ID as SKU
      name: product.title,
      slug: `san-pham/${product.id}`,
      image: product.images?.main || '',
      unitPrice: {
        amount: product.price_AUD,
        currency: 'VND'
      },
      qty: 1
    });
    
    // Show success message
    toast({
      title: 'Đã thêm vào giỏ hàng',
      description: `${product.title} đã được thêm vào giỏ hàng`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    });
    
    // Optionally navigate to cart page
    // Uncomment the line below if you want to navigate to cart after adding
    // navigate('/gio-hang');
  };


  return (
    <Container maxW="container.xl" py={10}>
      <Button 
        variant="ghost" 
        leftIcon={<FiArrowLeft />} 
        mb={6} 
        onClick={() => navigate(-1)}
        _hover={{ bg: 'gray.50' }}
      >
        Quay lại
      </Button>

      <Grid templateColumns={{ base: '1fr', lg: '1.2fr 1fr' }} gap={10}>
        {/* Product Gallery */}
        <Box as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: '0.5s' }}>
          <ProductGallery 
            images={product.images} 
            altBase={product.title}
          />
        </Box>

        {/* Product Info */}
        <VStack align="stretch" spacing={6}>
          <Box>
            {isOnSale && discountPercent > 0 && (
              <Badge colorScheme="red" fontSize="sm" mb={3} px={2} py={1} borderRadius="md">
                Giảm {discountPercent}%
              </Badge>
            )}
            <Heading as="h1" size="xl" mb={3} color="brand.800" lineHeight="tall">
              {product.title}
            </Heading>
            
            {/* Price */}
            <Box mb={6}>
              <HStack spacing={4} align="baseline">
                <Text as="span" fontSize="2xl" fontWeight="bold" color="accent1.600">
                  {formatPrice(price)}
                </Text>
                {isOnSale && compareAtPrice && (
                  <Text textDecoration="line-through" color="gray.500" fontSize="lg">
                    {formatPrice(compareAtPrice)}
                  </Text>
                )}
              </HStack>
              <Text color="green.600" fontSize="sm" mt={1}>
                Đã bao gồm VAT
              </Text>
            </Box>

            {/* Short Description */}
            <Text color="gray.700" lineHeight="tall" mb={6}>
              {product.short_description}
            </Text>

            {/* Features */}
            <VStack align="stretch" spacing={3} mb={6}>
              <HStack>
                <Box color="accent1.500">
                  <FiTruck size={20} />
                </Box>
                <Text fontSize="sm">Miễn phí vận chuyển cho đơn hàng từ 5 triệu</Text>
              </HStack>
              <HStack>
                <Box color="accent1.500">
                  <FiShield size={20} />
                </Box>
                <Text fontSize="sm">Bảo hành 24 tháng</Text>
              </HStack>
              <HStack>
                <Box color="accent1.500">
                  <FiTag size={20} />
                </Box>
                <Text fontSize="sm">Giá tốt nhất thị trường</Text>
              </HStack>
            </VStack>
          </Box>

          {/* Add to Cart */}
          <Box>
            <Button
              leftIcon={<FiShoppingCart />}
              colorScheme="accent1"
              size="lg"
              w="full"
              py={6}
              onClick={handleAddToCart}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Thêm vào giỏ hàng
            </Button>
          </Box>

          <Divider />

          {/* Product Attributes */}
          {product.attributes && (
            <Box>
              <Heading as="h3" size="md" mb={4} color="brand.800">
                Thông số kỹ thuật
              </Heading>
              <VStack align="stretch" spacing={3}>
                {/* Material */}
                {product.attributes.material && (
                  <HStack justify="space-between" pb={2} borderBottomWidth="1px">
                    <Text fontWeight="medium" color="gray.600">Chất liệu</Text>
                    <Text>{product.attributes.material}</Text>
                  </HStack>
                )}
                
                {/* Dimensions */}
                {product.attributes.dimensions_cm && (
                  <HStack justify="space-between" pb={2} borderBottomWidth="1px">
                    <Text fontWeight="medium" color="gray.600">Kích thước (cm)</Text>
                    <VStack align="end" spacing={1}>
                      <Text>Dài: {product.attributes.dimensions_cm.width} cm</Text>
                      <Text>Rộng: {product.attributes.dimensions_cm.depth} cm</Text>
                      <Text>Cao: {product.attributes.dimensions_cm.height} cm</Text>
                    </VStack>
                  </HStack>
                )}
                
                {/* Other attributes */}
                {Object.entries(product.attributes)
                  .filter(([key]) => !['material', 'dimensions_cm'].includes(key))
                  .map(([key, value]) => (
                    <HStack key={key} justify="space-between" pb={2} borderBottomWidth="1px">
                      <Text fontWeight="medium" color="gray.600">
                        {key.replace(/_/g, ' ')}
                      </Text>
                      <Text textAlign="right">{String(value)}</Text>
                    </HStack>
                  ))}
              </VStack>
            </Box>
          )}
        </VStack>
      </Grid>

      {/* Product Description - You can add more sections here */}
      <Box mt={16}>
        <Heading as="h2" size="lg" mb={4} color="brand.800">
          Mô tả chi tiết
        </Heading>
        <Box 
          bg="white" 
          p={6} 
          borderRadius="lg" 
          boxShadow="sm"
        >
          <Text>{product.short_description || 'Không có mô tả chi tiết.'}</Text>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
