import type { 
  Product, 
  ProductData, 
  Category, 
  ProductAttributes, 
  ProductImages 
} from '../types/product';

// Base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Log environment for debugging
console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', import.meta.env.MODE);

// Cache for API responses
const cache: Record<string, any> = {};

/**
 * Makes an API request with caching and error handling
 */
const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const cacheKey = `${options.method || 'GET'}:${url}`;
  
  // Return cached response if available
  if (!options.method || options.method === 'GET') {
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    
    // Cache the response
    if (!options.method || options.method === 'GET') {
      cache[cacheKey] = data;
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Normalize product data to ensure consistent structure
const normalizeProduct = (product: any): Product => {
  if (!product) return product;
  
  // Ensure required fields
  const normalized: Product = {
    id: product.id || '',
    title: product.title || 'Không có tiêu đề',
    price: Number(product.price) || 0,
    price_AUD: Number(product.price_AUD) || 0,
    compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : undefined,
    compare_at_price_AUD: product.compare_at_price_AUD ? Number(product.compare_at_price_AUD) : undefined,
    categories: Array.isArray(product.categories) 
      ? product.categories 
      : (product.category_ids || []),
    category_ids: Array.isArray(product.category_ids) 
      ? product.category_ids 
      : (product.categories || []),
    product_url: product.product_url || `#/product/${product.id}`,
    short_description: product.short_description || '',
    description: product.description || '',
    image: product.image || '',
    images: {
      main: product.images?.main || product.image || '',
      thumb: product.images?.thumb || product.image || '',
      placeholder: product.images?.placeholder || product.image || '',
    },
    attributes: {
      ...product.attributes,
      in_stock: product.attributes?.in_stock !== undefined 
        ? Boolean(product.attributes.in_stock) 
        : true,
    },
  };
  
  return enhanceProductData(normalized);
};

/**
 * Fetches all products from the API
 * @returns Promise with normalized product data
 */
export const fetchProducts = async (): Promise<ProductData> => {
  try {
    const data = await apiRequest<{ products: any[]; categories: Category[] }>('/api/products');
    
    const normalizedData = {
      products: Array.isArray(data.products) 
        ? data.products.map(normalizeProduct)
        : [],
      categories: Array.isArray(data.categories) 
        ? data.categories 
        : []
    };
    
    return normalizedData;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], categories: [] };
  }
};

/**
 * Fetches a single product by ID
 * @param id - Product ID
 * @returns Promise with the product data
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const product = await apiRequest<any>(`/api/products/${id}`);
    return normalizeProduct(product);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Không thể tải thông tin sản phẩm (ID: ${id})`);
  }
};

/**
 * Fetches related products based on category
 * @param currentProductId - Current product ID to exclude
 * @param categoryId - Category ID to find related products
 * @returns Promise with array of related products
 */
