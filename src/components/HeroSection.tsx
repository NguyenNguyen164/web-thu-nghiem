import { Box, Container, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';

const HeroSection = () => {
  const headingSize = { base: '2xl', md: '4xl' };
  
  return (
    <Box 
      bgImage="url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      py={{ base: 16, md: 32 }}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'rgba(0,0,0,0.2)',
        background: 'linear-gradient(135deg, rgba(54,36,25,0.6) 0%, rgba(193,154,107,0.2) 100%)',
        zIndex: 1
      }}
    >
      <Container maxW="container.xl" position="relative" zIndex={2}>
        <Box maxW={{ base: '100%', md: '50%' }}>
          <Text color="accent1.300" fontWeight="bold" mb={2} letterSpacing="wider">SANG TRỌNG & ĐẲNG CẤP</Text>
          <Heading 
            as="h1" 
            size={headingSize} 
            color="white" 
            mb={6} 
            lineHeight="1.2"
            textTransform="uppercase"
            letterSpacing="tighter"
          >
            Nội thất gỗ cao cấp
          </Heading>
          <Text color="whiteAlpha.800" mb={8} fontSize={{ base: 'md', md: 'lg' }}>
            Không gian sống đẳng cấp với các sản phẩm nội thất gỗ tự nhiên được chế tác tinh xảo
          </Text>
          <Flex gap={4}>
            <Button 
              colorScheme="accent1" 
              size="lg" 
              rightIcon={<FiChevronRight />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
              transition="all 0.2s"
            >
              Mua ngay
            </Button>
            <Button 
              variant="outline" 
              colorScheme="whiteAlpha" 
              size="lg"
              _hover={{
                bg: 'rgba(255,255,255,0.1)',
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
              transition="all 0.2s"
            >
              Xem thêm
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
