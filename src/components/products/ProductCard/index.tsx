import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(price);

  return (
    <Box as={Link} to={`/san-pham/${product.id}`} _hover={{ textDecoration: 'none' }}>
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
          <Box
            bg="gray.100"
            borderRadius="md"
            overflow="hidden"
            mb={3}
            h="180px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={product.image || '/placeholder-product.jpg'}
              alt={product.title}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </Box>
          <Heading size="sm" mb={2} color="gray.800" noOfLines={2} minH="48px">
            {product.title}
          </Heading>
          <Text fontWeight="bold" color="blue.600">
            {formatPrice(product.price)}
          </Text>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <Text fontSize="sm" color="gray.500" textDecoration="line-through">
              {formatPrice(product.compare_at_price)}
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
          onClick={onAddToCart}
        >
          Thêm vào giỏ
        </Button>
      </Box>
    </Box>
  );
}
