import { Box, Container, SimpleGrid, Flex, Text, Heading, Icon, useColorModeValue } from '@chakra-ui/react';
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
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <Box py={6} bg={bgColor}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Flex
                p={3}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="sm"
                alignItems="center"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-3px)',
                  boxShadow: 'lg',
                  '.feature-icon': {
                    bg: 'accent1.100',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Box
                  className="feature-icon"
                  p={2}
                  bg="accent1.50"
                  color="accent1.600"
                  borderRadius="full"
                  transition="all 0.3s"
                  flexShrink={0}
                  mr={3}
                >
                  <Icon as={feature.icon} boxSize={5} color="accent1.500" />
                </Box>
                <Box>
                  <Heading as="h3" size="sm" mb={1} textAlign="left">{feature.title}</Heading>
                  <Text color="gray.600" fontSize="xs" textAlign="left">{feature.description}</Text>
                </Box>
              </Flex>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
