import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, UserIcon, ShoppingBagIcon, Bars3Icon, XMarkIcon, GlobeAltIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useAuth, useLanguage } from '../App';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAdmin } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const categories = [
    'Vitamins & Supplements',
    'Cold & Flu',
    'Pain Relief',
    'Skin Care',
    'Antibiotics',
    'Digestive Health',
    'Personal Care'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span>📞 01234567890</span>
              <span>📧 info@aliaali-pharmacy.com</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 rtl:space-x-reverse hover:text-blue-200 transition-colors"
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <ShoppingBagIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">Alia Ali Pharmacy</h1>
              <p className="text-sm text-gray-600">صيدلية علياء علي</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="w-full py-2 px-4 pr-12 rtl:pr-4 rtl:pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'مرحباً' : 'Welcome'}, {user.name}
                </span>
                {isAdmin && (
                  <Link
                    to="/dashboard"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t('nav.dashboard')}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center justify-center space-x-8 rtl:space-x-reverse py-4 border-t border-gray-200">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            {t('nav.home')}
          </Link>
          
          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
              {t('nav.categories')}
              <svg className="ml-1 rtl:ml-0 rtl:mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 rtl:left-auto rtl:right-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/offers" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            {t('nav.offers')}
          </Link>

          {user && (
            <Link to="/request-medicine" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Request Medicine
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="w-full py-2 px-4 pr-12 rtl:pr-4 rtl:pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
          
          <div className="space-y-1 pb-4">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
            
            <Link
              to="/offers"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.offers')}
            </Link>

            {user && (
              <Link
                to="/request-medicine"
                className="block mx-4 mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Request Medicine
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;