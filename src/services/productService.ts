import type { Product, ProductData, Category } from '../types/product';

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
    .filter(product => product.categories.includes(categoryId))
    .slice(0, limit);
};

// Hàm tìm kiếm sản phẩm
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    // Tải dữ liệu sản phẩm
    const data = await fetchProducts();
    
    if (!data.products) return [];
    
    // Chuyển đổi query thành chữ thường để tìm kiếm không phân biệt hoa thường
    const searchTerm = query.toLowerCase().trim();
    
    // Lấy danh sách tên danh mục
    const getCategoryNames = (product: Product, categories: Category[]): string[] => {
      return product.categories
        .map(catId => categories.find(c => c.id === catId)?.name || '')
        .filter(Boolean);
    };
    
    // Lọc sản phẩm dựa trên tiêu đề, mô tả và tên danh mục
    return data.products.filter(product => {
      const categoryNames = getCategoryNames(product, data.categories);
      
      return (
        product.title.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        categoryNames.some(categoryName => 
          categoryName.toLowerCase().includes(searchTerm)
        )
      );
    });
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    return [];
  }
};
