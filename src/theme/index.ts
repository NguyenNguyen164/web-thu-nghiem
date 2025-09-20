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
    // Màu chính - Bảng màu từ file HTML
    brand: {
      50: '#ffffff',     // Trắng tinh
      100: '#f9f1e8',    // Nền chính - beige sáng, hơi ngả kem (--bg)
      200: '#f3e5d8',    // Màu be nhạt
      300: '#ede0d4',    // Màu viền - be rất nhạt (--border)
      400: '#a1887f',    // Màu phụ - xám nâu (--muted)
      500: '#8d6e63',    // Màu chữ phụ - nâu nhạt (--text-muted)
      600: '#5d4037',    // Màu chữ chính - nâu gỗ đậm (--fg)
      700: '#4e342e',    // Màu nâu đậm
      800: '#3e2723',    // Màu nền topbar - nâu gỗ đậm (--topbar-bg)
      900: '#2e1f1b',    // Màu nâu đen
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
