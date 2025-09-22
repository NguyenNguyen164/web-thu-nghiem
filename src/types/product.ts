export interface ProductAttributes {
  material?: string;
  dimensions_cm?: {
    width?: number;
    height?: number;
    depth?: number;
    diameter?: number;
  };
  room?: string;
  furniture_type?: string;
  slats_material?: string;
  finish?: string | null;
  color?: string | null;
  style?: string | null;
  brand?: string;
  origin?: string;
  customizable?: boolean;
  lead_time?: string;
  width_mm?: number;
  length_mm?: number;
  height_mm?: number | null;
  length_bucket?: string;
  [key: string]: any; // For other dynamic attributes
}

export interface Product {
  id: string;
  title: string;
  price: number;
  price_AUD: number;
  compare_at_price?: number;
  compare_at_price_AUD?: number;
  categories: string[];
  product_url: string;
  short_description: string;
  description?: string;
  images: {
    main: string;
    thumb: string;
    placeholder: string;
  };
  attributes: ProductAttributes;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface ProductData {
  categories: Category[];
  products: Product[];
}
