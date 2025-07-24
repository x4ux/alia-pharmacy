import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../App';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const categoryTitles: { [key: string]: { en: string; ar: string } } = {
    'vitamins-&-supplements': { en: 'Vitamins & Supplements', ar: 'الفيتامينات والمكملات' },
    'cold-&-flu': { en: 'Cold & Flu', ar: 'البرد والإنفلونزا' },
    'pain-relief': { en: 'Pain Relief', ar: 'مسكنات الألم' },
    'skin-care': { en: 'Skin Care', ar: 'العناية بالبشرة' },
    'antibiotics': { en: 'Antibiotics', ar: 'المضادات الحيوية' },
    'digestive-health': { en: 'Digestive Health', ar: 'صحة الجهاز الهضمي' },
    'personal-care': { en: 'Personal Care', ar: 'العناية الشخصية' }
  };

  // Sample products - in a real app, this would come from an API
  const sampleProducts = [
    {
      id: 1,
      name: 'Vitamin D3 5000 IU',
      nameAr: 'فيتامين د3 5000 وحدة',
      price: 150,
      originalPrice: 180,
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Pharma Plus',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      description: 'High potency Vitamin D3 supplement for bone health',
      descriptionAr: 'مكمل فيتامين د3 عالي الفعالية لصحة العظام'
    },
    {
      id: 2,
      name: 'Omega-3 Fish Oil',
      nameAr: 'زيت السمك أوميجا 3',
      price: 220,
      originalPrice: 250,
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Ocean Health',
      rating: 4.3,
      reviews: 89,
      inStock: true,
      description: 'Premium fish oil with EPA and DHA',
      descriptionAr: 'زيت سمك فاخر يحتوي على EPA و DHA'
    },
    {
      id: 3,
      name: 'Multivitamin Complex',
      nameAr: 'مجموعة الفيتامينات المتعددة',
      price: 180,
      originalPrice: 200,
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'VitaMax',
      rating: 4.7,
      reviews: 245,
      inStock: false,
      description: 'Complete daily vitamin and mineral supplement',
      descriptionAr: 'مكمل يومي كامل من الفيتامينات والمعادن'
    },
    {
      id: 4,
      name: 'Calcium + Magnesium',
      nameAr: 'كالسيوم + مغنيسيوم',
      price: 120,
      originalPrice: 140,
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'BoneStrong',
      rating: 4.2,
      reviews: 67,
      inStock: true,
      description: 'Essential minerals for bone and muscle health',
      descriptionAr: 'معادن أساسية لصحة العظام والعضلات'
    },
    {
      id: 5,
      name: 'Zinc Supplement',
      nameAr: 'مكمل الزنك',
      price: 90,
      originalPrice: 110,
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'Immune Plus',
      rating: 4.4,
      reviews: 156,
      inStock: true,
      description: 'Immune system support with high-absorption zinc',
      descriptionAr: 'دعم جهاز المناعة بالزنك عالي الامتصاص'
    },
    {
      id: 6,
      name: 'Iron Supplement',
      nameAr: 'مكمل الحديد',
      price: 110,
      originalPrice: 130,
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=400',
      brand: 'HemoVital',
      rating: 4.1,
      reviews: 93,
      inStock: true,
      description: 'Gentle iron formula for energy and vitality',
      descriptionAr: 'تركيبة حديد لطيفة للطاقة والحيوية'
    }
  ];

  const currentTitle = categoryName ? categoryTitles[categoryName] : null;

  const ProductCard = ({ product }: { product: typeof sampleProducts[0] }) => (
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
        
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
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
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {currentTitle ? (language === 'ar' ? currentTitle.ar : currentTitle.en) : 'Category'}
              </h1>
              <p className="text-gray-600 mt-2">
                {sampleProducts.length} {language === 'ar' ? 'منتج متاح' : 'products available'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">{language === 'ar' ? 'الاسم' : 'Name'}</option>
                <option value="price-low">{language === 'ar' ? 'السعر: منخفض إلى عالي' : 'Price: Low to High'}</option>
                <option value="price-high">{language === 'ar' ? 'السعر: عالي إلى منخفض' : 'Price: High to Low'}</option>
                <option value="rating">{language === 'ar' ? 'التقييم' : 'Rating'}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FunnelIcon className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {language === 'ar' ? 'تصفية النتائج' : 'Filter Results'}
              </h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      {language === 'ar' ? 'الحد الأدنى' : 'Min Price'}
                    </label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      {language === 'ar' ? 'الحد الأقصى' : 'Max Price'}
                    </label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 1000 }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>
              
              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  {language === 'ar' ? 'العلامة التجارية' : 'Brand'}
                </h4>
                <div className="space-y-2">
                  {['Pharma Plus', 'Ocean Health', 'VitaMax', 'BoneStrong', 'Immune Plus'].map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 rtl:ml-0 rtl:mr-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Availability */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  {language === 'ar' ? 'التوفر' : 'Availability'}
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 rtl:ml-0 rtl:mr-2 text-sm text-gray-700">
                      {language === 'ar' ? 'متوفر' : 'In Stock'}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 rtl:ml-0 rtl:mr-2 text-sm text-gray-700">
                      {language === 'ar' ? 'غير متوفر' : 'Out of Stock'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {sampleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                  {language === 'ar' ? 'السابق' : 'Previous'}
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  {language === 'ar' ? 'التالي' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;