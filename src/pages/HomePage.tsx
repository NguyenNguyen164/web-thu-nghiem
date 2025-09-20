import { Box, Container, VStack } from '@chakra-ui/react';
import HeroSection from '../components/HeroSection';
import ProductsByCategory from '../components/ProductsByCategory';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ProductCategories from '../components/ProductCategories';

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <Container maxW="container.xl" py={16}>
        <VStack spacing={20}>
          <ProductCategories />
          <ProductsByCategory />
          <AboutSection />
          <FeaturesSection />
          <TestimonialsSection />
        </VStack>
      </Container>
    </Box>
  );
};

export default HomePage;
