import { useCart } from "../context/CartContext";
import { fmt } from "../utils/money";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <Flex justify="space-between" py={2}>
      <Text color="gray.600">{label}</Text>
      <Text fontWeight="medium">{value}</Text>
    </Flex>
  );
}

export default function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const goToCheckout = () => {
    if (cart.lines.length === 0) return;
    navigate("/thanh-toan");
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} bg="white" boxShadow="sm">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Tóm tắt đơn hàng
      </Text>
      
      <Box mb={4}>
        {cart.lines.map((item) => (
          <Flex key={item.id} justify="space-between" mb={2}>
            <Text fontSize="sm">
              {item.name} × {item.qty}
            </Text>
            <Text fontSize="sm">
              {fmt({ ...item.unitPrice, amount: item.unitPrice.amount * item.qty })}
            </Text>
          </Flex>
        ))}
      </Box>

      <Divider my={4} />

      <Box mb={6}>
        <Row label="Tạm tính" value={fmt(cart.subtotal)} />
        <Row label="Phí vận chuyển" value={fmt(cart.shipping)} />
        <Row label="Thuế (10%)" value={fmt(cart.tax)} />
        <Divider my={2} />
        <Row 
          label={<Text fontWeight="bold">Tổng cộng</Text>} 
          value={<Text fontWeight="bold">{fmt(cart.total)}</Text>} 
        />
      </Box>

      <Button
        onClick={goToCheckout}
        colorScheme="accent1"
        size="lg"
        w="100%"
        isDisabled={cart.lines.length === 0}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg'
        }}
        transition="all 0.2s"
      >
        Tiến hành thanh toán
      </Button>

      <Text mt={3} fontSize="sm" color="gray.500" textAlign="center">
        Miễn phí vận chuyển cho đơn hàng từ 1.000.000₫
      </Text>
    </Box>
  );
}
