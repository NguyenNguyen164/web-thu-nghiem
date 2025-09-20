import { Box, Container, Heading, SimpleGrid, VStack, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Product, Category } from '../types/product';
import { fetchProducts, getProductsByCategory } from '../services/productService';
import ProductCard from './ProductCard';

const ProductsByCategory = () => {
  const [data, setData] = useState<{ categories: Category[]; products: Product[] }>({ categories: [], products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchProducts();
        setData(result);
      } catch (err) {
        setError('Không thể tải dữ liệu sản phẩm');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box py={12} textAlign="center">
        <Text>Đang tải sản phẩm...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={12} textAlign="center" color="red.500">
        <Text fontWeight="bold">Đã xảy ra lỗi khi tải sản phẩm</Text>
        <Text mt={2}>{error}</Text>
        <Button 
          mt={4} 
          colorScheme="blue" 
          onClick={() => window.location.reload()}
        >
          Thử lại
        </Button>
      </Box>
    );
  }

  if (!data.categories.length || !data.products.length) {
    return (
      <Box py={12} textAlign="center">
        <Text>Không tìm thấy sản phẩm nào.</Text>
      </Box>
    );
  }

  return (
    <Box py={12} bg="gray.50">
      <Container maxW="container.xl">
        {data.categories.map((category) => {
          const products = getProductsByCategory(data, category.id, 2);
          if (products.length === 0) return null;

          return (
            <Box key={category.id} mb={16}>
              <VStack spacing={4} align="stretch" mb={8}>
                <Heading as="h2" size="xl" textAlign="center" color="brand.800">
                  {category.name}
                </Heading>
                <Text textAlign="center" color="gray.600" maxW="2xl" mx="auto">
                  Khám phá bộ sưu tập {category.name.toLowerCase()} được thiết kế tinh tế và sang trọng
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </SimpleGrid>

              <Box textAlign="center" mt={8}>
                <Button
                  as="a"
                  href={`/danh-muc/${category.slug}`}
                  colorScheme="accent1"
                  variant="outline"
                  size="lg"
                  borderRadius="full"
                  px={8}
                  _hover={{
                    bg: 'accent1.500',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                >
                  Xem tất cả {category.name}
                </Button>
              </Box>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
};

export default ProductsByCategory;
