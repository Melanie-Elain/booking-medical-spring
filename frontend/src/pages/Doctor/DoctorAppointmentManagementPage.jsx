import React, { useState, useEffect } from 'react';

// === BƯỚC 1: Đổi service (giả định đường dẫn) ===
import { 
  getDoctorAppointments, 
  updateDoctorAppointmentStatus 
} from '../../api/DoctorWorkspaceService'; // <-- Sửa đường dẫn nếu cần

// === Component Modal (thay thế window.confirm) ===
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Component Phân trang (Không đổi) ---
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);
  const baseStyle = "px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "bg-gray-200 text-gray-700 hover:bg-gray-300";
  const disabledStyle = "bg-gray-100 text-gray-400 cursor-not-allowed";

  return (
    <div className="mt-6 flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`${baseStyle} ${
          currentPage === 0 ? disabledStyle : inactiveStyle
        }`}
      >
        Trước
      </button>
      {pageNumbers.map((pageIndex) => (
        <button
          key={pageIndex}
          onClick={() => onPageChange(pageIndex)}
          className={`${baseStyle} ${
            currentPage === pageIndex ? activeStyle : inactiveStyle
          }`}
        >
          {pageIndex + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`${baseStyle} ${
          currentPage === totalPages - 1 ? disabledStyle : inactiveStyle
        }`}
      >
        Sau
      </button>
    </div>
  );
};

// === COMPONENT CHA: TRANG QUẢN LÝ (Đã sửa cho Bác sĩ) ===
const DoctorAppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // State cho Modal (thay thế confirm)
  const [modalInfo, setModalInfo] = useState({ 
    isOpen: false, 
    title: '', 
    message: '', 
    onConfirm: null 
  });

  // === BƯỚC 2: Lấy ID bác sĩ từ localStorage ===
  // (Giả định bạn lưu ID của user (bác sĩ) khi họ đăng nhập)
  const doctorId = localStorage.getItem('userId'); 

  console.log("ID BÁC SĨ ĐANG GỬI LÊN:", doctorId);

  useEffect(() => {
    // Chỉ fetch khi có doctorId
    if (doctorId) {
      fetchAppointments(currentPage);
    } else {
      setError('Không thể xác định ID bác sĩ. Vui lòng đăng nhập lại.');
      setLoading(false);
    }
  }, [currentPage, doctorId]); // Thêm doctorId vào dependencies

  const fetchAppointments = async (page) => {
    if (!doctorId) {
      setError('Không thể xác định ID bác sĩ.');
      return;
    }
    try {
      setLoading(true);
      // === BƯỚC 3: Gọi API của bác sĩ ===
      const response = await getDoctorAppointments(doctorId, page, 10); 
      setAppointments(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);
      setError(null); // Xóa lỗi cũ nếu thành công
    } catch (err) {
      setError('Không thể tải danh sách lịch hẹn.');
      console.error("Lỗi fetchAppointments:", err);
    } finally {
      setLoading(false);
    }
  };

  // === BƯỚC 4: Sửa hàm update (dùng Modal) ===
  const handleUpdateStatus = (id, newStatus) => {
    const actionText = newStatus === 'Đã xác nhận' ? 'XÁC NHẬN' : 'HỦY';
    
    // Mở Modal thay vì gọi window.confirm
    setModalInfo({
      isOpen: true,
      title: `Xác nhận ${actionText} Lịch Hẹn`,
      message: `Bạn có chắc muốn ${actionText} lịch hẹn này?`,
      // Truyền hàm sẽ thực thi khi bấm "Xác nhận"
      onConfirm: () => executeUpdate(id, newStatus),
    });
  };

  // Hàm này chỉ chạy khi người dùng bấm "Xác nhận" trên Modal
  const executeUpdate = async (id, newStatus) => {
    try {
      // Gọi API update của bác sĩ
      await updateDoctorAppointmentStatus(id, newStatus);
      fetchAppointments(currentPage); // Tải lại danh sách
    } catch (err) {
      setError('Lỗi khi cập nhật: ' + (err.response?.data?.message || err.message));
      console.error("Lỗi executeUpdate:", err);
    } finally {
      // Đóng modal sau khi hoàn tất
      setModalInfo({ isOpen: false, title: '', message: '', onConfirm: null });
    }
  };

  // Hàm để đóng modal khi bấm "Hủy"
  const handleCancelModal = () => {
    setModalInfo({ isOpen: false, title: '', message: '', onConfirm: null });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Đang tải danh sách...</div>;
  
  // Hiển thị lỗi một cách rõ ràng
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-md">{error}</div>;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {/* Thêm Modal vào UI */}
      <ConfirmationModal 
        isOpen={modalInfo.isOpen}
        title={modalInfo.title}
        message={modalInfo.message}
        onConfirm={modalInfo.onConfirm}
        onCancel={handleCancelModal}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Lịch hẹn</h2>
      </div>
      
      {/* Hiển thị nếu không có lịch hẹn */}
      {appointments.length === 0 && (
          <p className="text-center text-gray-500 py-4">Không có lịch hẹn nào.</p>
      )}

      {appointments.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bệnh nhân</th>
                  {/* Đã ẩn cột "Đối tượng khám" */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày giờ hẹn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ghi chú</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                </tr>
              </thead>
              
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((app) => (
                  <tr key={app.maLichHen}> 
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {app.patientName || '(Không rõ)'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {app.ngay} - {app.khungGio}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 ">
                      {app.ghiChu || '--'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.trangThai === 'Đã xác nhận' ? 'bg-green-100 text-green-800' 
                        : app.trangThai === 'Đã hủy' ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.trangThai}
                      </span>
                    </td>
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
        </>
      )}
    </div>
  );
};

export default DoctorAppointmentManagement;