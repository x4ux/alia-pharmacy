import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  TruckIcon, 
  ClockIcon, 
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../App';

const Homepage: React.FC = () => {
  const { language, t } = useLanguage();

  const categories = [
    {
      name: 'Vitamins & Supplements',
      nameAr: 'الفيتامينات والمكملات',
      icon: '💊',
      color: 'bg-green-100 text-green-800',
      items: 120
    },
    {
      name: 'Cold & Flu',
      nameAr: 'البرد والإنفلونزا',
      icon: '🤒',
      color: 'bg-blue-100 text-blue-800',
      items: 85
    },
    {
      name: 'Pain Relief',
      nameAr: 'مسكنات الألم',
      icon: '🩹',
      color: 'bg-red-100 text-red-800',
      items: 95
    },
    {
      name: 'Skin Care',
      nameAr: 'العناية بالبشرة',
      icon: '🧴',
      color: 'bg-pink-100 text-pink-800',
      items: 160
    },
    {
      name: 'Antibiotics',
      nameAr: 'المضادات الحيوية',
      icon: '💉',
      color: 'bg-yellow-100 text-yellow-800',
      items: 75
    },
    {
      name: 'Digestive Health',
      nameAr: 'صحة الجهاز الهضمي',
      icon: '🫁',
      color: 'bg-purple-100 text-purple-800',
      items: 65
    },
    {
      name: 'Personal Care',
      nameAr: 'العناية الشخصية',
      icon: '🧼',
      color: 'bg-indigo-100 text-indigo-800',
      items: 200
    }
  ];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Quality Guaranteed',
      titleAr: 'جودة مضمونة',
      description: 'All medicines are sourced from licensed distributors',
      descriptionAr: 'جميع الأدوية من موزعين معتمدين'
    },
    {
      icon: TruckIcon,
      title: 'Fast Delivery',
      titleAr: 'توصيل سريع',
      description: 'Same day delivery in Cairo, next day nationwide',
      descriptionAr: 'توصيل في نفس اليوم في القاهرة، وفي اليوم التالي لباقي المحافظات'
    },
    {
      icon: ClockIcon,
      title: '24/7 Service',
      titleAr: 'خدمة على مدار الساعة',
      description: 'Round the clock customer support',
      descriptionAr: 'دعم العملاء على مدار الساعة'
    },
    {
      icon: PhoneIcon,
      title: 'Expert Consultation',
      titleAr: 'استشارة طبية',
      description: 'Free consultation with licensed pharmacists',
      descriptionAr: 'استشارة مجانية مع صيادلة مرخصين'
    }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      nameEn: 'Ahmed Mohamed',
      text: 'خدمة ممتازة وتوصيل سريع. أنصح الجميع بالتعامل مع صيدلية علياء علي',
      textEn: 'Excellent service and fast delivery. I recommend Alia Ali Pharmacy to everyone',
      rating: 5
    },
    {
      name: 'فاطمة علي',
      nameEn: 'Fatma Ali',
      text: 'أسعار مناسبة وأدوية أصلية. التطبيق سهل الاستخدام',
      textEn: 'Fair prices and genuine medicines. The website is easy to use',
      rating: 5
    },
    {
      name: 'محمود حسن',
      nameEn: 'Mahmoud Hassan',
      text: 'فريق العمل محترف والاستشارة الطبية مفيدة جداً',
      textEn: 'Professional team and very helpful medical consultation',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {language === 'ar' ? 'صيدلية علياء علي' : 'Alia Ali Pharmacy'}
                </h1>
                <p className="text-xl text-blue-100 mt-4">
                  {language === 'ar' 
                    ? 'صيدليتك الموثوقة - أدوية عالية الجودة توصل إلى باب منزلك'
                    : 'Your Trusted Online Pharmacy - Quality medicines delivered to your doorstep'
                  }
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/request-medicine"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-center"
                >
                  {language === 'ar' ? 'اطلب دواءك الآن' : 'Order Medicine Now'}
                </Link>
                <a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-center flex items-center justify-center"
                >
                  <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2 rtl:mr-0 rtl:ml-2" />
                  {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Pharmacy"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'لماذا تختار صيدلية علياء علي؟' : 'Why Choose Alia Ali Pharmacy?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'نحن ملتزمون بتقديم أفضل الخدمات الصيدلانية مع ضمان الجودة والسرعة'
                : 'We are committed to providing the best pharmaceutical services with quality and speed guarantee'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {language === 'ar' ? feature.titleAr : feature.title}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? feature.descriptionAr : feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'تصفح أقسام الأدوية' : 'Browse Medicine Categories'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'ar' 
                ? 'اعثر على ما تحتاجه من أدوية ومستحضرات صيدلانية'
                : 'Find what you need from medicines and pharmaceutical products'
              }
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                    {language === 'ar' ? category.nameAr : category.name}
                  </h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                    {category.items} {language === 'ar' ? 'منتج' : 'products'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Customers Say'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{language === 'ar' ? testimonial.text : testimonial.textEn}"
                </p>
                <div className="font-semibold text-gray-900">
                  {language === 'ar' ? testimonial.name : testimonial.nameEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {language === 'ar' ? 'جاهز لطلب أدويتك؟' : 'Ready to Order Your Medicines?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'انضم إلى آلاف العملاء الذين يثقون في صيدلية علياء علي'
              : 'Join thousands of customers who trust Alia Ali Pharmacy'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              {language === 'ar' ? 'إنشاء حساب جديد' : 'Create New Account'}
            </Link>
            <Link
              to="/request-medicine"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              {language === 'ar' ? 'اطلب دواءك الآن' : 'Order Medicine Now'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;