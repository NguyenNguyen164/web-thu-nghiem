import { Box, Container, Flex, Heading, Text, Button, Image, VStack, HStack, useBreakpointValue } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';

const AboutSection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  return (
    <Box py={20} bg="white">
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
              bg="accent1.500"
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
            <Text color="accent1.500" fontWeight="bold" letterSpacing="wider" mb={4}>
              VỀ CHÚNG TÔI
            </Text>
            <Heading as="h2" size="xl" mb={6} lineHeight="tall">
              Chất lượng tạo nên thương hiệu
            </Heading>
            <Text color="gray.600" mb={6} lineHeight="tall">
              Với hơn 10 năm kinh nghiệm trong lĩnh vực nội thất, chúng tôi tự hào mang đến những sản phẩm chất lượng cao, 
              thiết kế tinh tế và độ bền vượt trội. Mỗi sản phẩm đều được chế tác tỉ mỉ từ những loại gỗ quý hiếm, 
              đảm bảo tính thẩm mỹ và giá trị sử dụng lâu dài.
            </Text>
            
            <HStack spacing={6} mb={8} flexWrap="wrap">
              <VStack align="flex-start" spacing={2} mb={{ base: 4, md: 0 }}>
                <Text fontWeight="bold" fontSize="lg" color="brand.700">Chất lượng hàng đầu</Text>
                <Text color="gray.600" fontSize="sm">Sản phẩm được làm từ gỗ tự nhiên 100%</Text>
              </VStack>
              
              <VStack align="flex-start" spacing={2}>
                <Text fontWeight="bold" fontSize="lg" color="brand.700">Bảo hành dài hạn</Text>
                <Text color="gray.600" fontSize="sm">Bảo hành lên đến 5 năm cho tất cả sản phẩm</Text>
              </VStack>
            </HStack>
            
            <Button 
              colorScheme="accent1" 
              rightIcon={<FiChevronRight />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
              transition="all 0.2s"
            >
              Xem thêm
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default AboutSection;
