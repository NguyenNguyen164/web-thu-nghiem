import { HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({ 
  value, 
  min = 1, 
  max = 99, 
  onChange 
}: QuantitySelectorProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <HStack spacing={2}>
      <IconButton
        aria-label="Giảm số lượng"
        icon={<FiMinus />}
        size="sm"
        onClick={handleDecrement}
        isDisabled={value <= min}
      />
      <InputGroup w="100px">
        <InputLeftElement pointerEvents="none" width="2.5rem" />
        <Input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          textAlign="center"
          paddingLeft="2.5rem"
          paddingRight="2.5rem"
        />
        <InputRightElement pointerEvents="none" width="2.5rem">
          <Text color="gray.500" fontSize="sm">
            cái
          </Text>
        </InputRightElement>
      </InputGroup>
      <IconButton
        aria-label="Tăng số lượng"
        icon={<FiPlus />}
        size="sm"
        onClick={handleIncrement}
        isDisabled={value >= max}
      />
    </HStack>
  );
}
