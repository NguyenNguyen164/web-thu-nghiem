import { Box, Container, Flex, Text, Link, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiPhone, FiTruck } from 'react-icons/fi';

const TopBar = () => {
  const bgColor = useColorModeValue('brand.900', 'gray.800');
  const textColor = 'whiteAlpha.900';
  const hoverColor = 'accent1.200';

  return (
    <Box bg={bgColor} color={textColor} py={2} fontSize="sm">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Flex gap={6}>
            <Link href="tel:0123456789" _hover={{ color: hoverColor }} display="flex" alignItems="center" gap={2}>
              <Icon as={FiPhone} />
              <Text>0123 456 789</Text>
            </Link>
            <Link href="#" _hover={{ color: hoverColor }} display={{ base: 'none', md: 'flex' }} alignItems="center" gap={2}>
              <Icon as={FiTruck} />
              <Text>Miễn phí vận chuyển cho đơn hàng từ 10 triệu</Text>
            </Link>
          </Flex>
          
          <Flex gap={4}>
            <Link href="#" _hover={{ color: hoverColor }}>Tài khoản</Link>
            <Link href="#" _hover={{ color: hoverColor }}>Yêu thích</Link>
            <Link href="#" _hover={{ color: hoverColor }}>Đăng nhập / Đăng ký</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default TopBar;
