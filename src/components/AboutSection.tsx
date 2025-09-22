import { Box, Container, Flex, Heading, Text, Button, Image, VStack, HStack } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';

const AboutSection = () => {
  return (
    <Box py={20} bgGradient="linear(to-b, brand.50, brand.100)" position="relative" overflow="hidden">
      {/* Decorative elements */}
      <Box 
        position="absolute" 
        top="-10%" 
        right="-5%" 
        w="300px" 
        h="300px" 
        bg="brand.200" 
        opacity={0.1} 
        borderRadius="full"
        filter="blur(40px)"
      />
      <Container maxW="container.xl">
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          align="center"
          gap={12}
        >
          <Box flex={1} position="relative">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Về chúng tôi"
              borderRadius="lg"
              boxShadow="xl"
            />
            <Box
              position="absolute"
              bottom={-6}
              right={-6}
              bg="brand.600"
              color="white"
              p={4}
              borderRadius="full"
              boxShadow="lg"
              zIndex={1}
              display={{ base: 'none', md: 'block' }}
            >
              <Text fontSize="4xl" fontWeight="bold">10+</Text>
              <Text fontSize="sm">Năm kinh nghiệm</Text>
            </Box>
          </Box>
          
          <Box flex={1}>
            <VStack align="flex-start" spacing={6} position="relative" zIndex={1}>
              <Box>
                <Text color="brand.600" fontWeight="bold" mb={2}>GIỚI THIỆU</Text>
                <Heading as="h2" size="2xl" color="brand.800" mb={4}>
                  Nội Thất Gỗ Tự Nhiên Cao Cấp
                </Heading>
                <Box h="4px" w="80px" bg="brand.500" mb={6}></Box>
              </Box>
              
              <Text color="brand.700" lineHeight="tall" fontSize="lg">
                Với hơn 10 năm kinh nghiệm trong lĩnh vực sản xuất và thi công nội thất gỗ, chúng tôi tự hào mang đến những sản phẩm chất lượng cao, được chế tác tinh xảo từ những loại gỗ tự nhiên quý hiếm.
              </Text>
              
              <HStack spacing={6} mb={8} flexWrap="wrap">
                <VStack align="flex-start" spacing={2} mb={{ base: 4, md: 0 }}>
                  <Text fontWeight="bold" fontSize="lg" color="brand.700">Chất lượng hàng đầu</Text>
                  <Text color="brand.600" fontSize="sm">Sản phẩm được làm từ gỗ tự nhiên 100%</Text>
                </VStack>
                
                <VStack align="flex-start" spacing={2}>
                  <Text fontWeight="bold" fontSize="lg" color="brand.700">Bảo hành dài hạn</Text>
                  <Text color="brand.600" fontSize="sm">Bảo hành lên đến 5 năm cho tất cả sản phẩm</Text>
                </VStack>
              </HStack>
              
              <Button 
                rightIcon={<FiChevronRight />} 
                bg="brand.600"
                color="white"
                size="lg"
                _hover={{
                  transform: 'translateX(5px)',
                  bg: 'brand.700',
                  boxShadow: 'md'
                }}
                transition="all 0.3s"
              >
                Xem thêm
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default AboutSection;
