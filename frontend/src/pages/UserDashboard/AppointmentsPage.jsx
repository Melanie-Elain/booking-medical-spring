import React, { useState, useEffect, useCallback } from 'react'; // 1. Thêm useCallback
import { FaFileInvoice } from 'react-icons/fa';
import { getMyAppointments } from '../../api/adminService'; 

// (Component PaginationControls giữ nguyên, không cần sửa)
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  // ... (Code của bạn đã đúng)
};

// === HÀM HELPER: Debounce (để không gọi API liên tục) ===
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};


// === COMPONENT CHA: TRANG LỊCH KHÁM CÁ NHÂN ===
const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 2. STATE MỚI CHO TÌM KIẾM
  const [searchTerm, setSearchTerm] = useState('');
  // 3. STATE "DEBOUNCED" (Trì hoãn)
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Trì hoãn 500ms

  // 4. SỬA HÀM FETCH (dùng useCallback)
  const fetchAppointments = useCallback(async (page, keyword) => {
    try {
      setLoading(true);
      setError(null);
      // 5. Gửi keyword lên API
      const response = await getMyAppointments(page, 10, keyword); 
      setAppointments(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);
    } catch (err) {
      setError('Không thể tải lịch khám của bạn.');
    } finally {
      setLoading(false);
    }
  }, []); // useCallback

  // 6. SỬA useEffect (để gọi lại khi search hoặc page thay đổi)
  useEffect(() => {
    // Gửi từ khóa đã trì hoãn (debounced)
    fetchAppointments(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm, fetchAppointments]); // Thêm debouncedSearchTerm

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 7. HÀM MỚI cho input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset về trang 1 khi gõ tìm kiếm
  };

  // 8. Hàm Render nội dung (Giữ nguyên, chỉ dọn dẹp ký tự lỗi)
  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-16">Đang tải...</div>;
    }
    if (error) {
      return <div className="text-center py-16 text-red-600">{error}</div>;
    }
    if (appointments.length === 0) {
      return (
        <div className="text-center py-16">
          <FaFileInvoice size={60} className="mx-auto text-gray-300" />
          <p className="mt-4 text-gray-500">
            {/* Sửa lại thông báo khi tìm kiếm không ra kết quả */}
            {debouncedSearchTerm 
              ? `Không tìm thấy kết quả cho "${debouncedSearchTerm}"`
              : "Lịch khám của bạn trống !"
            }
          </p>
        </div>
      );
    }

    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đối tượng khám</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày giờ hẹn</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ghi chú</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((app) => (
            <tr key={app.maLichHen}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.providerName}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{app.ngay} - {app.khungGio}</td>
              <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{app.ghiChu || '--'}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  app.trangThai === 'Đã xác nhận' ? 'bg-green-100 text-green-800' 
                  : app.trangThai === 'Đã hủy' ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {app.trangThai}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Lịch khám</h2>
         </div>
      
      {/* 9. KẾT NỐI INPUT VỚI STATE */}
      <input 
        type="text"
         placeholder="Tìm theo tên đối tượng, trạng thái, ghi chú..." 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
        value={searchTerm} // Gán value
        onChange={handleSearchChange} // Gán onChange
      />
       <div className="overflow-x-auto">
        {renderContent()}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};


export default AppointmentsPage;
