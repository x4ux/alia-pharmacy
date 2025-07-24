import React, { useState } from 'react';
import { XMarkIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useAuth, useLanguage } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert(language === 'ar' ? 'يرجى تسجيل الدخول أولاً' : 'Please login first');
      return;
    }

    if (items.length === 0) {
      alert(language === 'ar' ? 'السلة فارغة' : 'Cart is empty');
      return;
    }

    setIsPlacingOrder(true);

    // Simulate API call to send order to admin/doctor
    const orderData = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      customerName: user.name,
      customerPhone: user.phone || 'Not provided',
      customerEmail: user.email,
      customerAddress: user.address || 'Not provided',
      items: items.map(item => ({
        id: item.id,
        name: language === 'ar' ? item.nameAr : item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity
      })),
      totalPrice: getTotalPrice(),
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    // Simulate sending notification to admin/doctor
    setTimeout(() => {
      console.log('Order sent to admin/doctor:', orderData);
      
      // Store order in localStorage (in real app, this would be sent to backend)
      const existingOrders = JSON.parse(localStorage.getItem('pharmacy_orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('pharmacy_orders', JSON.stringify(existingOrders));

      alert(language === 'ar' 
        ? 'تم إرسال طلبك بنجاح! سيتواصل معك فريقنا قريباً.'
        : 'Your order has been placed successfully! Our team will contact you soon.'
      );

      clearCart();
      setIsPlacingOrder(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShoppingCartIcon className="h-6 w-6 mr-2 rtl:mr-0 rtl:ml-2" />
              {language === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {language === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 rtl:space-x-reverse bg-gray-50 p-3 rounded-lg">
                    <img
                      src={item.image}
                      alt={language === 'ar' ? item.nameAr : item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {language === 'ar' ? item.nameAr : item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-sm font-semibold text-blue-600">
                        {item.price} EGP × {item.quantity} = {item.price * item.quantity} EGP
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-100 text-red-600 rounded ml-2 rtl:ml-0 rtl:mr-2"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>{language === 'ar' ? 'المجموع:' : 'Total:'}</span>
                <span className="text-blue-600">{getTotalPrice()} EGP</span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder || !user}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {isPlacingOrder ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                      {language === 'ar' ? 'جار إرسال الطلب...' : 'Placing order...'}
                    </div>
                  ) : (
                    language === 'ar' ? 'إتمام الطلب' : 'Place Order'
                  )}
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {language === 'ar' ? 'إفراغ السلة' : 'Clear Cart'}
                </button>
              </div>

              {!user && (
                <p className="text-sm text-red-600 text-center">
                  {language === 'ar' ? 'يرجى تسجيل الدخول لإتمام الطلب' : 'Please login to place order'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;