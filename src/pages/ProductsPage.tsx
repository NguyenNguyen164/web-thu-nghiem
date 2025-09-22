import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Input,
  Select,
  Text,
  Flex,
  Button,
  Skeleton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  Checkbox,
  Radio,
  RadioGroup,
  IconButton,
  HStack,
  useToast,
  Grid,
  GridItem,
  Divider
} from '@chakra-ui/react';
import { FiX, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { fetchProducts, searchProducts } from '../services/productService';
import type { Product, Category } from '../types/product';

// Sort options for the dropdown
const SORT_OPTIONS = [
  { value: 'featured', label: 'Nổi bật' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'name-asc', label: 'Tên A-Z' },
];

const ProductsPage = () => {
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch products and categories
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchProducts();
      setProducts(data.products || []);
      setCategories(data.categories || []);
      
      // Apply initial filters from URL
      const query = searchParams.get('q') || '';
      const category = searchParams.get('category');
      
      if (query) {
        setSearchQuery(query);
        const results = await searchProducts(query);
        setFilteredProducts(results);
      } else {
        setFilteredProducts(data.products || []);
      }
      
      if (category) {
        setSelectedCategories([category]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, toast]);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Apply filters when search params change
  useEffect(() => {
    if (products.length > 0) {
      applyFilters(products, searchParams);
    }
  }, [searchParams, products]);

  // Apply filters based on URL search params
  const applyFilters = (products: Product[], params: URLSearchParams) => {
    let result = [...products];
    
    // Search query filter
    const search = params.get('q');
    if (search) {
      setSearchQuery(search);
      result = result.filter(product => 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.attributes.material?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Category filter
    const category = params.get('category');
    if (category) {
      const categoryList = category.split(',');
      setSelectedCategories(categoryList);
      result = result.filter(product => 
        categoryList.some(cat => product.categories.includes(cat))
      );
    }
    
    // Price range filter
    const price = params.get('price');
    if (price) {
      setPriceRange(price);
      switch (price) {
        case 'under-5m':
          result = result.filter(p => p.price < 5000000);
          break;
        case '5m-10m':
          result = result.filter(p => p.price >= 5000000 && p.price < 10000000);
          break;
        case '10m-20m':
          result = result.filter(p => p.price >= 10000000 && p.price < 20000000);
          break;
        case 'over-20m':
          result = result.filter(p => p.price >= 20000000);
          break;
        default:
          break;
      }
    }
    
    // Sorting
    const sort = params.get('sort') || 'featured';
    setSortBy(sort);
    result = sortProducts(result, sort);
    
    setFilteredProducts(result);
  };

  // Sort products based on selected option
  const sortProducts = (products: Product[], sortOption: string) => {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'name-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'featured':
      default:
        // Featured products first, then sort by name
        return sorted.sort((a, b) => {
          if (a.attributes?.is_featured && !b.attributes?.is_featured) return -1;
          if (!a.attributes?.is_featured && b.attributes?.is_featured) return 1;
          return a.title.localeCompare(b.title);
        });
    }
  };

  // Handle search
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    setSearchParams(params);
  }, [searchQuery, searchParams, setSearchParams]);

  // Handle category filter change
  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    let categories = [...selectedCategories];
    
    if (categories.includes(categoryId)) {
      categories = categories.filter(id => id !== categoryId);
    } else {
      categories.push(categoryId);
    }
    
    if (categories.length > 0) {
      params.set('category', categories.join(','));
    } else {
      params.delete('category');
    }
    
    setSelectedCategories(categories);
    setSearchParams(params);
  };

  // Handle price range change
  const handlePriceRangeChange = (range: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (range !== 'all') {
      params.set('price', range);
    } else {
      params.delete('price');
    }
    
    setPriceRange(range);
    setSearchParams(params);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    setSortBy(value);
    setSearchParams(params);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange('all');
    setSortBy('featured');
    setSearchParams({});
  };

  
  // Render product grid with auto-scroll
  const renderProductGrid = () => {
    // Duplicate products to create infinite scroll effect
    const duplicatedProducts = [...filteredProducts, ...filteredProducts];
    
    return (
      <Box position="relative" overflow="hidden" py={4}>
        <Box
          className="scroll-container"
          sx={{
            display: 'flex',
            overflow: 'hidden',
            width: '100%',
            '&:hover': {
              '& .scroll-content': {
                animationPlayState: 'paused',
              }
            },
            '@keyframes scroll': {
              '0%': {
                transform: 'translateX(0)',
              },
              '100%': {
                transform: 'translateX(-50%)',
              },
            },
          }}
        >
          <Box
            className="scroll-content"
            display="flex"
            sx={{
              animation: 'scroll 30s linear infinite',
              '&:hover': {
                animationPlayState: 'paused',
              },
            }}
          >
            {duplicatedProducts.map((product, index) => (
              <Box 
                key={`${product.id}-${index}`} 
                minW={{ base: '280px', md: '320px' }}
                px={3}
                py={2}
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'lg',
                }}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  };

  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
        lg: viewMode === 'grid' ? 'repeat(4, 1fr)' : '1fr',
      }}
      gap={6}
    >
      {[...Array(8)].map((_, index) => (
        <GridItem key={index} colSpan={1}>
          <Skeleton height="400px" borderRadius="lg" />
        </GridItem>
      ))}
    </Grid>
  );

  // Render no results message
  const renderNoResults = () => (
    <Box textAlign="center" py={20}>
      <Text fontSize="xl" fontWeight="medium" mb={4}>
        Không tìm thấy sản phẩm nào phù hợp
      </Text>
      <Text color="gray.600" mb={6}>
        Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác
      </Text>
      <Button colorScheme="blue" onClick={clearFilters}>
        Xóa bộ lọc
      </Button>
    </Box>
  );

  // Render filters sidebar
  const renderFilters = () => (
    <VStack spacing={6} align="stretch">
      {/* Categories */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" mb={3}>
          Danh mục
        </Text>
        <VStack align="stretch" spacing={2} maxH="200px" overflowY="auto" pr={2}>
          {categories.map(category => (
            <Checkbox
              key={category.id}
              isChecked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              colorScheme="blue"
            >
              {category.name}
            </Checkbox>
          ))}
        </VStack>
      </Box>

      <Divider />

      {/* Price Range */}
      <Box>
        <Text fontSize="lg" fontWeight="semibold" mb={3}>
          Mức giá
        </Text>
        <RadioGroup value={priceRange} onChange={handlePriceRangeChange}>
          <VStack align="stretch" spacing={2}>
            <Radio value="all" colorScheme="blue">
              Tất cả
            </Radio>
            <Radio value="under-5m" colorScheme="blue">
              Dưới 5 triệu
            </Radio>
            <Radio value="5m-10m" colorScheme="blue">
              5 - 10 triệu
            </Radio>
            <Radio value="10m-20m" colorScheme="blue">
              10 - 20 triệu
            </Radio>
            <Radio value="over-20m" colorScheme="blue">
              Trên 20 triệu
            </Radio>
          </VStack>
        </RadioGroup>
      </Box>
    </VStack>
  );

  return (
    <Container maxW="container.xl" py={8}>
      {/* Page Header */}
      <Box mb={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Sản phẩm
        </Text>
        <Text color="gray.600">
          {filteredProducts.length} sản phẩm
          {searchParams.get('q') && ` cho "${searchParams.get('q')}"`}
        </Text>
      </Box>

      <Box display={{ md: 'flex' }} gap={8}>
        {/* Desktop Filters */}
        <Box display={{ base: 'none', md: 'block' }} w="250px" flexShrink={0}>
          <Box position="sticky" top="100px">
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="semibold">
                Bộ lọc
              </Text>
              <Button
                variant="link"
                colorScheme="blue"
                size="sm"
                onClick={clearFilters}
              >
                Xóa tất cả
              </Button>
            </Flex>
            {renderFilters()}
          </Box>
        </Box>

        {/* Main Content */}
        <Box flex={1}>
          {/* Search and Sort Bar */}
          <Box
            bg="white"
            p={4}
            borderRadius="lg"
            boxShadow="sm"
            mb={6}
            display="flex"
            flexDirection={{ base: 'column', sm: 'row' }}
            gap={4}
          >
            <Box flex={1} as="form" onSubmit={handleSearch}>
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                size="lg"
              />
            </Box>
            
            <HStack spacing={2}>
              <Select
                value={sortBy}
                onChange={e => handleSortChange(e.target.value)}
                width={{ base: '100%', sm: '200px' }}
                size="lg"
              >
                <option value="featured">Sắp xếp: Nổi bật</option>
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name-asc">Tên: A-Z</option>
                <option value="name-desc">Tên: Z-A</option>
              </Select>
              
              <IconButton
                aria-label="Toggle grid view"
                icon={<FiGrid />}
                onClick={() => setViewMode('grid')}
                colorScheme={viewMode === 'grid' ? 'blue' : 'gray'}
                display={{ base: 'none', md: 'flex' }}
              />
              <IconButton
                aria-label="Toggle list view"
                icon={<FiList />}
                onClick={() => setViewMode('list')}
                colorScheme={viewMode === 'list' ? 'blue' : 'gray'}
                display={{ base: 'none', md: 'flex' }}
              />
              <Button
                leftIcon={<FiFilter />}
                onClick={onOpen}
                display={{ base: 'flex', md: 'none' }}
              >
                Bộ lọc
              </Button>
            </HStack>
          </Box>

          {/* Products Grid */}
          <Box>
            {isLoading ? (
              renderLoadingSkeleton()
            ) : filteredProducts.length > 0 ? (
              renderProductGrid()
            ) : (
              renderNoResults()
            )}
          </Box>
        </Box>
      </Box>

      {/* Mobile Filters Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Bộ lọc</DrawerHeader>
          <DrawerBody p={4}>
            <VStack spacing={6} align="stretch">
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={clearFilters}
                leftIcon={<FiX />}
              >
                Xóa bộ lọc
              </Button>
              {renderFilters()}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default ProductsPage;
