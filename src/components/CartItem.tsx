import { useCart } from "../context/CartContext";
import { fmt, mul } from "../utils/money";
import type { CartLine } from "../types/cart";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

export default function CartItem({ line }: { line: CartLine }) {
  const { removeItem, updateQty } = useCart();

  return (
    <Flex
      py={4}
      borderBottom="1px solid"
      borderColor="gray.100"
      alignItems="center"
      gap={4}
    >
      <Image
        src={line.image}
        alt={line.name}
        boxSize="80px"
        objectFit="cover"
        borderRadius="md"
      />
      <Box flex={1}>
        <Text fontWeight="medium" noOfLines={1} mb={1}>
          {line.name}
        </Text>
        <Text fontSize="sm" color="gray.500" mb={2}>
          {line.sku}
        </Text>
        <Flex alignItems="center" gap={3}>
          <Text fontSize="sm" color="gray.600">
            Số lượng:
          </Text>
          <Input
            type="number"
            min={1}
            value={line.qty}
            onChange={(e) => updateQty(line.id, Number(e.target.value))}
            size="sm"
            w="80px"
            textAlign="center"
          />
          <Button
            variant="ghost"
            colorScheme="red"
            size="sm"
            leftIcon={<FiTrash2 />}
            onClick={() => removeItem(line.id)}
          >
            Xóa
          </Button>
        </Flex>
      </Box>
      <Box textAlign="right">
        <Text fontWeight="medium">{fmt(line.unitPrice)}</Text>
        <Text fontSize="sm" color="gray.500">
          Tổng: {fmt(mul(line.unitPrice, line.qty))}
        </Text>
      </Box>
    </Flex>
  );
}
