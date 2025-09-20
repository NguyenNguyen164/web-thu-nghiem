import { Box, Button, Container, Flex, Grid, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

// Dữ liệu mẫu sản phẩm
const products = [
  {
    id: 1,
    name: 'Bàn ăn gỗ sồi',
    price: '12.990.000đ',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    name: 'Ghế gỗ hiện đại',
    price: '3.490.000đ',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1507207611509-ec012433ff52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    name: 'Tủ quần áo gỗ óc chó',
    price: '25.990.000đ',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556228453-efd6d1f7f7c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 4,
    name: 'Giường ngủ gỗ sồi',
    price: '18.990.000đ',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

const ProductCard = ({ product }) => {
  const { name, price, rating, image } = product;
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg',
        transition: 'all 0.3s',
      }}
    >
      <Box h="200px" overflow="hidden">
        <Image
          src={image}
          alt={name}
          w="100%"
          h="100%"
          objectFit="cover"
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.5s ease',
          }}
        />
      </Box>
      <Box p={5}>
        <Flex justify="space-between" align="center" mb={2}>
          <Heading as="h3" size="md" noOfLines={1} color={useColorModeValue('brand.700', 'white')}>
            {name}
          </Heading>
          <Flex align="center">
            <StarIcon color="yellow.400" mr={1} />
            <Text>{rating}</Text>
          </Flex>
        </Flex>
        <Text fontSize="xl" fontWeight="bold" color="accent1.500" mb={4}>
          {price}
        </Text>
        <Button
          as={RouterLink}
          to={`/products/${product.id}`}
          colorScheme="accent1"
          width="full"
          variant="outline"
        >
          Xem chi tiết
        </Button>
      </Box>
    </Box>
  );
};

const Products = () => {
  const bg = useColorModeValue('white', 'gray.900');
  const headingColor = useColorModeValue('brand.700', 'white');

  return (
    <Box py={20} bg={bg} id="products">
      <Container maxW="container.xl">
        <Stack spacing={12}>
          <Box textAlign="center">
            <Text color="accent1.500" fontWeight="semibold" mb={2}>
              Sản phẩm nổi bật
            </Text>
            <Heading as="h2" size="2xl" color={headingColor} mb={4}>
              Bộ sưu tập mới nhất
            </Heading>
            <Text maxW="2xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
              Khám phá những mẫu nội thất gỗ cao cấp được chế tác tỉ mỉ, kết hợp giữa vẻ đẹp truyền thống và phong cách hiện đại.
            </Text>
          </Box>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={8}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>

          <Box textAlign="center" mt={8}>
            <Button
              as={RouterLink}
              to="/products"
              colorScheme="accent1"
              size="lg"
              px={8}
            >
              Xem tất cả sản phẩm
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Products;
