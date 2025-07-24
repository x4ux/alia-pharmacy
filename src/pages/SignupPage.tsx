import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth, useLanguage } from '../App';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    address: '',
    licenseNumber: '' // For doctors
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { login } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = language === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (!/^01[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = language === 'ar' ? 'رقم الهاتف غير صحيح' : 'Phone number is invalid';
    }

    if (!formData.password) {
      newErrors.password = language === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = language === 'ar' ? 'كلمة المرور غير متطابقة' : 'Passwords do not match';
    }

    if (formData.userType === 'doctor' && !formData.licenseNumber.trim()) {
      newErrors.licenseNumber = language === 'ar' ? 'رقم الترخيص مطلوب للأطباء' : 'License number is required for doctors';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.userType,
        address: formData.address,
        licenseNumber: formData.licenseNumber
      };
      
      login(userData);
      setIsLoading(false);
      
      // Redirect based on user type
      if (formData.userType === 'admin' || formData.userType === 'doctor') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'إنشاء حساب جديد' : 'Create New Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {language === 'ar' ? 'أو' : 'Or'}{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              {language === 'ar' ? 'تسجيل الدخول لحساب موجود' : 'sign in to your existing account'}
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'نوع المستخدم' : 'User Type'}
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="customer">
                  {language === 'ar' ? 'عميل' : 'Customer'}
                </option>
                <option value="doctor">
                  {language === 'ar' ? 'طبيب' : 'Doctor'}
                </option>
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={language === 'ar' ? 'مثال: 01234567890' : 'Example: 01234567890'}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* License Number (for doctors) */}
            {formData.userType === 'doctor' && (
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'رقم ترخيص الطبيب' : 'Medical License Number'} *
                </label>
                <input
                  id="licenseNumber"
                  name="licenseNumber"
                  type="text"
                  required
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errors.licenseNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={language === 'ar' ? 'أدخل رقم الترخيص' : 'Enter license number'}
                />
                {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
              </div>
            )}

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'العنوان' : 'Address'}
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={language === 'ar' ? 'أدخل عنوانك الكامل' : 'Enter your full address'}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'كلمة المرور' : 'Password'} *
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 pr-10 rtl:pr-3 rtl:pl-10 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pr-0 rtl:pl-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'} *
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 pr-10 rtl:pr-3 rtl:pl-10 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={language === 'ar' ? 'أعد إدخال كلمة المرور' : 'Re-enter your password'}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pr-0 rtl:pl-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 rtl:ml-0 rtl:mr-2 block text-sm text-gray-900">
              {language === 'ar' 
                ? 'أوافق على الشروط والأحكام وسياسة الخصوصية'
                : 'I agree to the Terms and Conditions and Privacy Policy'
              }
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                  {language === 'ar' ? 'جار إنشاء الحساب...' : 'Creating account...'}
                </div>
              ) : (
                language === 'ar' ? 'إنشاء حساب' : 'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;