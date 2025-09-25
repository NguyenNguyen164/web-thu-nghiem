import { ChakraProvider, Box, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider, Navigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import theme from './theme';
import type { ReactNode } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';

// Components
import Header from './components/Header';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import { ScrollToTop, ScrollToTopButton } from './components/ScrollToTop';

const queryClient = new QueryClient();

// Error boundary fallback component
const ErrorFallback = () => {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <Box p={6} textAlign="center">
        <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" minH="200px">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {error.status} - {error.statusText || 'Có lỗi xảy ra'}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Không thể tải trang. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={6} textAlign="center">
      <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" minH="200px">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Đã xảy ra lỗi
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Vui lòng tải lại trang hoặc thử lại sau.
        </AlertDescription>
      </Alert>
    </Box>
  );
};

// Layout component that includes header and footer
const Layout = ({ children, showScrollButton = false }: { children: ReactNode, showScrollButton?: boolean }) => (
  <Box width="100%" maxW="1920px" mx="auto" flex={1} display="flex" flexDirection="column" bg="brand.50">
    <ScrollToTop />
    <TopBar />
    <Header />
    <Box flex={1} position="relative" width="100%" px={{ base: 4, md: 6, lg: 8 }}>
      <main style={{ width: '100%' }}>
        {children}
        {showScrollButton && <ScrollToTopButton />}
      </main>
    </Box>
    <Footer />
  </Box>
);

// Create the router configuration with error boundaries for each route
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout><HomePage /></Layout>
        </ErrorBoundary>
      ),
      errorElement: <ErrorFallback />,
    },
    {
      path: '/products',
      element: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout><ProductsPage /></Layout>
        </ErrorBoundary>
      ),
      errorElement: <ErrorFallback />,
    },
    {
      path: '/san-pham/:id',
      element: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout><ProductDetail /></Layout>
        </ErrorBoundary>
      ),
      errorElement: <ErrorFallback />,
    },
    {
      path: '/danh-muc/:slug',
      element: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout showScrollButton={true}><CategoryPage /></Layout>
        </ErrorBoundary>
      ),
      errorElement: <ErrorFallback />,
    },
    {
      path: '/gio-hang',
      element: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout><CartPage /></Layout>
        </ErrorBoundary>
      ),
      errorElement: <ErrorFallback />,
    },
    {
      path: '/thanh-toan',
      element: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout><CheckoutPage /></Layout>
        </ErrorBoundary>
      ),
      errorElement: <ErrorFallback />,
    },
    {
      path: '/dat-hang-thanh-cong',
      element: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout><OrderSuccessPage /></Layout>
        </ErrorBoundary>
      ),
      errorElement: <ErrorFallback />,
    },
    {
      path: '/tim-kiem',
      element: (
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Layout showScrollButton={true}><SearchPage /></Layout>
        </ErrorBoundary>
      ),
      errorElement: <ErrorFallback />,
    },
    {
      path: '/404',
      element: <Layout><NotFound /></Layout>,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ],
  {
    basename: import.meta.env.PROD ? '/web-thu-nghiem' : '/',
    future: {
      // Future flags for React Router v7
      // These will be used when upgrading to v7
    }
  }
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
