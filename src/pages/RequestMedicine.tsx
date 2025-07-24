import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudArrowUpIcon, PaperAirplaneIcon, UserIcon, PhoneIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useAuth, useLanguage } from '../App';

const RequestMedicine: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    medicineName: '',
    quantity: '',
    deliveryAddress: '',
    city: '',
    governorate: '',
    notes: ''
  });
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const egyptianGovernorates = [
    'Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said', 'Suez',
    'Luxor', 'Mansoura', 'El-Mahalla El-Kubra', 'Tanta', 'Asyut', 'Ismailia',
    'Fayyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'Minya', 'Beni Suef',
    'Qena', 'Sohag', 'Hurghada', 'Sharm el-Sheikh', 'Marsa Matruh', 'Arish'
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = language === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (!/^01[0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = language === 'ar' ? 'رقم الهاتف غير صحيح' : 'Phone number is invalid';
    }

    if (!formData.medicineName.trim()) {
      newErrors.medicineName = language === 'ar' ? 'اسم الدواء مطلوب' : 'Medicine name is required';
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = language === 'ar' ? 'الكمية مطلوبة' : 'Quantity is required';
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = language === 'ar' ? 'عنوان التوصيل مطلوب' : 'Delivery address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = language === 'ar' ? 'المدينة مطلوبة' : 'City is required';
    }

    if (!formData.governorate) {
      newErrors.governorate = language === 'ar' ? 'المحافظة مطلوبة' : 'Governorate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to send request to admin/doctor dashboard
    setTimeout(() => {
      // Here you would normally send the data to your backend
      console.log('Medicine request submitted:', {
        ...formData,
        prescriptionFile,
        userId: user?.id,
        timestamp: new Date().toISOString()
      });

      alert(language === 'ar' 
        ? 'تم إرسال طلبك بنجاح! سيتواصل معك فريقنا قريباً.'
        : 'Your request has been submitted successfully! Our team will contact you soon.'
      );

      setIsSubmitting(false);
      navigate('/');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type (image or PDF)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert(language === 'ar' 
          ? 'يرجى رفع ملف صورة (JPG, PNG) أو PDF فقط'
          : 'Please upload only image (JPG, PNG) or PDF files'
        );
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'ar' 
          ? 'حجم الملف يجب أن يكون أقل من 5 ميجابايت'
          : 'File size must be less than 5MB'
        );
        return;
      }

      setPrescriptionFile(file);
    }
  };

  // Pre-fill form with user data if available
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        phoneNumber: user.phone || ''
      }));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              {language === 'ar' ? 'طلب دواء' : 'Request Medicine'}
            </h1>
            <p className="text-blue-100 mt-2">
              {language === 'ar' 
                ? 'املأ النموذج أدناه وسيتواصل معك فريقنا قريباً'
                : 'Fill out the form below and our team will contact you soon'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                  </h2>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'ar' ? 'مثال: 01234567890' : 'Example: 01234567890'}
                  />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                </div>

                {/* Medicine Name */}
                <div>
                  <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'اسم الدواء' : 'Medicine Name'} *
                  </label>
                  <input
                    type="text"
                    id="medicineName"
                    name="medicineName"
                    value={formData.medicineName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.medicineName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'ar' ? 'أدخل اسم الدواء المطلوب' : 'Enter the medicine name you need'}
                  />
                  {errors.medicineName && <p className="mt-1 text-sm text-red-600">{errors.medicineName}</p>}
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'الكمية' : 'Quantity'} *
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.quantity ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'ar' ? 'مثال: علبة واحدة، 30 قرص' : 'Example: 1 box, 30 tablets'}
                  />
                  {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                </div>
              </div>

              {/* Delivery Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                  <HomeIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {language === 'ar' ? 'معلومات التوصيل' : 'Delivery Information'}
                  </h2>
                </div>

                {/* Delivery Address */}
                <div>
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'} *
                  </label>
                  <textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    rows={3}
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'ar' 
                      ? 'أدخل العنوان الكامل للتوصيل (الشارع، المبنى، الدور، الشقة)'
                      : 'Enter full delivery address (street, building, floor, apartment)'
                    }
                  />
                  {errors.deliveryAddress && <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress}</p>}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'المدينة' : 'City'} *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'ar' ? 'أدخل اسم المدينة' : 'Enter city name'}
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>

                {/* Governorate */}
                <div>
                  <label htmlFor="governorate" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'المحافظة' : 'Governorate'} *
                  </label>
                  <select
                    id="governorate"
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.governorate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">
                      {language === 'ar' ? 'اختر المحافظة' : 'Select Governorate'}
                    </option>
                    {egyptianGovernorates.map((gov) => (
                      <option key={gov} value={gov}>{gov}</option>
                    ))}
                  </select>
                  {errors.governorate && <p className="mt-1 text-sm text-red-600">{errors.governorate}</p>}
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'ar' 
                      ? 'أي ملاحظات إضافية حول الطلب...'
                      : 'Any additional notes about the request...'
                    }
                  />
                </div>
              </div>
            </div>

            {/* Prescription Upload Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <CloudArrowUpIcon className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'ar' ? 'رفع الروشتة الطبية (اختياري)' : 'Upload Prescription (Optional)'}
                </h2>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="prescription"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="prescription"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900">
                    {language === 'ar' ? 'اضغط لرفع الروشتة' : 'Click to upload prescription'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {language === 'ar' 
                      ? 'يمكنك رفع صورة (JPG, PNG) أو ملف PDF (أقصى حجم 5 ميجابايت)'
                      : 'Upload image (JPG, PNG) or PDF file (Max size 5MB)'
                    }
                  </p>
                </label>
                
                {prescriptionFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✓ {prescriptionFile.name} ({(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp Contact Info */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <PhoneIcon className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-800">
                  {language === 'ar' 
                    ? 'للاستفسارات العاجلة، تواصل معنا عبر واتساب: '
                    : 'For urgent inquiries, contact us on WhatsApp: '
                  }
                  <a
                    href="https://wa.me/201234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline"
                  >
                    01234567890
                  </a>
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                    {language === 'ar' ? 'جار إرسال الطلب...' : 'Submitting request...'}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <PaperAirplaneIcon className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
                  </div>
                )}
              </button>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                {language === 'ar' 
                  ? 'بالضغط على "إرسال الطلب" فإنك توافق على شروط الخدمة'
                  : 'By clicking "Submit Request" you agree to our terms of service'
                }
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestMedicine;