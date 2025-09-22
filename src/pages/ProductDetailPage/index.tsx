import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Heading, Text, Stack, HStack, Button, useToast, Spinner, Flex,
  useBreakpointValue, IconButton, SimpleGrid, Divider, VStack, Badge, Image
} from '@chakra-ui/react';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiShare2, FiArrowUp } from 'react-icons/fi';
import { fetchProductById, fetchRelatedProducts } from '../../services/productService';
import type { Product } from '../../types/product';
import ProductGallery from '../../components/products/ProductGallery';
import RelatedProducts from '../../components/products/RelatedProducts';
import PriceTag from '../../components/ui/PriceTag';
import QuantitySelector from '../../components/ui/QuantitySelector';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = useCallback((productId: string) => {
    toast({
      title: 'Đã thêm vào giỏ hàng',
      description: `Đã thêm ${quantity} sản phẩm vào giỏ hàng`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    // TODO: Add to cart logic here
  }, [quantity, toast]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: `Xem sản phẩm ${product?.title} tại Nguyen Furniture`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Đã sao chép liên kết',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [product, toast]);

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={12}>
        <Flex justify="center" align="center" minH="50vh">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Flex>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxW="container.xl" py={12} textAlign="center">
        <Heading size="lg" mb={4} color="red.500">
          {error || 'Không tìm thấy sản phẩm'}
        </Heading>
        <Text mb={6} color="gray.600">
          {error ? 'Vui lòng thử lại sau.' : 'Xin lỗi, chúng tôi không thể tìm thấy sản phẩm bạn yêu cầu.'}
        </Text>
        <Button leftIcon={<FiArrowLeft />} colorScheme="blue" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Container>
    );
  }

  const productImages = [product.image || '/placeholder-product.jpg', ...(product.images || [])].filter(Boolean) as string[];

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <Button leftIcon={<FiArrowLeft />} variant="ghost" mb={6} onClick={() => navigate(-1)}>
          Quay lại
        </Button>

        <Box bg="white" borderRadius="xl" overflow="hidden" boxShadow="sm" mb={8}>
          <Stack direction={{ base: 'column', lg: 'row' }} spacing={8} p={{ base: 4, md: 8 }}>
            {/* Product Images */}
            <Box flex={1}>
              <ProductGallery images={productImages} title={product.title} />
            </Box>

            {/* Product Info */}
            <Box flex={1} pl={{ lg: 4 }}>
              <Heading as="h1" size="xl" mb={4} color="gray.800" fontWeight="semibold">
                {product.title}
              </Heading>

              <HStack spacing={4} mb={6}>
                {product.attributes?.material && (
                  <HStack>
                    <Text color="gray.600" fontWeight="medium">Chất liệu:</Text>
                    <Text color="gray.700">{product.attributes.material}</Text>
                  </HStack>
                )}
                {product.attributes?.color && (
                  <HStack>
                    <Text color="gray.600" fontWeight="medium">Màu sắc:</Text>
                    <Text color="gray.700">{product.attributes.color}</Text>
                  </HStack>
                )}
              </HStack>

              <Box mb={8}>
                <PriceTag 
                  price={product.price} 
                  compareAtPrice={product.compare_at_price} 
                  size="lg" 
                />
                <Text color="green.600" mt={1} fontSize="sm">
                  <Text as="span" fontWeight="medium">Tình trạng:</Text> Còn hàng
                </Text>
              </Box>

              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mb={8}>
                <Box>
                  <Text fontWeight="medium" mb={2} color="gray.600">
                    Số lượng
                  </Text>
                  <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={product.stock || 99}
                  />
                </Box>
              </Stack>

              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mb={8}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<FiShoppingCart />}
                  onClick={() => handleAddToCart(product.id)}
                  flex={1}
                  py={6}
                  borderRadius="md"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                >
                  Thêm vào giỏ hàng
                </Button>

                <Button 
                  variant="outline" 
                  size="lg" 
                  leftIcon={<FiHeart />} 
                  flex={1} 
                  py={6} 
                  borderRadius="md" 
                  _hover={{ bg: 'gray.50' }}
                >
                  Yêu thích
                </Button>

                <IconButton 
                  aria-label="Chia sẻ" 
                  icon={<FiShare2 />} 
                  size="lg" 
                  variant="outline" 
                  onClick={handleShare} 
                />
              </Stack>

              {/* Product Description */}
              <Box mb={8}>
                <Heading size="md" mb={4} color="gray.800" borderBottom="1px" borderColor="gray.200" pb={2}>
                  Mô tả sản phẩm
                </Heading>
                {product.description ? (
                  <Text color="gray.700" lineHeight="tall" whiteSpace="pre-line">
                    {product.description}
                  </Text>
                ) : (
                  <Text color="gray.500">Đang cập nhật mô tả sản phẩm...</Text>
                )}
              </Box>

              {/* Product Specifications */}
              {product.attributes && (
                <Box mb={8}>
                  <Heading size="md" mb={4} color="gray.800" borderBottom="1px" borderColor="gray.200" pb={2}>
                    Thông số kỹ thuật
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {product.attributes.material && (
                      <Box>
                        <Text fontWeight="medium" color="gray.600">Chất liệu</Text>
                        <Text color="gray.800">{product.attributes.material}</Text>
                      </Box>
                    )}
                    {product.attributes.color && (
                      <Box>
                        <Text fontWeight="medium" color="gray.600">Màu sắc</Text>
                        <Text color="gray.800">{product.attributes.color}</Text>
                      </Box>
                    )}
                    {product.attributes.dimensions_cm && (
                      <Box>
                        <Text fontWeight="medium" color="gray.600">Kích thước (cm)</Text>
                        {Object.entries(product.attributes.dimensions_cm).map(([key, value]) => (
                          <Text key={key} color="gray.800" fontSize="sm">
                            {key.replace(/_/g, ' ')}: {value} cm
                          </Text>
                        ))}
                      </Box>
                    )}
                  </SimpleGrid>
                </Box>
              )}
            </Box>
          </Stack>
        </Box>

        {/* Related Products */}
        <RelatedProducts 
          products={relatedProducts} 
          onAddToCart={handleAddToCart} 
        />

        {/* Back to Top Button */}
        <Box textAlign="center" mt={8} mb={4}>
          <Button 
            variant="ghost" 
            leftIcon={<FiArrowUp />} 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Lên đầu trang
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
