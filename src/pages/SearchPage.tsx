import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../services/productService';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const results = await searchProducts(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('search') as string;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
          <input
            type="text"
            name="search"
            defaultValue={query}
            placeholder="Tìm kiếm sản phẩm..."
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Tìm kiếm
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tìm kiếm sản phẩm...</p>
        </div>
      ) : searchResults.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-6">
            Kết quả tìm kiếm cho: <span className="text-blue-600">"{query}"</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Không tìm thấy sản phẩm nào phù hợp với "{query}"</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Quay lại trang chủ
          </button>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Nhập từ khóa để tìm kiếm sản phẩm</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
