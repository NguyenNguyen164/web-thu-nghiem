import type { Product, ProductData, Category } from '../types/product';

// Hàm tải dữ liệu sản phẩm từ file JSON
export const fetchProducts = async (): Promise<ProductData> => {
  try {
    console.log('Fetching products from /Nguyen-wood.json');
    const response = await fetch('/Nguyen-wood.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully fetched products:', {
      categories: data.categories?.length || 0,
      products: data.products?.length || 0
    });
    
    // Process and enhance product data
    if (data.products && Array.isArray(data.products)) {
      data.products = data.products.map(enhanceProductData);
    }
    
    return data;
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
    throw error;
  }
};

// Hàm lấy chi tiết sản phẩm theo ID
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch('/Nguyen-wood.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const product = data.products.find((p: Product) => p.id === id);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return enhanceProductData(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Hàm lấy sản phẩm liên quan
export const fetchRelatedProducts = async (currentProductId: string, categoryId: string): Promise<Product[]> => {
  try {
    const response = await fetch('/Nguyen-wood.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Lấy tối đa 4 sản phẩm cùng danh mục (trừ sản phẩm hiện tại)
    return data.products
      .filter((p: Product) => 
        p.id !== currentProductId && 
        p.category_ids?.includes(categoryId)
      )
      .slice(0, 4)
      .map(enhanceProductData);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};

// Hàm lấy sản phẩm theo ID hoặc slug
export const getProductByIdOrSlug = async (idOrSlug: string): Promise<Product | null> => {
  try {
    const data = await fetchProducts();
    if (!data.products) return null;
    
    const product = data.products.find(
      (p) => p.id === idOrSlug || p.attributes.slug === idOrSlug
    );
    
    return product ? enhanceProductData(product) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Hàm nâng cấp dữ liệu sản phẩm
const enhanceProductData = (product: Product): Product => {
  // Tạo slug nếu chưa có
  if (!product.attributes.slug) {
    product.attributes.slug = product.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  
  // Thêm các trường mặc định nếu chưa có
  product.attributes = {
    customizable: false,
    lead_time: '2-4 weeks',
    brand: 'Nguyen Furniture',
    origin: 'vn',
    ...product.attributes
  };
  
  // Tính toán length_bucket nếu có length_mm
  if (product.attributes.length_mm !== undefined) {
    const length = product.attributes.length_mm;
    product.attributes.length_bucket = 
      length <= 1900 ? 'short' :
      length <= 2100 ? '1901-2100' :
      'long';
  }
  
  // Đảm bảo có các trường hình ảnh
  if (!product.images) {
    product.images = {
      main: '/images/placeholder.jpg',
      thumb: '/images/placeholder-thumb.jpg',
      placeholder: '/images/placeholder.jpg'
    };
  }
  
  return product;
};

// Hàm lấy sản phẩm theo danh mục
export const getProductsByCategory = async (categoryId: string, limit: number = 2): Promise<Product[]> => {
  try {
    const data = await fetchProducts();
    if (!data.products) return [];
    
    return data.products
      .filter(product => product.categories.includes(categoryId))
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// Hàm tìm kiếm sản phẩm
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    // Tải dữ liệu sản phẩm
    const data = await fetchProducts();
    
    if (!data.products) return [];
    
    // Chuyển đổi query thành chữ thường để tìm kiếm không phân biệt hoa thường
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) return [];
    
    // Lấy danh sách tên danh mục
    const getCategoryNames = (product: Product, categories: Category[]): string[] => {
      return product.categories
        .map(catId => categories.find(c => c.id === catId)?.name || '')
        .filter(Boolean);
    };
    
    // Lọc sản phẩm dựa trên tiêu đề, mô tả, thuộc tính và tên danh mục
    return data.products.filter(product => {
      const categoryNames = getCategoryNames(product, data.categories || []);
      
      // Kiểm tra các trường văn bản có chứa từ khóa tìm kiếm
      const textFields = [
        product.title,
        product.description,
        product.short_description,
        product.attributes?.material,
        product.attributes?.furniture_type,
        product.attributes?.room,
        product.attributes?.brand,
        ...categoryNames
      ].filter((s): s is string => typeof s === 'string' && s.length > 0)
       .map(s => s.toLowerCase());
      
      // Kiểm tra xem có bất kỳ trường nào chứa từ khóa tìm kiếm không
      return textFields.some(field => field.includes(searchTerm));
    });
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    return [];
  }
};
