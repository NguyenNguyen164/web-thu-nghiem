import { Box, Button, Container, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, brand.400, brand.600)',
    'linear(to-r, brand.600, brand.800)'
  );

  return (
    <Box bg={useColorModeValue('beige.50', 'gray.900')} py={20}>
      <Container maxW="container.xl">
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: 'column', lg: 'row' }}
          gap={8}
        >
          <Stack spacing={6} maxW="2xl" textAlign={{ base: 'center', lg: 'left' }}>
            <Heading
              as="h1"
              size="3xl"
              fontWeight="bold"
              lineHeight="1.2"
              color={useColorModeValue('brand.700', 'white')}
            >
              Nội thất gỗ cao cấp
              <Box as="span" color="accent1.500">
                {' '}
                cho ngôi nhà của bạn
              </Box>
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color={useColorModeValue('gray.600', 'gray.300')}
              maxW="2xl"
            >
              Khám phá bộ sưu tập nội thất gỗ tự nhiên cao cấp, được chế tác thủ công tỉ mỉ, mang đến vẻ đẹp tinh tế và sự ấm cúng cho không gian sống của bạn.
            </Text>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
              justify={{ base: 'center', lg: 'flex-start' }}
            >
              <Button
                as={RouterLink}
                to="/products"
                colorScheme="accent1"
                size="lg"
                px={8}
              >
                Mua sắm ngay
              </Button>
              <Button
                as={RouterLink}
                to="/about"
                variant="outline"
                size="lg"
                px={8}
              >
                Tìm hiểu thêm
              </Button>
            </Stack>
          </Stack>
          <Box
            w={{ base: 'full', lg: '50%' }}
            h={{ base: '300px', md: '400px', lg: '500px' }}
            bg="gray.200"
            borderRadius="xl"
            overflow="hidden"
            position="relative"
          >
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-r, beige.50 0%, transparent 30%, transparent 70%, beige.50 100%)"
              zIndex={1}
            />
            <Box
              w="full"
              h="full"
              bgImage="url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
              bgSize="cover"
              bgPosition="center"
              filter="grayscale(20%)"
              opacity={0.9}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
