import { Box, Image, Text, Flex, Badge, IconButton, useDisclosure, Tooltip } from '@chakra-ui/react';
import { FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { onOpen } = useDisclosure();
  const { 
    id,
    title, 
    price, 
    compare_at_price, 
    images,
    categories = [] 
  } = product;
  
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const isOnSale = compare_at_price && compare_at_price > price;
  const salePercent = isOnSale && compare_at_price
    ? Math.round(((compare_at_price - price) / compare_at_price) * 100) 
    : 0;

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: '0.3s' }}
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      position="relative"
      h="100%"
      display="flex"
      flexDirection="column"
      _hover={{
        boxShadow: 'lg',
        '& .product-actions': {
          opacity: 1,
          transform: 'translateY(0)'
        }
      }}
    >
      {/* Product Image */}
      <Box position="relative" overflow="hidden" pt="100%" bg="gray.50">
        <RouterLink to={`/san-pham/${id}`}>
          <Image
            src={images?.main || '/placeholder.svg'}
            alt={title}
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            objectFit="cover"
            transition="transform 0.3s ease"
            _hover={{
              transform: 'scale(1.05)'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </RouterLink>
        
        {/* Sale Badge */}
        {isOnSale && (
          <Badge 
            position="absolute" 
            top="2" 
            right="2" 
            colorScheme="red" 
            borderRadius="md"
            px={2}
            py={1}
            fontSize="sm"
            zIndex="1"
          >
            -{salePercent}%
          </Badge>
        )}
        
        {/* Quick Actions */}
        <Box
          className="product-actions"
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          display="flex"
          justifyContent="center"
          p={2}
          bg="rgba(255, 255, 255, 0.9)"
          opacity={{ base: 1, md: 0 }}
          transform={{ base: 'translateY(0)', md: 'translateY(100%)' }}
          transition="all 0.3s ease"
          zIndex="1"
        >
          <Tooltip label="Xem nhanh" placement="top">
            <IconButton
              aria-label="Xem nhanh"
              icon={<FiEye />}
              size="sm"
              colorScheme="blue"
              variant="ghost"
              mx={1}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpen();
              }}
            />
          </Tooltip>
        </Box>
      </Box>

      {/* Product Info */}
      <Box p={4} flexGrow={1} display="flex" flexDirection="column">
        <Text fontSize="sm" color="gray.500" mb={1} noOfLines={1}>
          {categories?.[0] || 'Nội thất'}
        </Text>
        <Text 
          as={RouterLink}
          to={`/san-pham/${id}`}
          _hover={{
            textDecoration: 'none',
            color: 'accent1.600'
          }}
          fontSize="md" 
          fontWeight="medium" 
          mb={2} 
          noOfLines={2}
          minH="44px"
          lineHeight="tall"
        >
          {title}
        </Text>
        <Box mt="auto">
          <Flex align="center" justify="space-between">
            <Box>
              <Text as="span" fontSize="lg" fontWeight="bold" color="accent1.600">
                {formatPrice(price)}
              </Text>
              {isOnSale && compare_at_price && (
                <Text as="span" ml={2} textDecoration="line-through" color="gray.500" fontSize="sm">
                  {formatPrice(compare_at_price)}
                </Text>
              )}
            </Box>
            <Box display="none" />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
