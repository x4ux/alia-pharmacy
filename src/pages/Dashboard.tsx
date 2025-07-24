import React, { useState } from 'react';
import { 
  ClipboardDocumentListIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { useAuth, useLanguage } from '../App';

interface MedicineRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  medicineName: string;
  quantity: string;
  deliveryAddress: string;
  city: string;
  governorate: string;
  notes: string;
  prescriptionFile?: string;
  status: 'pending' | 'approved' | 'rejected' | 'delivered';
  timestamp: string;
  userId: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedRequest, setSelectedRequest] = useState<MedicineRequest | null>(null);

  // Mock data for medicine requests
  const [requests, setRequests] = useState<MedicineRequest[]>([
    {
      id: '1',
      fullName: 'أحمد محمد علي',
      phoneNumber: '01234567890',
      medicineName: 'Panadol Extra',
      quantity: '2 boxes',
      deliveryAddress: '15 شارع النيل، الدور الثالث، شقة 5',
      city: 'Cairo',
      governorate: 'Cairo',
      notes: 'يرجى التوصيل بعد الساعة 6 مساءً',
      status: 'pending',
      timestamp: '2024-01-15T10:30:00Z',
      userId: 'user1'
    },
    {
      id: '2',
      fullName: 'فاطمة أحمد',
      phoneNumber: '01098765432',
      medicineName: 'Vitamin D3',
      quantity: '1 bottle',
      deliveryAddress: '22 شارع الجمهورية، شقة 12',
      city: 'Alexandria',
      governorate: 'Alexandria',
      notes: '',
      status: 'approved',
      timestamp: '2024-01-15T09:15:00Z',
      userId: 'user2'
    },
    {
      id: '3',
      fullName: 'محمود حسن',
      phoneNumber: '01555444333',
      medicineName: 'Insulin',
      quantity: '3 vials',
      deliveryAddress: '8 شارع المعز، الدور الأول',
      city: 'Giza',
      governorate: 'Giza',
      notes: 'مرض السكري - عاجل',
      status: 'pending',
      timestamp: '2024-01-15T08:45:00Z',
      userId: 'user3'
    }
  ]);

  const handleStatusChange = (requestId: string, newStatus: MedicineRequest['status']) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
    
    // Here you would normally send an API request to update the status
    // and potentially send notifications to the customer
  };

  const getStatusBadge = (status: MedicineRequest['status']) => {
    const statusConfig = {
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: language === 'ar' ? 'في الانتظار' : 'Pending'
      },
      approved: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: language === 'ar' ? 'مقبول' : 'Approved'
      },
      rejected: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: language === 'ar' ? 'مرفوض' : 'Rejected'
      },
      delivered: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: language === 'ar' ? 'تم التوصيل' : 'Delivered'
      }
    };

    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ar-EG') + ' ' + date.toLocaleTimeString('ar-EG', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const stats = {
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'pending').length,
    approvedRequests: requests.filter(r => r.status === 'approved').length,
    deliveredRequests: requests.filter(r => r.status === 'delivered').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'ar' 
              ? `مرحباً ${user?.name}، إليك نظرة عامة على طلبات الأدوية`
              : `Welcome ${user?.name}, here's an overview of medicine requests`
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4 rtl:ml-0 rtl:mr-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'إجمالي الطلبات' : 'Total Requests'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <BellIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4 rtl:ml-0 rtl:mr-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'في الانتظار' : 'Pending'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4 rtl:ml-0 rtl:mr-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'مقبولة' : 'Approved'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.approvedRequests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4 rtl:ml-0 rtl:mr-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'تم التوصيل' : 'Delivered'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.deliveredRequests}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 rtl:space-x-reverse px-6">
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {language === 'ar' ? 'طلبات الأدوية' : 'Medicine Requests'}
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'customers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {language === 'ar' ? 'العملاء' : 'Customers'}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'requests' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {language === 'ar' ? 'طلبات الأدوية' : 'Medicine Requests'}
                  </h2>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">
                      {language === 'ar' ? 'جميع الطلبات' : 'All Requests'}
                    </option>
                    <option value="pending">
                      {language === 'ar' ? 'في الانتظار' : 'Pending'}
                    </option>
                    <option value="approved">
                      {language === 'ar' ? 'مقبولة' : 'Approved'}
                    </option>
                  </select>
                </div>

                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{request.fullName}</h3>
                            {getStatusBadge(request.status)}
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><strong>{language === 'ar' ? 'الدواء:' : 'Medicine:'}</strong> {request.medicineName}</p>
                              <p><strong>{language === 'ar' ? 'الكمية:' : 'Quantity:'}</strong> {request.quantity}</p>
                              <p><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong> {request.phoneNumber}</p>
                            </div>
                            <div>
                              <p><strong>{language === 'ar' ? 'المحافظة:' : 'Governorate:'}</strong> {request.governorate}</p>
                              <p><strong>{language === 'ar' ? 'المدينة:' : 'City:'}</strong> {request.city}</p>
                              <p><strong>{language === 'ar' ? 'التاريخ:' : 'Date:'}</strong> {formatDateTime(request.timestamp)}</p>
                            </div>
                          </div>
                          
                          {request.notes && (
                            <p className="mt-2 text-sm text-gray-700">
                              <strong>{language === 'ar' ? 'ملاحظات:' : 'Notes:'}</strong> {request.notes}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse ml-4 rtl:ml-0 rtl:mr-4">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          
                          <a
                            href={`tel:${request.phoneNumber}`}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title={language === 'ar' ? 'اتصال' : 'Call'}
                          >
                            <PhoneIcon className="h-5 w-5" />
                          </a>
                          
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(request.id, 'approved')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title={language === 'ar' ? 'قبول' : 'Approve'}
                              >
                                <CheckCircleIcon className="h-5 w-5" />
                              </button>
                              
                              <button
                                onClick={() => handleStatusChange(request.id, 'rejected')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title={language === 'ar' ? 'رفض' : 'Reject'}
                              >
                                <XCircleIcon className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          
                          {request.status === 'approved' && (
                            <button
                              onClick={() => handleStatusChange(request.id, 'delivered')}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {language === 'ar' ? 'تم التوصيل' : 'Mark Delivered'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {language === 'ar' ? 'إدارة العملاء' : 'Customer Management'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'قريباً - ستتمكن من إدارة معلومات العملاء هنا'
                    : 'Coming soon - You will be able to manage customer information here'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {language === 'ar' ? 'تفاصيل الطلب' : 'Request Details'}
                  </h3>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? 'معلومات العميل' : 'Customer Information'}
                    </h4>
                    <p><strong>{language === 'ar' ? 'الاسم:' : 'Name:'}</strong> {selectedRequest.fullName}</p>
                    <p><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong> {selectedRequest.phoneNumber}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? 'معلومات الدواء' : 'Medicine Information'}
                    </h4>
                    <p><strong>{language === 'ar' ? 'الدواء:' : 'Medicine:'}</strong> {selectedRequest.medicineName}</p>
                    <p><strong>{language === 'ar' ? 'الكمية:' : 'Quantity:'}</strong> {selectedRequest.quantity}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}
                  </h4>
                  <p>{selectedRequest.deliveryAddress}</p>
                  <p>{selectedRequest.city}, {selectedRequest.governorate}</p>
                </div>
                
                {selectedRequest.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? 'ملاحظات' : 'Notes'}
                    </h4>
                    <p className="bg-gray-50 p-3 rounded-lg">{selectedRequest.notes}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? 'تاريخ الطلب:' : 'Request Date:'} {formatDateTime(selectedRequest.timestamp)}
                    </p>
                    <div className="mt-2">{getStatusBadge(selectedRequest.status)}</div>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <a
                      href={`tel:${selectedRequest.phoneNumber}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {language === 'ar' ? 'اتصال' : 'Call'}
                    </a>
                    <a
                      href={`https://wa.me/2${selectedRequest.phoneNumber.substring(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;