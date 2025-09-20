import type { ProductData } from '../types/product';

// Hàm tải dữ liệu sản phẩm từ file JSON
export const fetchProducts = async (): Promise<ProductData> => {
  try {
    console.log('Fetching products from /chocolatewood_seed_14.json');
    const response = await fetch('/chocolatewood_seed_14.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully fetched products:', {
      categories: data.categories?.length || 0,
      products: data.products?.length || 0
    });
    
    return data;
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
    return { categories: [], products: [] };
  }
};

// Hàm lấy sản phẩm theo danh mục
export const getProductsByCategory = (data: ProductData, categoryId: string, limit: number = 2): Product[] => {
  if (!data || !data.products) return [];
  
  return data.products
    .filter(product => product.category_ids.includes(categoryId))
    .slice(0, limit);
};
