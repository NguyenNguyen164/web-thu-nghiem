import { useState } from "react";
import { Box, Image } from '@chakra-ui/react';

interface ProductGalleryProps {
  images: {
    main: string;
    thumb: string;
    placeholder: string;
  };
  altBase: string;
}

export default function ProductGallery({ images, altBase }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Create an array of all available images
  const imageList = [
    images.main,
    images.thumb,
    images.placeholder
  ].filter(Boolean);

  return (
    <Box>
      {/* Main Image */}
      <Box
        mb={4}
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        position="relative"
        pt="100%"
      >
        <Image
          src={imageList[currentImage]}
          alt={`${altBase} - ${currentImage + 1}`}
          loading="lazy"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          objectFit="cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </Box>

      {/* Thumbnails */}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>
        {imageList.map((src, index) => (
          <Box
            key={index}
            as="button"
            onClick={() => setCurrentImage(index)}
            aria-label={`Xem ảnh ${index + 1}`}
            p={0}
            bg="transparent"
            border="2px solid"
            borderColor={currentImage === index ? 'accent1.500' : 'transparent'}
            borderRadius="md"
            overflow="hidden"
            _hover={{
              borderColor: 'accent1.300',
            }}
            transition="all 0.2s"
          >
            <Image
              src={src}
              alt={`${altBase} - thumbnail ${index + 1}`}
              loading="lazy"
              width="100%"
              height="100%"
              objectFit="cover"
              aspectRatio="1/1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
