import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
  },
  colors: {
    // Màu chủ đạo - Bảng màu gỗ ấm áp
    brand: {
      50: '#fffaf5',     // Màu nền sáng nhất - kem nhạt
      100: '#f8f1e8',    // Màu nền chính - màu gỗ sồi sáng
      200: '#f0e4d8',    // Màu viền nhạt - gỗ sồi nhạt
      300: '#e6d5c3',    // Màu viền - gỗ sồi trung bình
      400: '#d4b999',    // Màu gỗ sồi ấm
      500: '#c19a6b',    // Màu gỗ sồi vàng nâu
      600: '#8b6b43',    // Màu gỗ sồi trung bình đậm
      700: '#6b4e36',    // Màu gỗ sồi đậm
      800: '#4e3629',    // Màu gỗ hạt dẻ đậm
      900: '#362419',    // Màu gỗ óc chó đậm
    },
    // Màu nhấn chính - Xanh lá (--accent-1)
    accent1: {
      50: '#f1f8f5',
      100: '#e6f5ed',
      200: '#c8e6d9',
      300: '#81c784',    // Màu nhấn chính
      400: '#66bb6a',    // Màu hover
      500: '#4caf50',
    },
    // Màu nhấn phụ - Vàng (--accent-2)
    accent2: {
      50: '#fff8e1',
      100: '#fff3c0',
      200: '#ffec99',
      300: '#ffe082',
      400: '#ffd54f',
      500: '#fbc02d',    // Màu nhấn phụ
      600: '#ffb300',    // Màu hover
    },
    // Màu nền section (--section-bg)
    section: {
      bg: '#ffffff',
    },
    // Màu hover nhẹ (--hover-light)
    hover: {
      light: 'rgba(129, 199, 132, 0.1)'
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
        _hover: {
          transform: 'translateY(-1px)',
          boxShadow: 'md',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      variants: {
        solid: () => ({
          bg: 'accent1.400',
          color: 'white',
          _hover: {
            bg: 'accent1.500',
          },
        }),
        outline: () => ({
          borderColor: 'brand.500',
          color: 'brand.600',
          _hover: {
            bg: 'brand.50',
          },
        }),
      },
      sizes: {
        lg: {
          h: '48px',
          minW: '140px',
          fontSize: 'md',
          px: 8,
        },
      },
      defaultProps: {
        colorScheme: 'accent1',
        size: 'lg',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          borderColor: 'gray.200',
          _focus: {
            borderColor: 'accent1.400',
            boxShadow: '0 0 0 1px var(--chakra-colors-accent1-400)',
          },
        },
      },
      sizes: {
        lg: {
          field: {
            h: '48px',
            fontSize: 'md',
          },
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 6 },
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        color: 'brand.800',
        lineHeight: 'tall',
        scrollBehavior: 'smooth',
        bg: 'white', // Thay đổi từ beige.50 sang trắng tinh
      },
      '::selection': {
        bg: 'accent1.100',
        color: 'brand.700',
      },
      'h1, h2, h3, h4, h5, h6': {
        color: 'brand.700',
        fontWeight: 'bold',
        lineHeight: '1.2',
      },
      a: {
        color: 'accent1.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  shadows: {
    sm: '0 2px 8px rgba(93, 64, 55, 0.05)',
    md: '0 4px 12px rgba(0,0,0,0.05)',
    lg: '0 8px 24px rgba(0,0,0,0.08)',
  },
};

export default extendTheme(theme);
