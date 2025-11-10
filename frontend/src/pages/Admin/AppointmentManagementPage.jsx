import React, { useState, useEffect } from 'react';
import { 
  getAllAppointments, 
  updateAppointmentStatus 
} from '../../api/adminService'; 

const AppointmentManagementPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getAllAppointments();
      setAppointments(response.data);
    } catch (err) {
      setError('Không thể tải danh sách lịch hẹn.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý Cập nhật trạng thái
  const handleUpdateStatus = async (id, newStatus) => {
    if (window.confirm(`Bạn có chắc muốn ${newStatus === 'Đã xác nhận' ? 'XÁC NHẬN' : 'HỦY'} lịch hẹn này?`)) {
      try {
        await updateAppointmentStatus(id, newStatus);
        // Tải lại danh sách
        fetchAppointments(); 
      } catch (err) {
        alert('Lỗi khi cập nhật: ' + (err.response?.data || err.message));
      }
    }
  };

  if (loading) return <div>Đang tải danh sách...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Lịch hẹn</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bệnh nhân</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bác sĩ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày giờ hẹn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {app.user?.fullName || '(Không rõ)'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {app.doctor?.name || '(Không rõ)'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {app.appointmentDate} - {app.appointmentTime}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.status === 'Đã xác nhận' ? 'bg-green-100 text-green-800' 
                    : app.status === 'Đã hủy' ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  {/* Chỉ hiển thị nút nếu đang 'Đang chờ' */}
                  {app.status === 'Đang chờ' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(app.id, 'Đã xác nhận')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Xác nhận
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(app.id, 'Đã hủy')}
                        className="ml-4 text-red-600 hover:text-red-900"
                      >
                        Hủy
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManagementPage;