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

// === COMPONENT CHA: TRANG QUẢN LÝ ===
const AppointmentManagementPage = () => {
  const [appointments, setAppointments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAppointments(currentPage);
  }, [currentPage]);

  const fetchAppointments = async (page) => {
    try {
      setLoading(true);
      const response = await getAllAppointments(page, 10);
      
      setAppointments(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);

    } catch (err) {
      setError('Không thể tải danh sách lịch hẹn.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    if (window.confirm(`Bạn có chắc muốn ${newStatus === 'Đã xác nhận' ? 'XÁC NHẬN' : 'HỦY'} lịch hẹn này?`)) {
      try {
        await updateAppointmentStatus(id, newStatus);
        fetchAppointments(currentPage); 
      } catch (err) {
        alert('Lỗi khi cập nhật: ' + (err.response?.data || err.message));
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // === HÀM HELPER MỚI: Lấy tên Đối tượng (BS/BV/PK) ===
  const getProviderName = (app) => {
    const loaiDoiTuong = app.lichGio?.lichTong?.loaiDoiTuong;
    const maDoiTuong = app.lichGio?.lichTong?.maDoiTuong;
    
    if (!loaiDoiTuong) return '(Không rõ)';
    
    // (Đây là logic tạm thời, lý tưởng nhất là backend nên trả về tên)
    return `${loaiDoiTuong} (ID: ${maDoiTuong})`; 
  }

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
              {/* Sửa: Đối tượng khám */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đối tượng khám</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày giờ hẹn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* 6. Biến 'appointments' bây giờ là mảng, .map() sẽ chạy */}
            {appointments.map((app) => (
              
              // === SỬA LỖI 1: Sửa 'app.id' -> 'app.maLichHen' ===
              <tr key={app.maLichHen}> 
                
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {app.user?.fullName || '(Không rõ)'}
                </td>
                
                <td className="px-6 py-4 text-sm text-gray-500">
                  {/* (Chúng ta sẽ sửa logic này sau để nó hiển thị tên) */}
                  {app.lichGio?.lichTong?.loaiDoiTuong} (ID: {app.lichGio?.lichTong?.maDoiTuong})
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {app.lichGio?.lichTong?.ngay} - {app.lichGio?.khungGio}
                </td>
                
                <td className="px-6 py-4 text-sm">
                  {/* Sửa: Dùng tên trường Java 'trangThai' */}
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.trangThai === 'Đã xác nhận' ? 'bg-green-100 text-green-800' 
                    : app.trangThai === 'Đã hủy' ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.trangThai}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  {app.trangThai === 'Đang chờ' && (
                    <>
                      <button
                        // === SỬA LỖI 2: Sửa 'app.id' -> 'app.maLichHen' ===
                        onClick={() => handleUpdateStatus(app.maLichHen, 'Đã xác nhận')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Xác nhận
                      </button>
                      <button
                        // === SỬA LỖI 3: Sửa 'app.id' -> 'app.maLichHen' ===
                        onClick={() => handleUpdateStatus(app.maLichHen, 'Đã hủy')}
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

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AppointmentManagementPage;