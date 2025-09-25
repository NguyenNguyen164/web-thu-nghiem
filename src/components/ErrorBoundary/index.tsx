import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box p={6} textAlign="center" maxW="600px" mx="auto" mt={10}>
          <Heading as="h1" size="xl" mb={4} color="red.500">
            Đã xảy ra lỗi
          </Heading>
          <Text mb={4}>
            Rất tiếc, đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.
          </Text>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box 
              p={4} 
              mt={4} 
              bg="gray.100" 
              borderRadius="md" 
              textAlign="left" 
              fontFamily="monospace"
              fontSize="sm"
              maxH="200px"
              overflowY="auto"
            >
              <Text fontWeight="bold">{this.state.error.name}: {this.state.error.message}</Text>
              {this.state.error.stack && (
                <Text whiteSpace="pre-wrap">{this.state.error.stack}</Text>
              )}
            </Box>
          )}
          <Button 
            mt={6} 
            colorScheme="blue" 
            onClick={this.handleReset}
          >
            Thử lại
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent?: React.ComponentType<{ error?: Error }>
): React.FC<P> => {
  return (props: P) => (
    <ErrorBoundary 
      fallback={FallbackComponent ? <FallbackComponent /> : undefined}
    >
      <Component {...props} />
    </ErrorBoundary>
  );
};
