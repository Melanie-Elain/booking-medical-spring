import React, { useState, useEffect } from 'react';
import { 
  getAllSpecialties, 
  createSpecialty, 
  updateSpecialty, 
  deleteSpecialty 
} from '../../api/adminService'; // Import API Chuyên khoa

// === COMPONENT CON: MODAL FORM (Form Thêm/Sửa) ===
const SpecialtyFormModal = ({ specialty, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: specialty?.name || '',
    description: specialty?.description || '',
  });
  const [error, setError] = useState('');
  const isEditMode = !!specialty;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name) {
      setError('Tên chuyên khoa là bắt buộc');
      return;
    }
    
    try {
      await onSave(formData, specialty?.id);
      onClose();
    } catch (err) {
      setError(err.response?.data || 'Đã xảy ra lỗi');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {isEditMode ? 'Cập nhật Chuyên khoa' : 'Thêm Chuyên khoa Mới'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên chuyên khoa</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            ></textarea>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              {isEditMode ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// === COMPONENT CHA: TRANG QUẢN LÝ ===
const SpecialtyManagementPage = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState(null);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const response = await getAllSpecialties();
      setSpecialties(response.data);
    } catch (err) {
      setError('Không thể tải danh sách chuyên khoa.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chuyên khoa này?')) {
      try {
        await deleteSpecialty(id);
        fetchSpecialties(); // Tải lại danh sách
      } catch (err) {
        alert('Lỗi khi xóa: ' + (err.response?.data || err.message));
      }
    }
  };

  const handleOpenModal = (specialty = null) => {
    setEditingSpecialty(specialty);
    setIsModalOpen(true);
  };

  const handleSave = async (formData, id) => {
    if (id) {
      await updateSpecialty(id, formData);
    } else {
      await createSpecialty(formData);
    }
    fetchSpecialties(); // Tải lại danh sách
  };

  if (loading) return <div>Đang tải danh sách...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Chuyên khoa</h2>
        <button
          onClick={() => handleOpenModal(null)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Thêm Chuyên khoa
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID (MaCK)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên Chuyên khoa (TenCK)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {specialties.map((spec) => (
              <tr key={spec.id}>
                <td className="px-6 py-4 text-sm text-gray-500">{spec.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{spec.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{spec.description}</td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button
                    onClick={() => handleOpenModal(spec)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(spec.id)}
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

      {isModalOpen && (
        <SpecialtyFormModal
          specialty={editingSpecialty}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SpecialtyManagementPage;