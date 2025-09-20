import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl" color="brand.800">
          404 - Không tìm thấy trang
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </Text>
        <Button
          leftIcon={<FiArrowLeft />}
          colorScheme="accent1"
          size="lg"
          mt={4}
          onClick={() => navigate(-1)}
        >
          Quay lại trang trước
        </Button>
        <Button
          as="a"
          href="/"
          variant="outline"
          colorScheme="brand"
          size="lg"
          mt={2}
        >
          Về trang chủ
        </Button>
      </VStack>
    </Container>
  );
};

export default NotFound;
