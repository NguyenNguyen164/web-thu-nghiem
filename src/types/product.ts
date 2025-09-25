// Base interface for product attributes
export interface ProductAttributes {
  // Core product information
  material?: string;
  color?: string | null;
  style?: string | null;
  brand?: string;
  origin?: string;
  
  // Dimensions
  dimensions_cm?: {
    width?: number;
    height?: number;
    depth?: number;
    diameter?: number;
  };
  
  // Product specifications
  room?: string;
  furniture_type?: string;
  slats_material?: string;
  finish?: string | null;
  customizable?: boolean;
  lead_time?: string;
  
  // Measurements
  width_mm?: number;
  length_mm?: number;
  height_mm?: number | null;
  length_bucket?: string;
  
  // Stock and availability
  in_stock?: boolean;
  stock_quantity?: number;
  sku?: string;
  
  // Additional dynamic attributes
  [key: string]: any;
}

// Product image types
export interface ProductImages {
  main: string;
  thumb: string;
  placeholder: string;
  gallery?: string[];
}

// Main product interface
export interface Product {
  // Core product data
  id: string;
  title: string;
  
  // Pricing
  price: number;
  price_AUD?: number;
  compare_at_price?: number;
  compare_at_price_AUD?: number;
  
  // Categories and organization
  categories: string[];
  category_ids: string[];
  tags?: string[];
  
  // URLs and navigation
  product_url: string;
  handle?: string;
  
  // Descriptions
  short_description: string;
  description: string;
  
  // Images
  image?: string; // Legacy support
  images: ProductImages | string[]; // Can be object with structured data or simple array
  galleryImages?: string[]; // Additional images
  
  // Product attributes and specifications
  attributes: ProductAttributes;
  
  // Computed fields (added by enhanceProductData)
  isOnSale?: boolean;
  discountPercent?: number;
  
  // Metadata
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  
  // Vendor information
  vendor?: string;
  
  // Additional product options
  options?: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  
  // Variants if this is a product with variants
  variants?: Array<{
    id: string;
    title: string;
    price: string;
    compare_at_price?: string;
    sku: string;
    requires_shipping: boolean;
    taxable: boolean;
    available: boolean;
    [key: string]: any;
  }>;
  
  // Any additional fields
  [key: string]: any;
}

// Category interface
export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  parent_id?: string | null;
  image?: string;
  level?: number;
  product_count?: number;
  children?: Category[];
  [key: string]: any;
}

// Product data response
export interface ProductData {
  products: Product[];
  categories: Category[];
  total?: number;
  page?: number;
  limit?: number;
  pages?: number;
}

// Product filter options
export interface ProductFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  attributes?: Record<string, string | string[]>;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'best-selling';
  searchQuery?: string;
  page?: number;
  limit?: number;
}

// Product sort option
export type ProductSortOption = 
  | 'newest' 
  | 'price-asc' 
  | 'price-desc' 
  | 'name-asc' 
  | 'name-desc' 
  | 'best-selling';

// Product variant
export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  compare_at_price?: string;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  available: boolean;
  [key: string]: any;
}

// Product option
export interface ProductOption {
  id: string;
  name: string;
  values: string[];
  [key: string]: any;
}

// Product image
export interface ProductImage {
  id: string;
  src: string;
  alt?: string;
  position?: number;
  [key: string]: any;
}

// Product collection
export interface ProductCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: string;
  products_count?: number;
  [key: string]: any;
}
