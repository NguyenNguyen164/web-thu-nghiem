import { 
  Box, 
  Image, 
  Text, 
  Flex, 
  Badge, 
  IconButton, 
  useDisclosure, 
  Tooltip, 
  HStack, 
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { FiEye, FiShoppingCart, FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { onOpen } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { 
    id,
    title, 
    price = 0, 
    compare_at_price = 0, 
    images = { main: '/images/placeholder.jpg' },
    attributes = {},
    categories = [],
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
  
  const isNew = attributes?.is_new || false;
  const isCustomizable = attributes?.customizable || false;
  
  // Get product image or use placeholder
  const productImage = (images && 'main' in images) ? images.main : '/images/placeholder.jpg';

  return (
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
      {/* Badges */}
      <HStack position="absolute" top={2} left={2} zIndex={1} spacing={2}>
        {isNew && (
          <Badge colorScheme="green" px={2} py={1} borderRadius="md" fontSize="xs">
            Mới
          </Badge>
        )}
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
      </HStack>

      {/* Product Image */}
      <Box position="relative" pt="100%" bg="gray.50" overflow="hidden">
        <Image
          src={productImage}
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
        {categories.length > 0 && (
          <Text fontSize="xs" color="gray.500" mb={1} textTransform="uppercase">
            {categories[0]}
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

        {/* Price and Actions */}
        <Box mt="auto">
          {/* Price */}
          <Flex align="center" mb={3} flexWrap="wrap">
            <Text fontSize="lg" fontWeight="bold" color="red.500" mr={2}>
              {formatPrice(productPrice)}
            </Text>
            {isOnSale && (
              <Text as="s" fontSize="sm" color="gray.500">
                {formatPrice(productComparePrice)}
              </Text>
            )}
          </Flex>

          {/* Buttons */}
          <HStack spacing={2} mt={2}>
            <Tooltip label="Xem chi tiết">
              <IconButton
                as={RouterLink}
                to={`/san-pham/${id}`}
                aria-label="Xem chi tiết"
                icon={<FiEye />}
                size={isMobile ? 'sm' : 'md'}
                colorScheme="blue"
                variant="outline"
                isRound
                flex={1}
              />
            </Tooltip>
            
            <Tooltip label="Thêm vào giỏ">
              <IconButton
                aria-label="Thêm vào giỏ"
                icon={<FiShoppingCart />}
                size={isMobile ? 'sm' : 'md'}
                colorScheme="green"
                variant="outline"
                isRound
                onClick={(e) => {
                  e.preventDefault();
                  onOpen();
                }}
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
                  size={isMobile ? 'sm' : 'md'}
                  colorScheme="purple"
                  variant="outline"
                  isRound
                />
              </Tooltip>
            )}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
