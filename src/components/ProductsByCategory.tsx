import { Box, Container, Heading, SimpleGrid, VStack, Text, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Product, Category } from '../types/product';
import { fetchProducts } from '../services/productService';
import ProductCard from './ProductCard';
import { FiArrowRight } from 'react-icons/fi';

interface CategoryWithProducts extends Category {
  products: Product[];
}

interface ProductsData {
  categories: Category[];
  products: Product[];
  isFallback?: boolean;
}

// Extend the Product type to include category_ids
interface ExtendedProduct extends Product {
  category_ids?: string[];
}

const ProductsByCategory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Omit<ProductsData, 'isFallback'> & { isFallback?: boolean }>({ 
    categories: [], 
    products: [],
    isFallback: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await fetchProducts();
        
        // Single setData call with proper typing
        setData({
          categories: Array.isArray(result.categories) ? result.categories : [],
          products: Array.isArray(result.products) ? result.products : [],
          isFallback: 'isFallback' in result ? Boolean(result.isFallback) : false
        });
      } catch (err) {
        const error = err instanceof Error 
          ? err 
          : new Error(typeof err === 'string' ? err : 'Failed to load products');
        setError(error);
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categoriesWithProducts = useMemo<CategoryWithProducts[]>(() => {
    if (!data.categories.length || !data.products.length) return [];

    return data.categories
      .filter((category): category is Category => Boolean(category?.id))
      .map((category) => {
        const categoryProducts = data.products.filter((product) => {
          // Get categories from both possible properties and ensure they're arrays
          const categories = Array.isArray(product.categories) ? product.categories : [];
          const categoryIds = Array.isArray((product as ExtendedProduct).category_ids) 
            ? (product as ExtendedProduct).category_ids 
            : [];
          
          // Combine both category sources and filter out any undefined values
          const allCategories = [...categories, ...categoryIds].filter(Boolean);
          return allCategories.includes(category.id);
        });

        return {
          ...category,
          products: categoryProducts.slice(0, 4), // Limit to 4 products per category
        };
      })
      .filter((category) => category.products.length > 0);
  }, [data]);

  if (isLoading) {
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
        <Text mt={2}>{error.message}</Text>
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

  if (!categoriesWithProducts.length) {
    return (
      <Box py={12} textAlign="center">
        <Text>Không tìm thấy sản phẩm nào.</Text>
      </Box>
    );
  }

  return (
    <Box py={12} bg="gray.50">
      <Container maxW="container.xl">
        {data.isFallback && (
          <Alert status="warning" borderRadius="md" mb={8}>
            <AlertIcon />
            Hiện đang sử dụng dữ liệu sản phẩm tạm thời. Một số thông tin có thể chưa chính xác.
          </Alert>
        )}
        {categoriesWithProducts.map((category) => (
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
              {category.products.map((product) => (
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

            {category.products.length > 0 && (
              <Box textAlign="center" mt={8}>
                <Button 
                  rightIcon={<FiArrowRight />} 
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => navigate(`/danh-muc/${category.id}`)}
                  borderRadius="full"
                  px={8}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'md'
                  }}
                >
                  Xem tất cả {category.name.toLowerCase()}
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default ProductsByCategory;
