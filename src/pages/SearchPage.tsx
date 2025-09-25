import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../services/productService';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Button,
  Spinner,
} from '@chakra-ui/react';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const results = await searchProducts(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <Container maxW="container.xl" py={10} px={4}>
      <Stack spacing={8} align="center">
        {/* Đã bỏ SearchBar ở trang để tránh trùng với Header */}

        {loading ? (
          <Box textAlign="center" py={12} w="full">
            <Spinner
              size="lg"
              thickness="4px"
              color="blue.500"
              emptyColor="blue.100"
            />
            <Text mt={4} color="gray.600">
              Đang tìm kiếm sản phẩm...
            </Text>
          </Box>
        ) : searchResults.length > 0 ? (
          <Stack spacing={6} w="full">
            <Heading as="h2" size="lg">
              Kết quả tìm kiếm cho{' '}
              <Text as="span" color="blue.500">
                "{query}"
              </Text>
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>
          </Stack>
        ) : query ? (
          <Box textAlign="center" py={12} w="full">
            <Text fontSize="lg" color="gray.600">
              Không tìm thấy sản phẩm nào phù hợp với "{query}"
            </Text>
            <Button
              mt={4}
              variant="link"
              colorScheme="blue"
              onClick={() => navigate('/')}
            >
              Quay lại trang chủ
            </Button>
          </Box>
        ) : (
          <Box textAlign="center" py={12} w="full">
            <Text fontSize="lg" color="gray.600">
              Nhập từ khóa để tìm kiếm sản phẩm
            </Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default SearchPage;