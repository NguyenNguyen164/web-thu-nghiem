import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f9f1e8',  // Light beige
      100: '#f2e2d1',
      200: '#e6c5a3',
      300: '#d9a875',
      400: '#cd8b47',
      500: '#c07e3a',
      600: '#9a652e',
      700: '#734c23',
      800: '#4d3217',
      900: '#26190c',
    },
    accent1: {
      50: '#f0f9f0',
      100: '#d9f0db',
      200: '#b4e1b7',
      300: '#8ed293',
      400: '#69c36f',
      500: '#81c784', // Main accent green
      600: '#5d9f60',
      700: '#467848',
      800: '#2f5130',
      900: '#172918',
    },
    accent2: {
      50: '#fffde7',
      100: '#fff9c4',
      200: '#fff59d',
      300: '#fff176',
      400: '#ffee58',
      500: '#fbc02d', // Yellow accent
      600: '#f9a825',
      700: '#f57f17',
      800: '#f57c00',
      900: '#ff6f00',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'full',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'accent1.500' : 'accent1.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'accent1.600' : 'accent1.600',
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'accent1.700' : 'accent1.700',
          },
        }),
        outline: (props: any) => ({
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        }),
        ghost: (props: any) => ({
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'gray.200',
            _hover: {
              borderColor: 'accent1.500',
            },
            _focus: {
              borderColor: 'accent1.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-accent1-500)',
            },
          },
        },
      },
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: 'brand.50',
        color: 'brand.900',
        lineHeight: 'tall',
      },
      a: {
        color: 'accent1.500',
        _hover: {
          textDecoration: 'none',
          color: 'accent1.600',
        },
      },
    }),
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Open Sans", sans-serif',
  },
});

export default theme;
