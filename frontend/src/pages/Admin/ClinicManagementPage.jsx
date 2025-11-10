import React, { useState, useEffect } from 'react';
import { 
  getAllClinics, createClinic, updateClinic, deleteClinic,
  getAllSpecialties // Cần gọi API này
} from '../../api/adminService'; 
import Select from 'react-select';

// === COMPONENT CON: MODAL FORM (Form Thêm/Sửa Phòng khám) ===
const ClinicFormModal = ({ clinic, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: clinic?.name || '',
    address: clinic?.address || '',
    image: clinic?.image || '',
    description: clinic?.description || '',
    imagesIntro: clinic?.imagesIntro || '[]', // Đây là JSON string
    specialtyIds: clinic?.specialties?.map(s => s.id) || [],
  });
  const [error, setError] = useState('');
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const isEditMode = !!clinic;

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await getAllSpecialties();
        setSpecialtyOptions(response.data.map(s => ({ value: s.id, label: s.name })));
      } catch (err) {
        console.error("Lỗi tải chuyên khoa:", err);
      }
    };
    fetchSpecialties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (selectedOptions) => {
    setFormData(prev => ({ ...prev, specialtyIds: selectedOptions.map(o => o.value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // (Bạn có thể thêm kiểm tra xem imagesIntro có phải JSON hợp lệ không)
    try {
      await onSave(formData, clinic?.id);
      onClose();
    } catch (err) {
      setError(err.response?.data || 'Đã xảy ra lỗi');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">{isEditMode ? 'Cập nhật Phòng khám' : 'Thêm Phòng khám Mới'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputRow label="Tên Phòng khám" name="name" value={formData.name} onChange={handleChange} required />
          <InputRow label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} />
          <InputRow label="Link Ảnh (Logo)" name="image" value={formData.image} onChange={handleChange} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ảnh Giới thiệu (JSON String)</label>
            <textarea name="imagesIntro" value={formData.imagesIntro} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Liên kết Chuyên khoa</label>
            <Select
              isMulti
              options={specialtyOptions}
              value={specialtyOptions.filter(opt => formData.specialtyIds.includes(opt.value))}
              onChange={handleSpecialtyChange}
              className="mt-1 block w-full"
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component con cho Input (Dùng chung)
const InputRow = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type} id={name} name={name} value={value}
      onChange={onChange} required={required}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
    />
  </div>
);


// === COMPONENT CHA: TRANG QUẢN LÝ ===
const ClinicManagementPage = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      setLoading(true);
      const response = await getAllClinics();
      setClinics(response.data);
    } catch (err) {
      setError('Không thể tải danh sách phòng khám.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng khám này?')) {
      try {
        await deleteClinic(id);
        fetchClinics();
      } catch (err) {
        alert('Lỗi khi xóa: ' + (err.response?.data || err.message));
      }
    }
  };

  const handleSave = async (formData, id) => {
    if (id) {
      await updateClinic(id, formData);
    } else {
      await createClinic(formData);
    }
    fetchClinics();
  };

  if (loading) return <div>Đang tải danh sách...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Phòng khám</h2>
        <button
          onClick={() => { setEditingClinic(null); setIsModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Thêm Phòng khám
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* (Tương tự table của Doctor/Specialty, bạn tự điền các cột) */}
        </table>
      </div>

      {isModalOpen && (
        <ClinicFormModal
          clinic={editingClinic}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ClinicManagementPage;