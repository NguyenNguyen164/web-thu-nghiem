import { 
  Box, 
  Container, 
  Heading, 
  SimpleGrid, 
  Text, 
  Spinner, 
  Button, 
  useToast,
  VStack,
  HStack,
  Select,
  Flex,
  Input,
  IconButton,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  ButtonGroup,
  Image
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/productService';
import type { Product } from '../types/product';
import { 
  FiGrid, 
  FiList, 
  FiSearch, 
  FiX, 
  FiChevronLeft, 
  FiChevronRight, 
  FiRefreshCw,
  FiHome,
  FiShoppingCart
} from 'react-icons/fi';

interface CategoryConfig {
  name: string;
  description?: string;
  icon?: string;
  datasetSlug?: string;
  datasetId?: string;
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  'ban-an': { 
    name: 'Bàn Ăn', 
    description: 'Bàn ăn cao cấp, đa dạng kiểu dáng và chất liệu',
    icon: '🍽️',
    datasetSlug: 'ban', 
    datasetId: 'cat_tables' 
  },
  'sofa-ghe': { 
    name: 'Sofa & Ghế', 
    description: 'Sofa và ghế hiện đại, thoải mái cho không gian sống',
    icon: '🛋️',
    datasetSlug: 'sofa', 
    datasetId: 'cat_sofas' 
  },
  'tu-quan-ao': { 
    name: 'Tủ Quần Áo', 
    description: 'Tủ quần áo đa năng, tiết kiệm diện tích',
    icon: '👔',
    datasetSlug: 'tu-tivi', 
    datasetId: 'cat_tv_units' 
  },
  'giuong-ngu': { 
    name: 'Giường Ngủ', 
    description: 'Giường ngủ cao cấp, thiết kế tinh tế',
    icon: '🛏️',
    datasetSlug: 'giuong-ngu', 
    datasetId: 'cat_beds' 
  }
};

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'name-asc', label: 'Tên: A-Z' },
  { value: 'name-desc', label: 'Tên: Z-A' },
];

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  
  const navigate = useNavigate();
  const toast = useToast();
  
  const categoryInfo = slug ? CATEGORY_CONFIG[slug] : null;
  const categoryName = categoryInfo?.name || 'Danh mục';
  const categoryDescription = categoryInfo?.description || '';

  // Load category data
  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!slug) {
          throw new Error('Không tìm thấy danh mục');
        }

        // Fetch products from the API
        const data = await fetchProducts();
        
        // Filter products by category slug
        const filtered = data.products.filter(product => 
          product.categories?.some(catId => 
            typeof catId === 'string' && catId.toLowerCase() === slug.toLowerCase()
          )
        );
        
        setProducts(filtered);
        setFilteredProducts(filtered);
        
        // Update price range
        if (filtered.length > 0) {
          const prices = filtered.map(p => p.price || 0);
          const maxPrice = Math.max(...prices);
          setPriceRange([0, Math.ceil(maxPrice / 1000000) * 1000000]);
        }
        
      } catch (error) {
        console.error('Error loading category data:', error);
        setError('Không thể tải dữ liệu danh mục. Vui lòng thử lại sau.');
        
        toast({
          title: 'Lỗi',
          description: 'Không thể tải dữ liệu sản phẩm',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [slug, navigate, toast]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.short_description?.toLowerCase().includes(query) ||
        product.attributes?.material?.toLowerCase().includes(query)
      );
    }
    
    // Apply price range
    result = result.filter(product => {
      const price = product.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'newest':
        default:
          return 0; // Default sorting (newest first)
      }
    });
    
    setFilteredProducts(result);
  }, [products, searchQuery, sortBy, priceRange]);
  
  const handleAddToCart = useCallback((e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // TODO: Implement add to cart logic
    toast({
      title: 'Đã thêm vào giỏ hàng',
      description: `${product.title} đã được thêm vào giỏ hàng`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  // Loading state
  if (loading) {
    return (
      <Box py={20} textAlign="center">
        <Spinner size="xl" color="blue.500" thickness="4px" emptyColor="gray.200" />
        <Text mt={4} fontSize="lg" color="gray.600">Đang tải sản phẩm...</Text>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box py={10} textAlign="center">
        <Text color="red.500" fontSize="lg" mb={4}>
          {error}
        </Text>
        <Button 
          colorScheme="blue" 
          onClick={() => window.location.reload()}
          leftIcon={<FiRefreshCw />}
        >
          Thử lại
        </Button>
      </Box>
    );
  }
  
  // Empty state
  if (filteredProducts.length === 0 && !loading) {
    return (
      <Box py={20} textAlign="center">
        <Text fontSize="xl" color="gray.600" mb={4}>
          Không tìm thấy sản phẩm nào trong danh mục này.
        </Text>
        <Button 
          colorScheme="blue" 
          onClick={() => navigate('/')}
          leftIcon={<FiHome />}
        >
          Về trang chủ
        </Button>
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" py={10} px={{ base: 4, md: 6 }}>
      {/* Category Header */}
      <Box mb={10}>
        <Heading as="h1" size="2xl" mb={4} color="gray.800">
          {categoryName} {categoryInfo?.icon}
        </Heading>
        
        {categoryDescription && (
          <Text fontSize="lg" color="gray.600" mb={6} maxW="3xl">
            {categoryDescription}
          </Text>
        )}
        
        {/* Search and Filter Bar */}
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={4} 
          mb={8}
          alignItems={{ base: 'stretch', md: 'center' }}
        >
          <Box flex={1} maxW={{ md: '400px' }}>
            <HStack spacing={2} bg="white" p={2} borderRadius="md" boxShadow="sm">
              <FiSearch color="gray.400" />
              <Input 
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="unstyled"
                px={2}
              />
              {searchQuery && (
                <IconButton
                  icon={<FiX />}
                  aria-label="Clear search"
                  size="sm"
                  variant="ghost"
                  onClick={() => setSearchQuery('')}
                />
              )}
            </HStack>
          </Box>
          
          <HStack spacing={4}>
            <Select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              maxW="200px"
              size="md"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            
            <ButtonGroup isAttached variant="outline" size="md">
              <IconButton
                icon={<FiGrid />}
                aria-label="Grid view"
                onClick={() => setViewMode('grid')}
                colorScheme={viewMode === 'grid' ? 'blue' : 'gray'}
              />
              <IconButton
                icon={<FiList />}
                aria-label="List view"
                onClick={() => setViewMode('list')}
                colorScheme={viewMode === 'list' ? 'blue' : 'gray'}
              />
            </ButtonGroup>
          </HStack>
        </Flex>
        
        {/* Price Range Filter */}
        <Box mb={8} p={4} bg="gray.50" borderRadius="md">
          <Text fontWeight="medium" mb={2}>
            Khoảng giá: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} VNĐ
          </Text>
          <RangeSlider
            aria-label={['min', 'max']}
            min={0}
            max={10000000}
            step={100000}
            value={priceRange}
            onChange={(val) => setPriceRange(val as [number, number])}
          >
            <RangeSliderTrack bg="gray.200">
              <RangeSliderFilledTrack bg="blue.500" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0} />
            <RangeSliderThumb boxSize={6} index={1} />
          </RangeSlider>
        </Box>
      </Box>
      
      {/* Products Grid */}
      {viewMode === 'grid' ? (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={6}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={(e) => handleAddToCart(e, product)}
            />
          ))}
        </SimpleGrid>
      ) : (
        // List View
        <VStack spacing={4} align="stretch">
          {filteredProducts.map((product) => (
            <Box 
              key={product.id} 
              p={4} 
              borderWidth="1px" 
              borderRadius="md"
              _hover={{ shadow: 'md' }}
              transition="all 0.2s"
            >
              <HStack align="flex-start" spacing={4}>
                <Box flexShrink={0} w="120px" h="120px" bg="gray.100" borderRadius="md" overflow="hidden">
                  <Image 
                    src={
                      Array.isArray(product.images) 
                        ? product.images[0] 
                        : (product.images?.main || '/images/placeholder.jpg')
                    }
                    alt={product.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
                <Box flex={1}>
                  <Text fontWeight="semibold" fontSize="lg" mb={1}>
                    {product.title}
                  </Text>
                  <Text color="blue.600" fontWeight="bold" fontSize="xl" mb={2}>
                    {product.price?.toLocaleString()} VNĐ
                  </Text>
                  <Text color="gray.600" noOfLines={2} mb={3}>
                    {product.short_description}
                  </Text>
                  <HStack spacing={2}>
                    <Button 
                      colorScheme="blue" 
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/san-pham/${product.id}`);
                      }}
                    >
                      Xem chi tiết
                    </Button>
                    <Button 
                      leftIcon={<FiShoppingCart />} 
                      size="sm"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      Thêm vào giỏ
                    </Button>
                  </HStack>
                </Box>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
      
      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <Flex justify="center" mt={10}>
          <HStack spacing={2}>
            <Button size="sm" isDisabled>
              <FiChevronLeft />
            </Button>
            {[1, 2, 3].map((page) => (
              <Button 
                key={page} 
                size="sm" 
                colorScheme={page === 1 ? 'blue' : 'gray'}
              >
                {page}
              </Button>
            ))}
            <Button size="sm">
              <FiChevronRight />
            </Button>
          </HStack>
        </Flex>
      )}
    </Container>
  );
};

export default CategoryPage;
