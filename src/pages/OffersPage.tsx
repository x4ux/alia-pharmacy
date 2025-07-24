import React from 'react';
import { TagIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../App';

const OffersPage: React.FC = () => {
  const { language } = useLanguage();

  const offers = [
    {
      id: 1,
      title: 'Buy 2 Get 1 Free',
      titleAr: 'اشتري 2 واحصل على 1 مجاناً',
      description: 'On all vitamins and supplements',
      descriptionAr: 'على جميع الفيتامينات والمكملات',
      discount: '33%',
      validUntil: '2024-02-15',
      image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Vitamins & Supplements',
      categoryAr: 'الفيتامينات والمكملات',
      featured: true
    },
    {
      id: 2,
      title: 'Free Delivery',
      titleAr: 'توصيل مجاني',
      description: 'On orders over 200 EGP',
      descriptionAr: 'على الطلبات أكثر من 200 جنيه',
      discount: 'Free',
      validUntil: '2024-01-31',
      image: 'https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'All Categories',
      categoryAr: 'جميع الأقسام',
      featured: true
    },
    {
      id: 3,
      title: 'Pain Relief Sale',
      titleAr: 'تخفيضات على مسكنات الألم',
      description: 'Up to 25% off on pain medications',
      descriptionAr: 'خصم يصل إلى 25% على أدوية الألم',
      discount: '25%',
      validUntil: '2024-02-01',
      image: 'https://images.pexels.com/photos/3683088/pexels-photo-3683088.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Pain Relief',
      categoryAr: 'مسكنات الألم',
      featured: false
    },
    {
      id: 4,
      title: 'Skin Care Bundle',
      titleAr: 'باقة العناية بالبشرة',
      description: 'Complete skincare routine at special price',
      descriptionAr: 'روتين كامل للعناية بالبشرة بسعر خاص',
      discount: '30%',
      validUntil: '2024-02-20',
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Skin Care',
      categoryAr: 'العناية بالبشرة',
      featured: false
    },
    {
      id: 5,
      title: 'First Order Discount',
      titleAr: 'خصم الطلب الأول',
      description: '15% off for new customers',
      descriptionAr: '15% خصم للعملاء الجدد',
      discount: '15%',
      validUntil: '2024-03-01',
      image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'All Categories',
      categoryAr: 'جميع الأقسام',
      featured: false
    },
    {
      id: 6,
      title: 'Cold & Flu Season',
      titleAr: 'موسم البرد والإنفلونزا',
      description: 'Special prices on cold medicines',
      descriptionAr: 'أسعار خاصة على أدوية البرد',
      discount: '20%',
      validUntil: '2024-02-10',
      image: 'https://images.pexels.com/photos/3952237/pexels-photo-3952237.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Cold & Flu',
      categoryAr: 'البرد والإنفلونزا',
      featured: false
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysLeft = (dateString: string) => {
    const today = new Date();
    const endDate = new Date(dateString);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const featuredOffers = offers.filter(offer => offer.featured);
  const regularOffers = offers.filter(offer => !offer.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'ar' ? 'العروض والخصومات' : 'Offers & Promotions'}
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف أفضل العروض على الأدوية والمستحضرات الصيدلانية'
              : 'Discover the best deals on medicines and pharmaceutical products'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Offers */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
            <StarIcon className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'العروض المميزة' : 'Featured Offers'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredOffers.map((offer) => (
              <div key={offer.id} className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                  {offer.discount === 'Free' ? (
                    language === 'ar' ? 'مجاني' : 'FREE'
                  ) : (
                    `${offer.discount} ${language === 'ar' ? 'خصم' : 'OFF'}`
                  )}
                </div>
                
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={offer.image}
                      alt={language === 'ar' ? offer.titleAr : offer.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:w-1/2 p-6">
                    <div className="mb-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {language === 'ar' ? offer.categoryAr : offer.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {language === 'ar' ? offer.titleAr : offer.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {language === 'ar' ? offer.descriptionAr : offer.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <ClockIcon className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span>
                        {language === 'ar' ? 'ينتهي في:' : 'Valid until:'} {formatDate(offer.validUntil)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        {getDaysLeft(offer.validUntil) > 0 ? (
                          <span className="text-orange-600 font-medium">
                            {getDaysLeft(offer.validUntil)} {language === 'ar' ? 'يوم متبقي' : 'days left'}
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            {language === 'ar' ? 'انتهى العرض' : 'Expired'}
                          </span>
                        )}
                      </div>
                      
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Offers */}
        <div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
            <TagIcon className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'جميع العروض' : 'All Offers'}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img
                    src={offer.image}
                    alt={language === 'ar' ? offer.titleAr : offer.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    {offer.discount === 'Free' ? (
                      language === 'ar' ? 'مجاني' : 'FREE'
                    ) : (
                      `${offer.discount} ${language === 'ar' ? 'خصم' : 'OFF'}`
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {language === 'ar' ? offer.categoryAr : offer.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {language === 'ar' ? offer.titleAr : offer.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {language === 'ar' ? offer.descriptionAr : offer.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <ClockIcon className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                    <span>{formatDate(offer.validUntil)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {getDaysLeft(offer.validUntil) > 0 ? (
                      <span className="text-orange-600 font-medium text-sm">
                        {getDaysLeft(offer.validUntil)} {language === 'ar' ? 'يوم متبقي' : 'days left'}
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium text-sm">
                        {language === 'ar' ? 'انتهى' : 'Expired'}
                      </span>
                    )}
                    
                    <button 
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        getDaysLeft(offer.validUntil) > 0
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={getDaysLeft(offer.validUntil) <= 0}
                    >
                      {language === 'ar' ? 'تسوق' : 'Shop'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Newsletter'}
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'كن أول من يعلم بالعروض الجديدة والخصومات الحصرية'
              : 'Be the first to know about new offers and exclusive discounts'
            }
          </p>
          
          <div className="max-w-md mx-auto flex space-x-3 rtl:space-x-reverse">
            <input
              type="email"
              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {language === 'ar' ? 'اشترك' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;