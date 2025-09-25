import { 
  Box, 
  Image, 
  Text, 
  Badge, 
  HStack, 
  VStack,
  Tooltip,
  IconButton,
  Button
} from '@chakra-ui/react';
import { FiEye, FiTag, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import type { Product } from '../types/product';

// Extend the Product type to include optional fields
interface ExtendedProduct extends Omit<Product, 'categories'> {
  galleryImages?: string[];
  image?: string;
  categoryNames?: string[];
  categories?: string[];
}

interface ProductCardProps {
  product: ExtendedProduct;
  onAddToCart?: (e: React.MouseEvent) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { 
    id,
    title, 
    price = 0, 
    compare_at_price = 0, 
    images = { main: '/images/placeholder.jpg' },
    galleryImages = [],
    image,
    attributes = {},
    categories = [],
    categoryNames = [],
    short_description = ''
  } = product;
  
  // Ensure price is a number
  const productPrice = typeof price === 'number' ? price : 0;
  const productComparePrice = typeof compare_at_price === 'number' ? compare_at_price : 0;
  
  const formatPrice = (value: number) => {
    if (!value && value !== 0) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const isOnSale = productComparePrice > 0 && productComparePrice > productPrice;
  const salePercent = isOnSale && productComparePrice > 0
    ? Math.round(((productComparePrice - productPrice) / productComparePrice) * 100) 
    : 0;
    
  // Get product details
  const material = attributes?.material || 'Gỗ tự nhiên';
  const dimensions = [
    attributes?.width_mm ? `Rộng: ${attributes.width_mm}mm` : null,
    attributes?.length_mm ? `Dài: ${attributes.length_mm}mm` : null,
    attributes?.height_mm ? `Cao: ${attributes.height_mm}mm` : null
  ].filter(Boolean).join(' | ');
  
  const isCustomizable = attributes?.customizable || false;
  
  // Get product image with fallback handling
  const imageSource = (() => {
    // Handle array of images
    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }
    // Handle object with main/thumb/placeholder
    if (images && typeof images === 'object' && 'main' in images) {
      return (images as { main: string }).main;
    }
    // Fallback to gallery images or default placeholder
    return galleryImages[0] || image || '/images/placeholder.jpg';
  })();

  const displayCategories = (categoryNames && categoryNames.length > 0) 
    ? categoryNames 
    : (Array.isArray(categories) ? categories : []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(e);
  };

  return (
    <Box 
      as={RouterLink} 
      to={`/san-pham/${id}`} 
      _hover={{ textDecoration: 'none' }}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        // Chỉ chuyển hướng nếu click không phải vào nút thêm vào giỏ
        if (!(e.target as HTMLElement).closest('button')) {
          return;
        }
        e.preventDefault();
      }}
      display="block"
      h="100%"
    >
      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, boxShadow: 'lg' }}
        transition={{ duration: '0.3s' }}
        bg="white"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        h="100%"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        {/* Nút thêm vào giỏ hàng */}
        {onAddToCart && (
          <Button 
            size="sm" 
            colorScheme="blue" 
            position="absolute" 
            top={2} 
            right={2}
            zIndex={1}
            onClick={handleAddToCart}
            boxShadow="md"
          >
            <FiShoppingCart />
          </Button>
        )}
        
        {/* Badges */}
        <Box position="absolute" top={2} left={2} zIndex={1} display="flex" flexDirection="column" gap={1}>
          {isOnSale && (
            <Badge colorScheme="red" px={2} py={1} borderRadius="md" fontSize="xs">
              -{salePercent}%
            </Badge>
          )}
          {isCustomizable && (
            <Badge colorScheme="blue" px={2} py={1} borderRadius="md" fontSize="xs">
              Tùy chỉnh
            </Badge>
          )}
        </Box>
        
        {/* Product Image */}
        <Box position="relative" pt="100%" bg="gray.50" overflow="hidden">
          <Image
            src={imageSource}
            alt={title}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="cover"
            transition="transform 0.3s"
            _hover={{
              transform: 'scale(1.05)'
            }}
            fallbackSrc="/images/placeholder.jpg"
          />
        </Box>

        {/* Product Info */}
        <Box p={4} flex={1} display="flex" flexDirection="column">
          {/* Category */}
          {displayCategories.length > 0 && (
            <Text fontSize="xs" color="gray.500" mb={1} textTransform="uppercase">
              {displayCategories[0]}
            </Text>
          )}

          {/* Title */}
          <Text 
            as={RouterLink}
            to={`/san-pham/${id}`}
            fontSize="md" 
            fontWeight="semibold" 
            mb={2}
            noOfLines={2}
            minH="3.5rem"
            _hover={{
              color: 'blue.500',
              textDecoration: 'underline'
            }}
          >
            {title}
          </Text>

          {/* Short Description */}
          {short_description && (
            <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
              {short_description}
            </Text>
          )}

          {/* Product Details */}
          <VStack align="start" spacing={1} mb={3} fontSize="sm" color="gray.600">
            {material && (
              <HStack spacing={1}>
                <Text as="span" fontWeight="medium">Chất liệu:</Text>
                <Text as="span">{material}</Text>
              </HStack>
            )}
            
            {dimensions && (
              <HStack spacing={1}>
                <Text as="span" fontWeight="medium">Kích thước:</Text>
                <Text as="span">{dimensions}</Text>
              </HStack>
            )}
            
            {attributes?.lead_time && (
              <HStack spacing={1}>
                <Text as="span" fontWeight="medium">Giao hàng:</Text>
                <Text as="span" color="green.600" fontWeight="500">
                  {attributes.lead_time}
                </Text>
              </HStack>
            )}
          </VStack>

          {/* Price */}
          <Box mt="auto">
            {isOnSale && (
              <Text as="s" color="gray.400" fontSize="sm" mr={2}>
                {formatPrice(productComparePrice)}
              </Text>
            )}
            <Text 
              as="span" 
              color={isOnSale ? 'red.500' : 'gray.800'} 
              fontWeight="bold"
              fontSize="lg"
              display="block"
              mb={3}
            >
              {formatPrice(productPrice)}
            </Text>
            
            {/* Action Buttons */}
            <HStack spacing={2} mt={4}>
              <Tooltip label="Xem chi tiết">
                <IconButton
                  as={RouterLink}
                  to={`/san-pham/${id}`}
                  aria-label="Xem chi tiết"
                  icon={<FiEye />}
                  colorScheme="blue"
                  variant="solid"
                  isRound
                  flex={1}
                />
              </Tooltip>
              
              {isCustomizable && (
                <Tooltip label="Yêu cầu tư vấn">
                  <IconButton
                    as={RouterLink}
                    to={`/lien-he?product=${id}`}
                    aria-label="Yêu cầu tư vấn"
                    icon={<FiTag />}
                    colorScheme="purple"
                    variant="outline"
                    isRound
                    flex={1}
                  />
                </Tooltip>
              )}
            </HStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
