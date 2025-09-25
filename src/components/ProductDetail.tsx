import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box, Container, Heading, Text, Image, Button, Stack, HStack, Badge,
  useToast, Spinner, Flex, IconButton, SimpleGrid, useBreakpointValue
} from '@chakra-ui/react';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiShare2, FiArrowUp } from 'react-icons/fi';
import { fetchProductById, fetchRelatedProducts } from '../services/productService';
import type { Product } from '../types/product';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(price);

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const loadProductData = useCallback(async () => {
    console.log('Loading product data...');
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
    console.log('Loading product data...');
    loadProductData();
  }, [loadProductData]);

  const handleAddToCart = () => {
    console.log('Adding product to cart...');
    if (!product) return;
    toast({
      title: 'Đã thêm vào giỏ hàng',
      description: `${product.title} đã được thêm vào giỏ hàng`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleShare = () => {
    console.log('Sharing product...');
    if (!product) return;
    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          text: `Xem sản phẩm ${product.title} tại Nguyen Furniture`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Đã sao chép liên kết',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Trả về sớm khi loading
  if (isLoading) {
    console.log('Loading product data...');
    return (
      <Container maxW="container.xl" py={12}>
        <Flex justify="center" align="center" minH="50vh">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Flex>
      </Container>
    );
  }

  // Trả về sớm khi lỗi / không có sản phẩm
  if (error || !product) {
    console.log('Error loading product:', error);
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

  // Get all possible image sources in priority order
  const getProductImages = (product: Product): string[] => {
    // Start with an empty array
    const images: string[] = [];

    // Add main product image if exists
    if (product.image) {
      images.push(product.image);
    }

    // Add gallery images if they exist
    if (Array.isArray(product.galleryImages) && product.galleryImages.length > 0) {
      images.push(...product.galleryImages.filter(Boolean));
    }
    // Handle different image formats
    else if (product.images) {
      if (Array.isArray(product.images)) {
        images.push(...product.images.filter(Boolean));
      } else if (typeof product.images === 'object') {
        // Handle object format images
        const { main, thumb, placeholder } = product.images as { main?: string; thumb?: string; placeholder?: string };
        if (main) images.push(main);
        if (thumb && !images.includes(thumb)) images.push(thumb);
        if (placeholder && !images.includes(placeholder)) images.push(placeholder);
      }
    }

    // Filter out any empty strings or invalid URLs and ensure uniqueness
    const uniqueImages = Array.from(new Set(images.filter(Boolean)));

    // Always ensure we have at least a placeholder
    return uniqueImages.length > 0 ? uniqueImages : ['/placeholder-product.jpg'];
  };

  const productImages = getProductImages(product);
  console.log('Product images:', productImages);

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <Button leftIcon={<FiArrowLeft />} variant="ghost" mb={6} onClick={() => navigate(-1)}>
          Quay lại
        </Button>

        {/* Nội dung chính */}
        <Box bg="white" borderRadius="xl" overflow="hidden" boxShadow="sm" mb={8}>
          <Stack direction={{ base: 'column', lg: 'row' }} spacing={8} p={{ base: 4, md: 8 }}>
            {/* Product Images */}
            <Box flex={1}>
              <Box position="relative" borderRadius="lg" overflow="hidden" bg="gray.100" minH="400px" mb={4}>
                <Image
                  src={productImages[currentImageIndex]}
                  alt={product.title}
                  w="100%"
                  h="100%"
                  objectFit="contain"
                  p={8}
                />
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <Badge
                    position="absolute"
                    top={4}
                    left={4}
                    colorScheme="red"
                    fontSize="sm"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    Giảm {Math.round((1 - product.price / product.compare_at_price) * 100)}%
                  </Badge>
                )}
              </Box>

              {productImages.length > 1 && (
                <HStack spacing={2} overflowX="auto" py={2} px={1}>
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
                      onClick={() => setCurrentImageIndex(index)}
                      flexShrink={0}
                      bg="white"
                      p={1}
                    >
                      <Image src={img} alt={`${product.title} ${index + 1}`} w="100%" h="100%" objectFit="contain" />
                    </Box>
                  ))}
                </HStack>
              )}
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
                {product.compare_at_price && product.compare_at_price > product.price ? (
                  <Box>
                    <Text as="span" fontSize="3xl" fontWeight="bold" color="red.500">
                      {formatPrice(product.price)}
                    </Text>
                    <Text as="span" ml={3} textDecoration="line-through" color="gray.500">
                      {formatPrice(product.compare_at_price)}
                    </Text>
                    <Badge colorScheme="red" ml={3} fontSize="0.8em" py={0.5} px={2} borderRadius="md">
                      Tiết kiệm {formatPrice(product.compare_at_price - product.price)}
                    </Badge>
                  </Box>
                ) : (
                  <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                    {formatPrice(product.price)}
                  </Text>
                )}
                <Text color="green.600" mt={1} fontSize="sm">
                  <Text as="span" fontWeight="medium">Tình trạng:</Text> Còn hàng
                </Text>
              </Box>

              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mb={8}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<FiShoppingCart />}
                  onClick={handleAddToCart}
                  flex={1}
                  py={6}
                  borderRadius="md"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                >
                  Thêm vào giỏ hàng
                </Button>

                <Button variant="outline" size="lg" leftIcon={<FiHeart />} flex={1} py={6} borderRadius="md" _hover={{ bg: 'gray.50' }}>
                  Yêu thích
                </Button>

                <IconButton aria-label="Chia sẻ" icon={<FiShare2 />} size="lg" variant="outline" onClick={handleShare} />
              </Stack>

              {/* Product Description */}
              <Box mb={8}>
                <Heading size="md" mb={4} color="gray.800" borderBottom="1px" borderColor="gray.200" pb={2}>
                  Mô tả sản phẩm
                </Heading>

                {product.description ? (
                  <Text color="gray.700" lineHeight="tall">
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
                        <Text fontWeight="medium" color="gray.600">Kích thước</Text>
                        <Stack spacing={1} mt={1}>
                          {Object.entries(product.attributes.dimensions_cm).map(([key, value]) => (
                            <Text key={key} color="gray.800" fontSize="sm">
                              {key.replace(/_/g, ' ')}: {value} cm
                            </Text>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </SimpleGrid>
                </Box>
              )}
            </Box>
          </Stack>
        </Box>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box mb={8}>
            <Heading size="md" mb={6} color="gray.800">
              Sản phẩm liên quan
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              {relatedProducts.map((relatedProduct) => (
                <Box
                  key={relatedProduct.id}
                  as={Link}
                  to={`/san-pham/${relatedProduct.id}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    bg="white"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="sm"
                    _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
                    transition="all 0.2s"
                    h="100%"
                    display="flex"
                    flexDirection="column"
                  >
                    <Box flex={1} p={4}>
                      <Image
                        src={relatedProduct.image || '/placeholder-product.jpg'}
                        alt={relatedProduct.title}
                        w="100%"
                        h="180px"
                        objectFit="contain"
                        mb={3}
                      />
                      <Heading size="sm" mb={2} color="gray.800" noOfLines={2} minH="48px">
                        {relatedProduct.title}
                      </Heading>
                      <Text fontWeight="bold" color="blue.600">
                        {formatPrice(relatedProduct.price)}
                      </Text>
                      {relatedProduct.compare_at_price && relatedProduct.compare_at_price > relatedProduct.price && (
                        <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                          {formatPrice(relatedProduct.compare_at_price)}
                        </Text>
                      )}
                    </Box>
                    <Button
                      colorScheme="blue"
                      variant="ghost"
                      size="sm"
                      w="full"
                      borderTopRadius="none"
                      leftIcon={<FiShoppingCart />}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toast({
                          title: 'Đã thêm vào giỏ hàng',
                          description: `${relatedProduct.title} đã được thêm vào giỏ hàng`,
                          status: 'success',
                          duration: 3000,
                          isClosable: true,
                        });
                      }}
                    >
                      Thêm vào giỏ
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}

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
