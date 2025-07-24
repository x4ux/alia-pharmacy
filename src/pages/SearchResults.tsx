import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../App';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // Mock search results
  const mockResults = [
    {
      id: 1,
      name: 'Panadol Extra',
      nameAr: 'بنادول اكسترا',
      price: 25,
      originalPrice: 30,
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'GSK',
      category: 'Pain Relief',
      categoryAr: 'مسكنات الألم',
      description: 'Fast relief from headaches and pain',
      descriptionAr: 'تخفيف سريع من الصداع والألم',
      inStock: true,
      rating: 4.5,
      reviews: 156
    },
    {
      id: 2,
      name: 'Vitamin D3 5000 IU',
      nameAr: 'فيتامين د3 5000 وحدة',
      price: 150,
      originalPrice: 180,
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Pharma Plus',
      category: 'Vitamins & Supplements',
      categoryAr: 'الفيتامينات والمكملات',
      description: 'High potency Vitamin D3 supplement',
      descriptionAr: 'مكمل فيتامين د3 عالي الفعالية',
      inStock: true,
      rating: 4.7,
      reviews: 89
    },
    {
      id: 3,
      name: 'Cetaphil Gentle Cleanser',
      nameAr: 'سيتافيل منظف لطيف',
      price: 180,
      originalPrice: 200,
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Cetaphil',
      category: 'Skin Care',
      categoryAr: 'العناية بالبشرة',
      description: 'Gentle daily facial cleanser for all skin types',
      descriptionAr: 'منظف يومي لطيف للوجه لجميع أنواع البشرة',
      inStock: false,
      rating: 4.3,
      reviews: 234
    }
  ];

  const [results, setResults] = useState(mockResults);
  const [filteredResults, setFilteredResults] = useState(mockResults);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (query) {
        const filtered = mockResults.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.nameAr.includes(query) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.categoryAr.includes(query)
        );
        setFilteredResults(filtered);
      } else {
        setFilteredResults(mockResults);
      }
      setIsLoading(false);
    }, 1000);
  }, [query]);

  const ProductCard = ({ product }: { product: typeof mockResults[0] }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={language === 'ar' ? product.nameAr : product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              {language === 'ar' ? 'غير متوفر' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {language === 'ar' ? product.nameAr : product.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <span className="text-yellow-400 mr-1 rtl:mr-0 rtl:ml-1">★</span>
            {product.rating}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
        <p className="text-sm text-blue-600 mb-2">
          {language === 'ar' ? product.categoryAr : product.category}
        </p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {language === 'ar' ? product.descriptionAr : product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-lg font-bold text-blue-600">{product.price} EGP</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">{product.originalPrice} EGP</span>
            )}
          </div>
          
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              product.inStock
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.inStock}
          >
            {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
            <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === 'ar' ? 'نتائج البحث' : 'Search Results'}
              </h1>
              {query && (
                <p className="text-gray-600 mt-1">
                  {language === 'ar' ? 'البحث عن:' : 'Searching for:'} 
                  <span className="font-semibold text-blue-600 ml-2 rtl:ml-0 rtl:mr-2">"{query}"</span>
                </p>
              )}
            </div>
          </div>
          
          {!isLoading && (
            <p className="text-gray-600">
              {filteredResults.length > 0 
                ? `${filteredResults.length} ${language === 'ar' ? 'نتيجة' : 'results'} ${language === 'ar' ? 'وُجدت' : 'found'}`
                : language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'
              }
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          // Loading State
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">
                {language === 'ar' ? 'جار البحث...' : 'Searching...'}
              </p>
            </div>
          </div>
        ) : filteredResults.length > 0 ? (
          // Results Grid
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // No Results State
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No Results Found'}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {language === 'ar' 
                ? 'عذراً، لم نتمكن من العثور على أي منتجات تطابق بحثك. حاول استخدام كلمات مختلفة أو تصفح الأقسام.'
                : 'Sorry, we couldn\'t find any products matching your search. Try using different keywords or browse our categories.'
              }
            </p>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'ar' ? 'اقتراحات:' : 'Suggestions:'}
              </h3>
              
              <ul className="text-gray-600 space-y-2">
                <li>{language === 'ar' ? '• تأكد من كتابة الكلمات بشكل صحيح' : '• Check your spelling'}</li>
                <li>{language === 'ar' ? '• جرب كلمات بحث أخرى' : '• Try different keywords'}</li>
                <li>{language === 'ar' ? '• استخدم كلمات أكثر عمومية' : '• Use more general terms'}</li>
                <li>{language === 'ar' ? '• تصفح أقسام الأدوية المختلفة' : '• Browse different medicine categories'}</li>
              </ul>
            </div>
          </div>
        )}

        {/* Popular Categories */}
        {filteredResults.length === 0 && !isLoading && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {language === 'ar' ? 'الأقسام الشائعة' : 'Popular Categories'}
            </h3>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Pain Relief', nameAr: 'مسكنات الألم', icon: '🩹' },
                { name: 'Vitamins', nameAr: 'الفيتامينات', icon: '💊' },
                { name: 'Cold & Flu', nameAr: 'البرد والإنفلونزا', icon: '🤒' },
                { name: 'Skin Care', nameAr: 'العناية بالبشرة', icon: '🧴' }
              ].map((category, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-center">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h4 className="font-medium text-gray-900">
                      {language === 'ar' ? category.nameAr : category.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;