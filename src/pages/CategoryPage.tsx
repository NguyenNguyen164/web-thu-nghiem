import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

// Import the product data
import productData from '../../../product_descriptions.json';

type Product = {
  id: string;
  title: string;
  price_AUD: number;
  compare_at_price_AUD?: number;
  images: {
    main: string;
    thumb: string;
    placeholder: string;
  };
  short_description?: string;
  attributes?: Record<string, any>;
  category_ids?: string[];
};

type ProductData = {
  items: Product[];
};

// Map of category slugs to display names
const CATEGORY_NAMES: Record<string, string> = {
  'ban-an': 'Bàn Ăn',
  'sofa-ghe': 'Sofa & Ghế',
  'tu-quan-ao': 'Tủ Quần Áo',
  'giuong-ngu': 'Giường Ngủ'
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategoryData = () => {
      try {
        setLoading(true);
        
        // Check if the slug is valid
        if (!slug || !CATEGORY_NAMES[slug]) {
          navigate('/404', { replace: true });
          return;
        }
        
        // Filter products by category
        const filteredProducts = (productData as ProductData).items.filter(
          product => product.category_ids?.includes(slug)
        );
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading category data:', error);
        navigate('/404', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [slug, navigate]);

  if (loading) {
    return (
      <Box py={10} textAlign="center">
        <Text>Đang tải...</Text>
      </Box>
    );
  }

  const categoryName = slug ? CATEGORY_NAMES[slug] : 'Danh mục';
  
  if (!slug || !CATEGORY_NAMES[slug]) {
    return (
      <Box py={10} textAlign="center">
        <Text>Không tìm thấy danh mục</Text>
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" size="xl" mb={6}>
        {categoryName}
      </Heading>
      <Text mb={8} color="gray.600">
        Danh sách sản phẩm trong danh mục {categoryName.toLowerCase()}
      </Text>
      {products.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                ...product,
                price: product.price_AUD,
                compare_at_price: product.compare_at_price_AUD,
                image: product.images?.main || '',
                link: `/san-pham/${product.id}`
              }} 
            />
          ))}
        </SimpleGrid>
      ) : (
        <Box textAlign="center" py={10}>
          <Text>Không có sản phẩm nào trong danh mục này.</Text>
        </Box>
      )}
    </Container>
  );
};

export default CategoryPage;
