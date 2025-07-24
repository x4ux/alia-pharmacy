import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, EyeIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../App';

interface DoctorRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

const DoctorRequests: React.FC = () => {
  const { language } = useLanguage();
  const [requests, setRequests] = useState<DoctorRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DoctorRequest | null>(null);

  useEffect(() => {
    // Load pending doctor requests from localStorage
    const pendingDoctors = localStorage.getItem('pendingDoctors');
    if (pendingDoctors) {
      const doctors = JSON.parse(pendingDoctors).map((doctor: any) => ({
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        address: doctor.address,
        licenseNumber: doctor.licenseNumber,
        status: 'pending',
        requestDate: new Date().toISOString()
      }));
      setRequests(doctors);
    }
  }, []);

  const handleApprove = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    // Update request status
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    );

    // Create approved doctor account
    const approvedDoctor = {
      id: request.id,
      name: request.name,
      email: request.email,
      phone: request.phone,
      address: request.address,
      role: 'doctor',
      licenseNumber: request.licenseNumber,
      status: 'active',
      verified: true,
      approvedDate: new Date().toISOString()
    };

    // Store approved doctor
    const approvedDoctors = JSON.parse(localStorage.getItem('approvedDoctors') || '[]');
    approvedDoctors.push(approvedDoctor);
    localStorage.setItem('approvedDoctors', JSON.stringify(approvedDoctors));

    // Remove from pending list
    const pendingDoctors = JSON.parse(localStorage.getItem('pendingDoctors') || '[]');
    const updatedPending = pendingDoctors.filter((doc: any) => doc.id !== requestId);
    localStorage.setItem('pendingDoctors', JSON.stringify(updatedPending));

    alert(language === 'ar' 
      ? 'تم قبول طلب الطبيب بنجاح'
      : 'Doctor request approved successfully'
    );
  };

  const handleReject = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );

    // Remove from pending list
    const pendingDoctors = JSON.parse(localStorage.getItem('pendingDoctors') || '[]');
    const updatedPending = pendingDoctors.filter((doc: any) => doc.id !== requestId);
    localStorage.setItem('pendingDoctors', JSON.stringify(updatedPending));

    alert(language === 'ar' 
      ? 'تم رفض طلب الطبيب'
      : 'Doctor request rejected'
    );
  };

  const getStatusBadge = (status: DoctorRequest['status']) => {
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
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US') + ' ' + 
           date.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { 
             hour: '2-digit', 
             minute: '2-digit' 
           });
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'طلبات الأطباء' : 'Doctor Requests'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'ar' 
              ? 'مراجعة وموافقة طلبات الأطباء الجدد'
              : 'Review and approve new doctor registration requests'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <CheckCircleIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4 rtl:ml-0 rtl:mr-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'طلبات معلقة' : 'Pending Requests'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4 rtl:ml-0 rtl:mr-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'طلبات مقبولة' : 'Approved'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {requests.filter(r => r.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <XCircleIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4 rtl:ml-0 rtl:mr-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'طلبات مرفوضة' : 'Rejected'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {requests.filter(r => r.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'ar' ? 'الطلبات المعلقة' : 'Pending Requests'}
            </h2>
          </div>

          <div className="p-6">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {language === 'ar' ? 'لا توجد طلبات معلقة' : 'No pending requests'}
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                          {getStatusBadge(request.status)}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><strong>{language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</strong> {request.email}</p>
                            <p><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong> {request.phone}</p>
                            <p><strong>{language === 'ar' ? 'رقم الترخيص:' : 'License Number:'}</strong> {request.licenseNumber}</p>
                          </div>
                          <div>
                            <p><strong>{language === 'ar' ? 'العنوان:' : 'Address:'}</strong> {request.address}</p>
                            <p><strong>{language === 'ar' ? 'تاريخ الطلب:' : 'Request Date:'}</strong> {formatDateTime(request.requestDate)}</p>
                          </div>
                        </div>
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
                          href={`tel:${request.phone}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title={language === 'ar' ? 'اتصال' : 'Call'}
                        >
                          <PhoneIcon className="h-5 w-5" />
                        </a>
                        
                        <a
                          href={`mailto:${request.email}`}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title={language === 'ar' ? 'إرسال بريد إلكتروني' : 'Send Email'}
                        >
                          <EnvelopeIcon className="h-5 w-5" />
                        </a>
                        
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                        >
                          {language === 'ar' ? 'قبول' : 'Approve'}
                        </button>
                        
                        <button
                          onClick={() => handleReject(request.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                        >
                          {language === 'ar' ? 'رفض' : 'Reject'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Processed Requests */}
        {processedRequests.length > 0 && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {language === 'ar' ? 'الطلبات المعالجة' : 'Processed Requests'}
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {processedRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-1">
                          <h3 className="font-semibold text-gray-900">{request.name}</h3>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-gray-600">{request.email} • {request.phone}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDateTime(request.requestDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {language === 'ar' ? 'تفاصيل طلب الطبيب' : 'Doctor Request Details'}
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
                      {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                    </h4>
                    <p><strong>{language === 'ar' ? 'الاسم:' : 'Name:'}</strong> {selectedRequest.name}</p>
                    <p><strong>{language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</strong> {selectedRequest.email}</p>
                    <p><strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong> {selectedRequest.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? 'المعلومات المهنية' : 'Professional Information'}
                    </h4>
                    <p><strong>{language === 'ar' ? 'رقم الترخيص:' : 'License Number:'}</strong> {selectedRequest.licenseNumber}</p>
                    <p><strong>{language === 'ar' ? 'تاريخ الطلب:' : 'Request Date:'}</strong> {formatDateTime(selectedRequest.requestDate)}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'ar' ? 'العنوان' : 'Address'}
                  </h4>
                  <p className="bg-gray-50 p-3 rounded-lg">{selectedRequest.address}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>{getStatusBadge(selectedRequest.status)}</div>
                  
                  {selectedRequest.status === 'pending' && (
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => {
                          handleApprove(selectedRequest.id);
                          setSelectedRequest(null);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        {language === 'ar' ? 'قبول' : 'Approve'}
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedRequest.id);
                          setSelectedRequest(null);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        {language === 'ar' ? 'رفض' : 'Reject'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorRequests;