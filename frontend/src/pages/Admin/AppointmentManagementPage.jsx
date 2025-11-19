import React, { useState, useEffect } from 'react';
import { 
  getAllAppointments, 
  updateAppointmentStatus 
} from '../../api/adminService'; 


const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  // Nếu chỉ có 1 trang thì không cần hiển thị
  if (totalPages <= 1) return null;

  // Tạo một mảng các số trang, ví dụ: [0, 1, 2] nếu totalPages = 3
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  // Định nghĩa style CSS (Tailwind) cho các nút
  const baseStyle = "px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "bg-gray-200 text-gray-700 hover:bg-gray-300";
  const disabledStyle = "bg-gray-100 text-gray-400 cursor-not-allowed";

  return (
    <div className="mt-6 flex justify-center items-center gap-2">
      {/* === NÚT TRƯỚC === */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0} // Vô hiệu hóa khi ở trang đầu (trang 0)
        className={`${baseStyle} ${
          currentPage === 0 ? disabledStyle : inactiveStyle
        }`}
      >
        Trước
      </button>

      {/* === CÁC NÚT SỐ TRANG === */}
      {pageNumbers.map((pageIndex) => (
        <button
          key={pageIndex}
          onClick={() => onPageChange(pageIndex)}
          className={`${baseStyle} ${
            currentPage === pageIndex ? activeStyle : inactiveStyle
          }`}
        >
          {pageIndex + 1} {/* Hiển thị 1, 2, 3... thay vì 0, 1, 2... */}
        </button>
      ))}

      {/* === NÚT SAU === */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1} // Vô hiệu hóa khi ở trang cuối
        className={`${baseStyle} ${
          currentPage === totalPages - 1 ? disabledStyle : inactiveStyle
        }`}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đối tượng khám</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày giờ hẹn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ghi chú</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          
          {/* === SỬA LẠI TBODY ĐỂ ĐỌC DTO MỚI === */}
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((app) => (
              
              <tr key={app.maLichHen}> 
                
                {/* 1. Tên Bệnh nhân (DTO) */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {app.patientName || '(Không rõ)'}
                </td>
                
                {/* 2. Tên Đối tượng khám (DTO) */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {app.providerName}
                </td>

                {/* 3. Ngày giờ (DTO) */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {app.ngay} - {app.khungGio}
                </td>

                {/* Mới: Cột Ghi chú (DTO) */}
                <td className="px-6 py-4 text-sm text-gray-500 ">
                  {app.ghiChu || '--'}
                </td>
                
                {/* 4. Trạng thái (DTO) */}
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.trangThai === 'Đã xác nhận' ? 'bg-green-100 text-green-800' 
                    : app.trangThai === 'Đã hủy' ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.trangThai}
                  </span>
                </td>

                {/* 5. Hành động (DTO) */}
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                 { (app.trangThai === 'Đang chờ' || app.trangThai === 'Đã thanh toán') && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(app.maLichHen, 'Đã xác nhận')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Xác nhận
                      </button>
                      <button
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