import React, { useState, useEffect } from 'react';
import { 
  getAllAppointments, 
  updateAppointmentStatus 
} from '../../api/adminService'; 

// === COMPONENT CON: PaginationControls ===
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="mt-6 flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
      >
        Trước
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {number + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
      >
        Sau
      </button>
    </div>
  );
};

// === COMPONENT CHA: TRANG QUẢN LÝ (ĐÃ SỬA LỖI) ===
const AppointmentManagementPage = () => {
  const [appointments, setAppointments] = useState([]); // Sẽ chứa mảng [content]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. THÊM STATE PHÂN TRANG
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 2. SỬA useEffect (để tải lại khi 'currentPage' thay đổi)
  useEffect(() => {
    fetchAppointments(currentPage);
  }, [currentPage]);

  // 3. SỬA HÀM FETCH
  const fetchAppointments = async (page) => {
    try {
      setLoading(true);
      // Gọi API với page và size (10)
      const response = await getAllAppointments(page, 10);
      
      // 4. SỬA LỖI Ở ĐÂY: Lấy 'content' từ object 'Page'
      setAppointments(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);

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
        // Tải lại trang hiện tại
        fetchAppointments(currentPage); 
      } catch (err) {
        alert('Lỗi khi cập nhật: ' + (err.response?.data || err.message));
      }
    }
  };

  // 5. HÀM MỚI
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            {/* 6. Biến 'appointments' bây giờ là mảng, .map() sẽ chạy */}
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

      {/* 7. THÊM BỘ ĐIỀU KHIỂN TRANG */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AppointmentManagementPage;