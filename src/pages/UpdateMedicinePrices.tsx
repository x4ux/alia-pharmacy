import React, { useState } from 'react';
import { MagnifyingGlassIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../App';

interface Medicine {
  id: number;
  name: string;
  nameAr: string;
  brand: string;
  category: string;
  categoryAr: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

const UpdateMedicinePrices: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState('');

  // Mock medicines data
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: 'Panadol Extra',
      nameAr: 'بنادول اكسترا',
      brand: 'GSK',
      category: 'Pain Relief',
      categoryAr: 'مسكنات الألم',
      price: 25,
      originalPrice: 30,
      inStock: true
    },
    {
      id: 2,
      name: 'Vitamin D3 5000 IU',
      nameAr: 'فيتامين د3 5000 وحدة',
      brand: 'Pharma Plus',
      category: 'Vitamins & Supplements',
      categoryAr: 'الفيتامينات والمكملات',
      price: 150,
      originalPrice: 180,
      inStock: true
    },
    {
      id: 3,
      name: 'Omega-3 Fish Oil',
      nameAr: 'زيت السمك أوميجا 3',
      brand: 'Ocean Health',
      category: 'Vitamins & Supplements',
      categoryAr: 'الفيتامينات والمكملات',
      price: 220,
      originalPrice: 250,
      inStock: true
    },
    {
      id: 4,
      name: 'Cetaphil Gentle Cleanser',
      nameAr: 'سيتافيل منظف لطيف',
      brand: 'Cetaphil',
      category: 'Skin Care',
      categoryAr: 'العناية بالبشرة',
      price: 180,
      originalPrice: 200,
      inStock: false
    },
    {
      id: 5,
      name: 'Amoxicillin 500mg',
      nameAr: 'أموكسيسيلين 500 مجم',
      brand: 'Pharma Co',
      category: 'Antibiotics',
      categoryAr: 'المضادات الحيوية',
      price: 45,
      inStock: true
    },
    {
      id: 6,
      name: 'Insulin Glargine',
      nameAr: 'إنسولين جلارجين',
      brand: 'Sanofi',
      category: 'Diabetes',
      categoryAr: 'السكري',
      price: 320,
      inStock: true
    }
  ]);

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.nameAr.includes(searchQuery) ||
    medicine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.categoryAr.includes(searchQuery)
  );

  const handleEditStart = (medicine: Medicine) => {
    setEditingId(medicine.id);
    setEditPrice(medicine.price.toString());
  };

  const handleEditSave = (id: number) => {
    const newPrice = parseFloat(editPrice);
    if (isNaN(newPrice) || newPrice <= 0) {
      alert(language === 'ar' ? 'يرجى إدخال سعر صحيح' : 'Please enter a valid price');
      return;
    }

    setMedicines(prev =>
      prev.map(medicine =>
        medicine.id === id ? { ...medicine, price: newPrice } : medicine
      )
    );

    setEditingId(null);
    setEditPrice('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditPrice('');
  };

  const toggleStock = (id: number) => {
    setMedicines(prev =>
      prev.map(medicine =>
        medicine.id === id ? { ...medicine, inStock: !medicine.inStock } : medicine
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'تحديث أسعار الأدوية' : 'Update Medicine Prices'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'ar' 
              ? 'إدارة وتحديث أسعار جميع الأدوية في النظام'
              : 'Manage and update prices for all medicines in the system'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'البحث عن الأدوية...' : 'Search medicines...'}
              className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Medicines Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'الدواء' : 'Medicine'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'العلامة التجارية' : 'Brand'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'القسم' : 'Category'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'السعر الحالي' : 'Current Price'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'التوفر' : 'Stock'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {language === 'ar' ? medicine.nameAr : medicine.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {language === 'ar' ? medicine.name : medicine.nameAr}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {medicine.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {language === 'ar' ? medicine.categoryAr : medicine.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === medicine.id ? (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="0"
                            step="0.01"
                          />
                          <span className="text-sm text-gray-500">EGP</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-medium text-gray-900">
                            {medicine.price} EGP
                          </span>
                          {medicine.originalPrice && medicine.originalPrice > medicine.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {medicine.originalPrice} EGP
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStock(medicine.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          medicine.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {medicine.inStock 
                          ? (language === 'ar' ? 'متوفر' : 'In Stock')
                          : (language === 'ar' ? 'غير متوفر' : 'Out of Stock')
                        }
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingId === medicine.id ? (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => handleEditSave(medicine.id)}
                            className="text-green-600 hover:text-green-900"
                            title={language === 'ar' ? 'حفظ' : 'Save'}
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="text-red-600 hover:text-red-900"
                            title={language === 'ar' ? 'إلغاء' : 'Cancel'}
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditStart(medicine)}
                          className="text-blue-600 hover:text-blue-900"
                          title={language === 'ar' ? 'تعديل السعر' : 'Edit Price'}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMedicines.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {language === 'ar' ? 'لم يتم العثور على أدوية' : 'No medicines found'}
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'ar' ? 'ملخص' : 'Summary'}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{medicines.length}</p>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'إجمالي الأدوية' : 'Total Medicines'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {medicines.filter(m => m.inStock).length}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'متوفر' : 'In Stock'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {medicines.filter(m => !m.inStock).length}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'غير متوفر' : 'Out of Stock'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMedicinePrices;