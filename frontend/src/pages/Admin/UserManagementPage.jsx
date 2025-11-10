import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../api/adminService'; 

// === COMPONENT CON: MODAL FORM (Form Thêm/Sửa) ===
const UserFormModal = ({ user, onClose, onSave }) => {
  // 1. State nội bộ của Form
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    password: '', // Luôn trống, chỉ dùng khi tạo mới
    role: user?.role || 'BENHNHAN',
  });
  const [error, setError] = useState('');

  const isEditMode = !!user; // true nếu 'user' được truyền vào (chế độ Sửa)

  // 2. Hàm xử lý gõ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Hàm xử lý "Lưu"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra mật khẩu nếu là tạo mới
    if (!isEditMode && !formData.password) {
      setError('Mật khẩu là bắt buộc khi tạo mới');
      return;
    }
    
    try {
      // Gọi hàm onSave (được truyền từ cha)
      await onSave(formData, user?.id);
      onClose(); // Đóng modal nếu thành công
    } catch (err) {
      setError(err.response?.data || 'Đã xảy ra lỗi');
    }
  };

  return (
    // Lớp phủ mờ (Backdrop)
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Nội dung Modal */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {isEditMode ? 'Cập nhật Người dùng' : 'Thêm Người dùng Mới'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputRow label="Họ và tên" name="fullName" value={formData.fullName} onChange={handleChange} />
          <InputRow label="Số điện thoại" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} disabled={isEditMode} />
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
            </select>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          {/* Nút bấm */}
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


// === COMPONENT CHA: TRANG QUẢN LÝ ===
const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null: Thêm mới, object: Sửa

  useEffect(() => {
    fetchUsers(); // Gọi hàm tải data
  }, []);

  // Hàm tải danh sách Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
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
        // Tải lại danh sách sau khi xóa
        fetchUsers();
      } catch (err) {
        alert('Lỗi khi xóa người dùng: ' + (err.response?.data || err.message));
      }
    }
  };

  // Hàm mở Modal (Thêm: user=null, Sửa: user=object)
  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Hàm xử lý Lưu (từ Modal)
  const handleSave = async (formData, userId) => {
    // Nếu có userId -> Cập nhật (PUT)
    if (userId) {
      await updateUser(userId, formData);
    } 
    // Nếu không -> Tạo mới (POST)
    else {
      await createUser(formData);
    }
    // Tải lại danh sách
    fetchUsers();
  };

  if (loading) return <div>Đang tải danh sách...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Người dùng</h2>
        <button
          onClick={() => handleOpenModal(null)} // Mở modal ở chế độ "Thêm mới"
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
                    : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                {/* Cột Hành động */}
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button
                    onClick={() => handleOpenModal(user)} // Mở modal ở chế độ "Sửa"
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

      {/* 4. Hiển thị Modal (nếu isModalOpen là true) */}
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