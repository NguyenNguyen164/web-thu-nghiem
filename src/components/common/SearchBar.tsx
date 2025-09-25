import { InputGroup, InputLeftElement, Input, InputRightElement, Button, Box, IconButton } from '@chakra-ui/react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useState, type KeyboardEvent, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  showButton?: boolean;
  autoFocus?: boolean;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  width?: string | object;
  maxWidth?: string | object;
}

const SearchBar = ({
  onSearch,
  initialValue = '',
  placeholder = 'Tìm kiếm sản phẩm...',
  showButton = false,
  autoFocus = false,
  onClear,
  size = 'md',
  variant = 'outline',
  width = '100%',
  maxWidth = '2xl',
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) onClear();
    inputRef.current?.focus();
  };

  return (
    <Box w={width} maxW={maxWidth} mx="auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <InputGroup size={size}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            variant={variant}
            bg="white"
            borderColor="gray.200"
            _hover={{ borderColor: 'gray.300' }}
            _focus={{
              borderColor: 'blue.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
            }}
            autoFocus={autoFocus}
            pr={query ? '4.5rem' : '3.5rem'}
          />

          {query && (
            <InputRightElement width={showButton ? 'auto' : '2.5rem'}>
              <IconButton
                aria-label="Xóa tìm kiếm"
                icon={<FiX />}
                size="xs"
                variant="ghost"
                onClick={handleClear}
                mr={showButton ? 2 : 0}
              />
              {showButton && (
                <Button
                  size="sm"
                  colorScheme="blue"
                  h="1.75rem"
                  onClick={handleSearch}
                  type="submit"
                >
                  Tìm
                </Button>
              )}
            </InputRightElement>
          )}
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchBar;
