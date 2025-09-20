import { Box, Container, Heading, Text, VStack, Flex, Avatar } from '@chakra-ui/react';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Chị Ngọc Anh',
    role: 'Khách hàng thân thiết',
    content: 'Tôi rất hài lòng với sản phẩm của Chocolate Wood. Chất gỗ tốt, thiết kế tinh tế và giá cả hợp lý. Đội ngũ tư vấn nhiệt tình, giao hàng đúng hẹn.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Anh Minh Đức',
    role: 'Kiến trúc sư',
    content: 'Là một kiến trúc sư, tôi đánh giá cao sự tinh tế trong từng chi tiết sản phẩm của Chocolate Wood. Chất lượng gỗ rất tốt, độ bền cao và phù hợp với nhiều phong cách thiết kế.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5
  },
  {
    id: 3,
    name: 'Chị Thanh Hà',
    role: 'Chủ nhà hàng',
    content: 'Tôi đã mua bàn ghế gỗ cho nhà hàng của mình tại đây và thực sự ấn tượng với chất lượng sản phẩm. Khách hàng của tôi cũng rất thích không gian ấm cúng mà bộ bàn ghế gỗ mang lại.',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 4
  }
];

const TestimonialsSection = () => {
  
  return (
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing={2} mb={12} textAlign="center">
          <Text color="accent1.500" fontWeight="bold" letterSpacing="wider">ĐÁNH GIÁ TỪ KHÁCH HÀNG</Text>
          <Heading as="h2" size="xl" mb={2}>Khách hàng nói gì về chúng tôi</Heading>
          <Text color="gray.600" maxW="2xl">Những phản hồi chân thực từ khách hàng đã sử dụng sản phẩm của chúng tôi</Text>
        </VStack>
        
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={8}
          justify="center"
        >
          {testimonials.map((testimonial) => (
            <Box
              key={testimonial.id}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: testimonial.id * 0.1,
                ease: 'easeOut' 
              } as any}
              bg="white"
              p={8}
              borderRadius="lg"
              boxShadow="md"
              flex={1}
              minW={{ base: '100%', md: '300px' }}
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                bg: 'accent1.500',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            >
              <Box color="accent1.300" fontSize="2xl" mb={4}>
                <FaQuoteLeft />
              </Box>
              <Text color="gray.600" mb={6} fontStyle="italic">
                {testimonial.content}
              </Text>
              <Flex align="center" mt="auto">
                <Avatar 
                  name={testimonial.name} 
                  src={testimonial.avatar} 
                  size="md"
                  mr={4}
                />
                <Box>
                  <Text fontWeight="bold" color="gray.800">{testimonial.name}</Text>
                  <Text fontSize="sm" color="gray.500">{testimonial.role}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
