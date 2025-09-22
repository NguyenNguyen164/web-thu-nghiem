import { Box, Container, SimpleGrid, Text, Heading, Icon, useColorModeValue, HStack } from '@chakra-ui/react';
import { FiTruck, FiShield, FiAward, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const features = [
  {
    icon: FiTruck,
    title: 'Giao hàng toàn quốc',
    description: 'Miễn phí vận chuyển cho đơn hàng từ 10 triệu đồng'
  },
  {
    icon: FiShield,
    title: 'Bảo hành dài hạn',
    description: 'Bảo hành lên đến 5 năm cho tất cả sản phẩm'
  },
  {
    icon: FiAward,
    title: 'Chất lượng đảm bảo',
    description: 'Sản phẩm làm từ gỗ tự nhiên 100%, không pha tạp chất'
  },
  {
    icon: FiHeart,
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ mọi lúc'
  }
];

const FeaturesSection = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <Box py={8} bgGradient="linear(to-b, brand.50, brand.100)">
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Box
                p={4}
                bg={bgColor}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="brand.200"
                textAlign="center"
                h="100%"
                minH="120px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'sm',
                  borderColor: 'brand.300'
                }}
              >
                <HStack spacing={2} align="center" justify="center" mb={1}>
                  <Box 
                    p={1.5}
                    bg="brand.50" 
                    borderRadius="full" 
                    borderWidth="1px"
                    borderColor="brand.200"
                    display="inline-flex"
                  >
                    <Icon as={feature.icon} w={4} h={4} color="brand.600" />
                  </Box>
                  <Heading as="h3" size="xs" color="brand.700" fontWeight="bold" whiteSpace="nowrap">
                    {feature.title}
                  </Heading>
                </HStack>
                <Text color="brand.600" fontSize="xs" lineHeight="shorter">
                  {feature.description}
                </Text>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
