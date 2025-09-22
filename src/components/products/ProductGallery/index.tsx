import { Box, HStack, Image } from '@chakra-ui/react';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images.length) return null;

  return (
    <Box>
      <Box 
        position="relative" 
        borderRadius="lg" 
        overflow="hidden" 
        bg="gray.100" 
        minH="400px" 
        mb={4}
      >
        <Image
          src={images[currentImageIndex]}
          alt={title}
          w="100%"
          h="100%"
          objectFit="contain"
          p={8}
        />
      </Box>

      {images.length > 1 && (
        <HStack spacing={2} overflowX="auto" py={2} px={1}>
          {images.map((img, index) => (
            <Box
              key={index}
              w="60px"
              h="60px"
              borderRadius="md"
              overflow="hidden"
              borderWidth={currentImageIndex === index ? '2px' : '1px'}
              borderColor={currentImageIndex === index ? 'blue.500' : 'gray.200'}
              cursor="pointer"
              onClick={() => setCurrentImageIndex(index)}
              flexShrink={0}
              bg="white"
              p={1}
            >
              <Image 
                src={img} 
                alt={`${title} ${index + 1}`} 
                w="100%" 
                h="100%" 
                objectFit="contain" 
              />
            </Box>
          ))}
        </HStack>
      )}
    </Box>
  );
}
