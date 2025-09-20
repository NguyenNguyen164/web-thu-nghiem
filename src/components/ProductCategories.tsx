import { Box, Container, SimpleGrid, VStack, Heading, Text, Image, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const categories = [
  {
    id: 'cat_tables',
    name: 'Bàn',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    count: 4,
    link: '/danh-muc/ban'
  },
  {
    id: 'cat_chairs',
    name: 'Ghế',
    image: 'https://images.unsplash.com/photo-1507207611509-ec012433ff52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    count: 2,
    link: '/danh-muc/ghe'
  },
  {
    id: 'cat_sofas',
    name: 'Sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    count: 4,
    link: '/danh-muc/sofa'
  },
  {
    id: 'cat_tv_units',
    name: 'Tủ tivi',
    image: 'https://images.unsplash.com/photo-1556228453-efd6d1f7f7c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    count: 4,
    link: '/danh-muc/tu-tivi'
  },
];

const ProductCategories = () => {
  return (
    <Box py={8} bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing={2} mb={10} textAlign="center">
          <Text color="accent1.500" fontWeight="bold" letterSpacing="wider">DANH MỤC SẢN PHẨM</Text>
          <Heading as="h2" size="xl" mb={2}>Khám phá theo danh mục</Heading>
          <Text color="gray.600" maxW="2xl">Lựa chọn từ các danh mục sản phẩm đa dạng của chúng tôi</Text>
        </VStack>
        
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {categories.map((category) => (
            <Box
              key={category.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: category.id * 0.1 
              } as any} // Sử dụng type assertion tạm thời
              position="relative"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              _hover={{
                '& .category-overlay': {
                  opacity: 1,
                },
                '& .category-content': {
                  transform: 'translateY(0)',
                },
              }}
            >
              <Image
                src={category.image}
                alt={category.name}
                objectFit="cover"
                h="200px"
                w="100%"
              />
              <Box
                className="category-overlay"
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgGradient="linear(to-t, blackAlpha.700, transparent 50%)"
                opacity={0.8}
                transition="all 0.3s ease"
              />
              <Box
                className="category-content"
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                p={4}
                color="white"
                transform="translateY(20px)"
                transition="all 0.3s ease"
              >
                <Heading as="h3" size="lg" mb={1}>
                  {category.name}
                </Heading>
                <Text fontSize="sm" mb={4}>
                  {category.count} sản phẩm
                </Text>
                <Button
                  as={RouterLink}
                  to={category.link}
                  variant="outline"
                  colorScheme="white"
                  size="sm"
                  _hover={{
                    bg: 'white',
                    color: 'gray.800',
                  }}
                >
                  Xem ngay
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ProductCategories;
