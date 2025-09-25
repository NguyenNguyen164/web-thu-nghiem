import { 
  Box, 
  Container, 
  Flex, 
  Grid, 
  GridItem, 
  Heading, 
  Link, 
  Text, 
  useColorModeValue, 
  Input, 
  InputGroup, 
  InputRightElement, 
  IconButton,
  VStack,
  HStack
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaPaperPlane 
} from 'react-icons/fa';

const Footer = () => {
  const bg = useColorModeValue('brand.900', 'gray.900');
  const color = useColorModeValue('white', 'gray.200');
  const hoverColor = useColorModeValue('accent1.300', 'accent1.400');
  const inputBg = useColorModeValue('rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)');

  interface SocialButtonProps {
    children: React.ReactNode;
    label: string;
    href: string;
  }

  const SocialButton = ({ children, label, href }: SocialButtonProps) => {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        w={10}
        h={10}
        rounded="full"
        bg="rgba(255, 255, 255, 0.1)"
        color="white"
        _hover={{
          bg: 'rgba(255, 255, 255, 0.2)',
          transform: 'translateY(-2px)',
          color: hoverColor,
        }}
        transition="all 0.3s"
        aria-label={label}
      >
        {children}
      </Link>
    );
  };

  interface FooterLinkProps {
    children: React.ReactNode;
    to: string;
  }

  const FooterLink = ({ children, to = '#' }: FooterLinkProps) => (
    <Link
      as={RouterLink}
      to={to}
      color={color}
      opacity={0.8}
      _hover={{
        color: hoverColor,
        textDecoration: 'none',
        pl: 1,
      }}
      transition="all 0.3s"
    >
      {children}
    </Link>
  );

  return (
    <Box as="footer" bg={bg} color={color} pt={16} pb={8} position="relative" zIndex={1}>
      <Box 
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="url('https://images.unsplash.com/photo-1595425964073-9bdc0db33569?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
        bgSize="cover"
        bgPosition="center"
        opacity={0.05}
        zIndex={-1}
      />
      
      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
          gap={8}
          mb={12}
        >
          {/* Về chúng tôi */}
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <Heading as="h3" size="md" mb={6} color="white" position="relative" display="inline-block"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '50px',
                height: '3px',
                bg: 'accent1.500',
                borderRadius: 'full'
              }}
            >
              Về chúng tôi
            </Heading>
            <Text mb={4} opacity={0.8} lineHeight="tall">
              Chocolate Wood tự hào là thương hiệu nội thất gỗ cao cấp hàng đầu Việt Nam, mang đến không gian sống sang trọng và đẳng cấp.
            </Text>
            <Flex gap={3} mt={6}>
              <SocialButton label="Facebook" href="https://facebook.com">
                <FaFacebook />
              </SocialButton>
              <SocialButton label="Instagram" href="https://instagram.com">
                <FaInstagram />
              </SocialButton>
              <SocialButton label="Twitter" href="https://twitter.com">
                <FaTwitter />
              </SocialButton>
              <SocialButton label="Youtube" href="https://youtube.com">
                <FaYoutube />
              </SocialButton>
            </Flex>
          </GridItem>

          {/* Liên kết nhanh */}
          <GridItem>
            <Heading as="h3" size="md" mb={6} color="white" position="relative" display="inline-block"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '50px',
                height: '3px',
                bg: 'accent1.500',
                borderRadius: 'full'
              }}
            >
              Liên kết nhanh
            </Heading>
            <VStack align="flex-start" spacing={3}>
              <FooterLink to="/">Trang chủ</FooterLink>
              <FooterLink to="/#about">Về chúng tôi</FooterLink>
              <FooterLink to="/#products">Sản phẩm</FooterLink>
              <FooterLink to="/#promotions">Khuyến mãi</FooterLink>
              <FooterLink to="/#contact">Liên hệ</FooterLink>
            </VStack>
          </GridItem>

          {/* Danh mục sản phẩm */}
          <GridItem>
            <Heading as="h3" size="md" mb={6} color="white" position="relative" display="inline-block"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '50px',
                height: '3px',
                bg: 'accent1.500',
                borderRadius: 'full'
              }}
            >
              Danh mục
            </Heading>
            <VStack align="flex-start" spacing={3}>
              <FooterLink to="/danh-muc/sofa-ghe">Sofa & Ghế</FooterLink>
              <FooterLink to="/danh-muc/ban-an">Bàn Ăn</FooterLink>
              <FooterLink to="/danh-muc/giuong-ngu">Giường Ngủ</FooterLink>
              <FooterLink to="/danh-muc/tu-quan-ao">Tủ Quần Áo</FooterLink>
            </VStack>
          </GridItem>

          {/* Thông tin liên hệ */}
          <GridItem>
            <Heading as="h3" size="md" mb={6} color="white" position="relative" display="inline-block"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '50px',
                height: '3px',
                bg: 'accent1.500',
                borderRadius: 'full'
              }}
            >
              Liên hệ
            </Heading>
            <VStack align="flex-start" spacing={4}>
              <HStack align="flex-start" spacing={3}>
                <Box mt={1} color="accent1.400">
                  <FaMapMarkerAlt />
                </Box>
                <Text opacity={0.8} lineHeight="tall">
                  123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh
                </Text>
              </HStack>
              
              <HStack spacing={3}>
                <Box color="accent1.400">
                  <FaPhoneAlt />
                </Box>
                <Text opacity={0.8}>
                  <Link href="tel:0123456789" _hover={{ color: hoverColor, textDecoration: 'none' }}>0123 456 789</Link>
                </Text>
              </HStack>
              
              <HStack spacing={3}>
                <Box color="accent1.400">
                  <FaEnvelope />
                </Box>
                <Text opacity={0.8}>
                  <Link href="mailto:info@nguyenfurniture.com" _hover={{ color: hoverColor, textDecoration: 'none' }}>info@nguyenfurniture.com</Link>
                </Text>
              </HStack>
              
              {/* Newsletter Subscription */}
              <Box width="100%" mt={4}>
                <Text mb={3} fontWeight="medium">Đăng ký nhận tin khuyến mãi</Text>
                <InputGroup size="md">
                  <Input
                    placeholder="Email của bạn"
                    bg={inputBg}
                    border="none"
                    _placeholder={{ color: 'whiteAlpha.700' }}
                    _focus={{
                      boxShadow: 'none',
                      borderColor: 'accent1.500'
                    }}
                  />
                  <InputRightElement width="auto" mr={1} my={1}>
                    <IconButton
                      aria-label="Subscribe"
                      icon={<FaPaperPlane />}
                      colorScheme="accent1"
                      size="sm"
                      borderRadius="md"
                      _hover={{
                        transform: 'translateX(2px)'
                      }}
                      transition="all 0.2s"
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </VStack>
          </GridItem>
        </Grid>

        {/* Copyright */}
        <Box borderTop="1px" borderColor="rgba(255,255,255,0.1)" pt={8}>
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            justify="space-between" 
            align="center"
            gap={4}
          >
            <Text opacity={0.8} textAlign={{ base: 'center', md: 'left' }}>
              &copy; {new Date().getFullYear()} Chocolate Wood. Tất cả các quyền được bảo lưu.
            </Text>
            <HStack spacing={6} flexWrap="wrap" justify={{ base: 'center', md: 'flex-end' }}>
              <FooterLink to="/privacy">Chính sách bảo mật</FooterLink>
              <FooterLink to="/terms">Điều khoản sử dụng</FooterLink>
              <FooterLink to="/sitemap">Sơ đồ trang web</FooterLink>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
