import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import theme from './theme';
import type { ReactNode } from 'react';

// Components
import Header from './components/Header';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import { ScrollToTop, ScrollToTopButton } from './components/ScrollToTop';

// Import the JSON data
import productData from '../../product_descriptions.json';

// Type definition for the product data
interface ProductData {
  items: Array<{
    id: string;
    title: string;
    price_AUD: number;
    compare_at_price_AUD?: number;
    images: {
      main: string;
      thumb: string;
      placeholder: string;
    };
    short_description?: string;
    attributes?: Record<string, any>;
    category_ids?: string[];
  }>;
}

// Type assertion for the imported JSON data
const typedProductData = productData as ProductData;

const queryClient = new QueryClient();

// Layout component that includes header and footer
const Layout = ({ children, showScrollButton = false }: { children: ReactNode, showScrollButton?: boolean }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <ScrollToTop />
    <TopBar />
    <Header />
    <main style={{ flex: 1, position: 'relative' }}>
      {children}
      {children}
      {showScrollButton && <ScrollToTopButton />}
    </main>
    <Footer />
  </div>
);

// Create the router configuration with v7 future flags
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage /></Layout>,
    errorElement: <Layout><NotFound /></Layout>,
  },
  {
    path: '/san-pham/:id',
    element: <Layout showScrollButton={true}><ProductDetailPage /></Layout>,
    loader: async ({ params }) => {
      const product = typedProductData.items.find(p => p.id === params.id);
      if (!product) {
        throw new Response('Not Found', { status: 404 });
      }
      return { product };
    },
    errorElement: <Layout><NotFound /></Layout>,
  },
  {
    path: '/danh-muc/:slug',
    element: <Layout showScrollButton={true}><CategoryPage /></Layout>,
  },
  {
    path: '/gio-hang',
    element: <Layout><CartPage /></Layout>,
  },
  {
    path: '/thanh-toan',
    element: <Layout><CheckoutPage /></Layout>,
  },
  {
    path: '/dat-hang-thanh-cong',
    element: <Layout><OrderSuccessPage /></Layout>,
  },
  {
    path: '/tim-kiem',
    element: <Layout showScrollButton={true}><SearchPage /></Layout>,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

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
