import React, { useState, useEffect } from "react";

import {
  getHospitalAppointments,
  updateHospitalAppointmentStatus,
} from "../../api/HospitalWorkspaceService";

// ======================= MODAL XÁC NHẬN =======================
const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
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

// ======================= PHÂN TRANG =======================
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);
  const baseStyle =
    "px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150";
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

// ======================= COMPONENT CHÍNH =======================
const HospitalAppointmentManagementPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const hospitalUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (hospitalUserId) {
      fetchAppointments(currentPage);
    } else {
      setError("Không thể xác định ID Bệnh viện. Vui lòng đăng nhập lại.");
      setLoading(false);
    }
  }, [currentPage, hospitalUserId]);

  const fetchAppointments = async (page) => {
    if (!hospitalUserId) {
      setError("Không thể xác định ID Bệnh viện.");
      return;
    }

    try {
      setLoading(true);
      const response = await getHospitalAppointments(hospitalUserId, page, 10);

      setAppointments(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách lịch hẹn.");
      console.error("Lỗi fetchAppointments (Hospital):", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    const actionText = newStatus === "Đã xác nhận" ? "XÁC NHẬN" : "HỦY";

    setModalInfo({
      isOpen: true,
      title: `Xác nhận ${actionText} Lịch Hẹn`,
      message: `Bạn có chắc muốn ${actionText} lịch hẹn này?`,
      onConfirm: () => executeUpdate(id, newStatus),
    });
  };

  const executeUpdate = async (id, newStatus) => {
    try {
      await updateHospitalAppointmentStatus(id, newStatus);
      fetchAppointments(currentPage);
    } catch (err) {
      setError("Lỗi khi cập nhật: " + (err.response?.data?.message || err.message));
      console.error("Lỗi executeUpdate (Hospital):", err);
    } finally {
      setModalInfo({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
      });
    }
  };

  const handleCancelModal = () => {
    setModalInfo({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: null,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Đang tải danh sách...</div>;
  if (error)
    return <div className="text-red-600 p-4 bg-red-50 rounded-md">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <ConfirmationModal
        isOpen={modalInfo.isOpen}
        title={modalInfo.title}
        message={modalInfo.message}
        onConfirm={modalInfo.onConfirm}
        onCancel={handleCancelModal}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Quản lý Lịch hẹn (Bệnh viện)
        </h2>
      </div>

      {appointments.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          Không có lịch hẹn nào.
        </p>
      )}

      {appointments.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Bệnh nhân
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ngày giờ hẹn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ghi chú
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((app) => (
                  <tr key={app.maLichHen}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {app.patientName || "(Không rõ)"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {app.ngay} - {app.khungGio}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {app.ghiChu || "--"}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.trangThai === "Đã xác nhận"
                            ? "bg-green-100 text-green-800"
                            : app.trangThai === "Đã hủy"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {app.trangThai}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      {(app.trangThai === "Đang chờ" ||
                        app.trangThai === "Đã thanh toán") && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(app.maLichHen, "Đã xác nhận")
                            }
                            className="text-green-600 hover:text-green-900"
                          >
                            Xác nhận
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateStatus(app.maLichHen, "Đã hủy")
                            }
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

export default HospitalAppointmentManagementPage;
