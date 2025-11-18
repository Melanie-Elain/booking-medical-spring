import React, { useState, useEffect } from 'react';
import { 
  getClinicAppointments,
  updateClinicAppointmentStatus
} from '../../api/ClinicWorkspaceService';

// ======================= MODAL =======================
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

// =================== PHÂN TRANG ======================
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [...Array(totalPages).keys()];
  const base = "px-3 py-1 rounded-md text-sm font-medium";
  const active = "bg-blue-600 text-white";
  const inactive = "bg-gray-200 text-gray-700 hover:bg-gray-300";
  const disabled = "bg-gray-100 text-gray-400 cursor-not-allowed";

  return (
    <div className="mt-6 flex justify-center items-center gap-2">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`${base} ${currentPage === 0 ? disabled : inactive}`}
      >
        Trước
      </button>

      {pageNumbers.map((i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${base} ${currentPage === i ? active : inactive}`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`${base} ${currentPage === totalPages - 1 ? disabled : inactive}`}
      >
        Sau
      </button>

    </div>
  );
};

// ================== TRANG QUẢN LÝ ====================
const ClinicAppointmentManagementPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const clinicUserId = localStorage.getItem('userId');

  // =================== FETCH APPOINTMENTS ===================
  useEffect(() => {
    if (!clinicUserId) {
      setError('Không thể xác định ID Phòng khám. Vui lòng đăng nhập lại.');
      setLoading(false);
      return;
    }
    fetchAppointments(currentPage);
  }, [currentPage, clinicUserId]);

  const fetchAppointments = async (page) => {
    try {
      setLoading(true);
      const res = await getClinicAppointments(clinicUserId, page, 10);

      setAppointments(res.data.content);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.number);

      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách lịch hẹn.');
    } finally {
      setLoading(false);
    }
  };

  // =================== UPDATE STATUS + MODAL ===================
  const handleUpdateStatus = (id, newStatus) => {
    const actionText = newStatus === 'Đã xác nhận' ? 'XÁC NHẬN' : 'HỦY';

    setModalInfo({
      isOpen: true,
      title: `Xác nhận ${actionText} Lịch Hẹn`,
      message: `Bạn có chắc muốn ${actionText} lịch hẹn này?`,
      onConfirm: () => executeUpdate(id, newStatus),
    });
  };

  const executeUpdate = async (id, newStatus) => {
    try {
      await updateClinicAppointmentStatus(id, newStatus);
      fetchAppointments(currentPage);
    } catch (err) {
      setError('Lỗi khi cập nhật: ' + (err.response?.data?.message || err.message));
    } finally {
      closeModal();
    }
  };

  const closeModal = () => {
    setModalInfo({ isOpen: false, title: '', message: '', onConfirm: null });
  };

  // =================== UI ===================
  if (loading) return <div>Đang tải danh sách...</div>;
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-md">{error}</div>;

  const badgeClass = (status) => {
    switch (status) {
      case 'Đã xác nhận': return "bg-green-100 text-green-800";
      case 'Đã hủy': return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">

      <ConfirmationModal {...modalInfo} onCancel={closeModal} />

      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Quản lý Lịch hẹn (Phòng khám)
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Không có lịch hẹn nào.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">Bệnh nhân</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Ngày giờ hẹn</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Ghi chú</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Hành động</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {appointments.map((a) => (
                  <tr key={a.maLichHen}>
                    <td className="px-6 py-4 text-sm font-medium">{a.patientName || '(Không rõ)'}</td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {a.ngay} - {a.khungGio}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {a.ghiChu || '--'}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${badgeClass(a.trangThai)}`}>
                        {a.trangThai}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {(a.trangThai === 'Đang chờ' || a.trangThai === 'Đã thanh toán') && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(a.maLichHen, 'Đã xác nhận')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Xác nhận
                          </button>

                          <button
                            onClick={() => handleUpdateStatus(a.maLichHen, 'Đã hủy')}
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
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ClinicAppointmentManagementPage;
