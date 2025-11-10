import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../api/adminService'; 

// === COMPONENT MỚI: NÚT ĐIỀU KHIỂN TRANG ===
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Ẩn nếu chỉ có 1 trang

  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

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
          className={`px-3 py-1 rounded-md ${
            currentPage === number 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
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

// === COMPONENT CON: MODAL FORM (Form Thêm/Sửa) ===
const UserFormModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    password: '', // Luôn trống, chỉ dùng khi tạo mới
    role: user?.role || 'BENHNHAN',
  });
  const [error, setError] = useState('');

  const isEditMode = !!user; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // === VALIDATION (Kiểm tra lỗi frontend) ===
    if (!formData.phoneNumber) {
      setError('Số điện thoại là bắt buộc');
      return;
    }
    if (!isEditMode && !formData.password) {
      setError('Mật khẩu là bắt buộc khi tạo mới');
      return;
    }
    
    try {
      await onSave(formData, user?.id);
      onClose(); 
    } catch (err) {
      setError(err.response?.data || 'Đã xảy ra lỗi');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {isEditMode ? 'Cập nhật Người dùng' : 'Thêm Người dùng Mới'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputRow label="Họ và tên" name="fullName" value={formData.fullName} onChange={handleChange} />
          {/* Sửa: Bỏ 'disabled={isEditMode}' để cho phép sửa SĐT (vì backend đã xử lý) */}
          <InputRow label="Số điện thoại" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <InputRow label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
          
          {!isEditMode && (
            <InputRow label="Mật khẩu" name="password" value={formData.password} onChange={handleChange} type="password" />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Vai trò (Role)</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            >
              <option value="BENHNHAN">BENHNHAN</option>
              <option value="BACSI">BACSI</option>
              <option value="ADMIN">ADMIN</option>
              <option value="BENHVIEN">BENHVIEN</option>
              <option value="PHONGKHAM">PHONGKHAM</option>
            </select>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditMode ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component con cho Input (dùng trong Modal)
const InputRow = ({ label, name, value, onChange, type = "text", disabled = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm ${disabled ? 'bg-gray-100' : ''}`}
    />
  </div>
);


// === COMPONENT CHA: TRANG QUẢN LÝ (ĐÃ CẬP NHẬT) ===
const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. STATE MỚI CHO PAGINATION
  const [currentPage, setCurrentPage] = useState(0); // Spring pages là 0-indexed
  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // 2. SỬA LẠI useEffect (chạy khi currentPage thay đổi)
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]); // Tải lại khi 'currentPage' thay đổi

  // 3. SỬA LẠI HÀM FETCH (nhận page)
  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      // Gọi API với page và size (10)
      const response = await getAllUsers(page, 10);
      
      // 4. LẤY DATA TỪ PAGE OBJECT
      setUsers(response.data.content); // Mảng dữ liệu
      setTotalPages(response.data.totalPages); // Tổng số trang
      setCurrentPage(response.data.number); // Trang hiện tại
    } catch (err) {
      setError('Không thể tải danh sách người dùng. Bạn có phải là Admin?');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý Xóa
  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await deleteUser(userId);
        // 5. Tải lại trang hiện tại sau khi Xóa
        fetchUsers(currentPage); 
      } catch (err) {
        alert('Lỗi khi xóa người dùng: ' + (err.response?.data || err.message));
      }
    }
  };

  // Hàm mở Modal
  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Hàm xử lý Lưu
  const handleSave = async (formData, userId) => {
    if (userId) {
      await updateUser(userId, formData);
    } 
    else {
      await createUser(formData);
    }
    // 6. Tải lại trang hiện tại sau khi Lưu
    fetchUsers(currentPage); 
  };

  // 7. HÀM MỚI ĐỂ CHUYỂN TRANG
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Đang tải danh sách...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Người dùng</h2>
        <button
          onClick={() => handleOpenModal(null)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Thêm User
        </button>
      </div>
      
      {/* Bảng hiển thị dữ liệu */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ và tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số điện thoại</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vai trò</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.fullName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.phoneNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email || '--'}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'ADMIN' ? 'bg-red-100 text-red-800' 
                    : user.role === 'BACSI' ? 'bg-blue-100 text-blue-800'
                    : user.role === 'BENHVIEN' ? 'bg-purple-100 text-purple-800'
                    : user.role === 'PHONGKHAM' ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button
                    onClick={() => handleOpenModal(user)} 
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="ml-4 text-red-600 hover:text-red-900"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 8. THÊM BỘ ĐIỀU KHIỂN TRANG */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {isModalOpen && (
        <UserFormModal
          user={editingUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserManagementPage;