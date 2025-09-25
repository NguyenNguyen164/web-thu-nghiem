import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import type { Product } from '../../../../src/types/product';
import ProductCard from '../../ProductCard';

interface RelatedProductsProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
}

export default function RelatedProducts({ products, onAddToCart }: RelatedProductsProps) {
  if (!products.length) return null;

  return (
    <Box mb={8}>
      <Heading size="md" mb={6} color="gray.800">
        Sản phẩm liên quan
      </Heading>
      {products.length > 0 ? (
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart?.(product.id);
              }}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text color="gray.600">Không có sản phẩm liên quan.</Text>
      )}
    </Box>
  );
}