export const fetchRelatedProducts = async (
  currentProductId: string, 
  categoryId: string,
  limit: number = 4
): Promise<Product[]> => {
  try {
    // First try to get related products from the specific endpoint if it exists
    try {
      const related = await apiRequest<{ products: any[] }>(
        `/api/products/related/${currentProductId}?categoryId=${categoryId}&limit=${limit}`
      );
      
      if (related.products && related.products.length > 0) {
        return related.products.map(normalizeProduct);
      }
    } catch (e) {
      console.warn('Could not fetch related products from dedicated endpoint, falling back to client-side filtering');
    }
    
    // Fallback: Fetch all products and filter client-side
    const { products } = await fetchProducts();
    return products
      .filter(p => 
        p.id !== currentProductId && 
        p.category_ids?.includes(categoryId)
      )
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};

/**
 * Gets a product by ID or slug
 */
export const getProductByIdOrSlug = async (idOrSlug: string): Promise<Product | null> => {
  try {
    // Try to fetch by ID first
    try {
      return await fetchProductById(idOrSlug);
    } catch (e) {
      // If not found by ID, try to find by slug
      const { products } = await fetchProducts();
      const product = products.find(p => 
        p.id === idOrSlug || 
        p.title?.toLowerCase().replace(/\s+/g, '-') === idOrSlug.toLowerCase()
      );
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return product;
    }
  } catch (error) {
    console.error(`Error finding product with ID/slug ${idOrSlug}:`, error);
    return null;
  }
};

/**
 * Enhances product data with additional computed fields
 */
export const enhanceProductData = (product: Product): Product => {
  if (!product) return product;
  
  const enhanced = { ...product };
  
  // Ensure images is an object with all required fields
  if (!enhanced.images || Array.isArray(enhanced.images)) {
    enhanced.images = {
      main: enhanced.image || '',
      thumb: enhanced.image || '',
      placeholder: enhanced.image || '',
      gallery: Array.isArray(enhanced.images) ? enhanced.images : []
    };
  } else {
    const images = enhanced.images as Partial<ProductImages>;
    enhanced.images = {
      main: images.main || enhanced.image || '',
      thumb: images.thumb || images.main || enhanced.image || '',
      placeholder: images.placeholder || images.thumb || images.main || enhanced.image || '',
      gallery: images.gallery || []
    };
  }
  
  // Ensure categories and category_ids are in sync
  if (Array.isArray(enhanced.categories) && !Array.isArray(enhanced.category_ids)) {
    enhanced.category_ids = [...enhanced.categories];
  } else if (Array.isArray(enhanced.category_ids) && !Array.isArray(enhanced.categories)) {
    enhanced.categories = [...enhanced.category_ids];
  } else if (!Array.isArray(enhanced.categories) && !Array.isArray(enhanced.category_ids)) {
    enhanced.categories = [];
    enhanced.category_ids = [];
  }
  
  // Add isOnSale flag
  enhanced.isOnSale = Boolean(
    enhanced.compare_at_price && 
    enhanced.price && 
    enhanced.compare_at_price > enhanced.price
  );
  
  // Add discount percentage if on sale
  if (enhanced.isOnSale && enhanced.compare_at_price) {
    enhanced.discountPercent = Math.round(
      ((enhanced.compare_at_price - enhanced.price) / enhanced.compare_at_price) * 100
    );
  }
  
  return enhanced;
};

/**
 * Filters products by category from an already loaded dataset
 */
type ProductInput = { products: Product[] } | Product[];

export const getProductsByCategory = (
  input: ProductInput,
  categoryId?: string,
  limit: number = 12
): Product[] => {
  try {
    const products = Array.isArray(input) ? input : input.products || [];
    
    if (!categoryId) {
      return products.slice(0, limit);
    }

    const filteredProducts = products.filter((p: Product) => {
      // Check if category_ids includes the categoryId
      if (p.category_ids?.includes(categoryId)) {
        return true;
      }
      
      // Check if categories array contains the categoryId
      if (Array.isArray(p.categories)) {
        return p.categories.some((cat: string | Category) => {
          if (!cat) return false;
          
          // Handle case where category is a string (ID or slug)
          if (typeof cat === 'string') {
            return cat === categoryId;
          }
          
          // Handle case where category is a Category object
          const category = cat as Category;
          return category.id === categoryId || category.slug === categoryId;
        });
      }
      
      return false;
    });

    return filteredProducts.slice(0, limit);
  } catch (error) {
    console.error('Error filtering products by category:', error);
    return [];
  }
};

/**
 * Searches products by query string
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  if (!query.trim()) {
    return [];
  }
  
  try {
    // First try to use the search endpoint if available
    try {
      const results = await apiRequest<{ products: any[] }>(
        `/api/products/search?q=${encodeURIComponent(query)}`
      );
      
      if (results.products) {
        return results.products.map(normalizeProduct);
      }
    } catch (e) {
      console.warn('Search endpoint not available, falling back to client-side search');
    }
    
    // Fallback: Fetch all products and filter client-side
    const { products } = await fetchProducts();
    const queryLower = query.toLowerCase();
    
    return products.filter(product => 
      (product.title?.toLowerCase().includes(queryLower)) ||
      (product.short_description?.toLowerCase().includes(queryLower)) ||
      (product.description?.toLowerCase().includes(queryLower)) ||
      (product.attributes?.material?.toLowerCase().includes(queryLower)) ||
      (product.attributes?.color?.toLowerCase().includes(queryLower))
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

// Export all types for convenience
export type { Product, ProductData, Category, ProductAttributes };
