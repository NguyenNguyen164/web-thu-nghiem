import { Box, Text, Badge } from '@chakra-ui/react';

interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function PriceTag({ price, compareAtPrice, size = 'md' }: PriceTagProps) {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND', 
      minimumFractionDigits: 0 
    }).format(value);

  const sizes = {
    sm: { price: 'xl', compare: 'sm' },
    md: { price: '2xl', compare: 'md' },
    lg: { price: '3xl', compare: 'lg' },
  };

  const currentSize = sizes[size];

  return (
    <Box>
      {compareAtPrice && compareAtPrice > price ? (
        <Box>
          <Text as="span" fontSize={currentSize.price} fontWeight="bold" color="red.500">
            {formatPrice(price)}
          </Text>
          <Text as="span" ml={3} textDecoration="line-through" color="gray.500" fontSize={currentSize.compare}>
            {formatPrice(compareAtPrice)}
          </Text>
          <Badge colorScheme="red" ml={3} fontSize="0.8em" py={0.5} px={2} borderRadius="md">
            Tiết kiệm {formatPrice(compareAtPrice - price)}
          </Badge>
        </Box>
      ) : (
        <Text fontSize={currentSize.price} fontWeight="bold" color="blue.600">
          {formatPrice(price)}
        </Text>
      )}
    </Box>
  );
}
