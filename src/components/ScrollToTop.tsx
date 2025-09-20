import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      as="button"
      onClick={scrollToTop}
      position="fixed"
      bottom="30px"
      right="30px"
      zIndex={1000}
      bg="accent1.500"
      color="white"
      width="50px"
      height="50px"
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="lg"
      _hover={{
        bg: 'accent1.600',
        transform: 'translateY(-2px)',
      }}
      _active={{
        bg: 'accent1.700',
      }}
      transition="all 0.2s"
      aria-label="Lên đầu trang"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </Box>
  );
};

import { Box } from '@chakra-ui/react';
