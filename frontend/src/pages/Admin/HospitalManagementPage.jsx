import React, { useState, useEffect } from 'react';
import { 
  getAllHospitals, createHospital, updateHospital, deleteHospital,
  getAllSpecialtiesList // Gọi hàm /all
} from '../../api/adminService'; 
import Select from 'react-select'; // Dùng chung thư viện

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


// === COMPONENT CON: MODAL FORM (Form Thêm/Sửa Bệnh viện) ===
const HospitalFormModal = ({ hospital, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: hospital?.name || '',
    slogan: hospital?.slogan || '',
    address: hospital?.address || '',
    phone: hospital?.phone || '',
    image: hospital?.image || '',
    banner: hospital?.banner || '',
    description: hospital?.description || '',
    specialtyIds: hospital?.specialties?.map(s => s.id) || [],
  });
  const [error, setError] = useState('');
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const isEditMode = !!hospital;

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await getAllSpecialtiesList(); 
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
    try {
      await onSave(formData, hospital?.id);
      onClose();
    } catch (err) {
      setError(err.response?.data || 'Đã xảy ra lỗi');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">{isEditMode ? 'Cập nhật Bệnh viện' : 'Thêm Bệnh viện Mới'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputRow label="Tên Bệnh viện" name="name" value={formData.name} onChange={handleChange} required />
          <InputRow label="Slogan" name="slogan" value={formData.slogan} onChange={handleChange} />
          <InputRow label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} />
          <InputRow label="Điện thoại" name="phone" value={formData.phone} onChange={handleChange} />
          <InputRow label="Link Ảnh (Logo)" name="image" value={formData.image} onChange={handleChange} />
          <InputRow label="Link Ảnh (Banner)" name="banner" value={formData.banner} onChange={handleChange} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
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
      type={type} id={name} name={name} value={value || ''}
      onChange={onChange} required={required}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
    />
  </div>
);


// === COMPONENT CHA: TRANG QUẢN LÝ ===
const HospitalManagementPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State Phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);

  useEffect(() => {
    fetchHospitals(currentPage);
  }, [currentPage]); // Tải lại khi 'currentPage' thay đổi

  const fetchHospitals = async (page) => {
    try {
      setLoading(true);
      const response = await getAllHospitals(page, 10);
      
      setHospitals(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);

    } catch (err) {
      setError('Không thể tải danh sách bệnh viện.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bệnh viện này?')) {
      try {
        await deleteHospital(id);
        fetchHospitals(currentPage); // Tải lại trang hiện tại
      } catch (err) {
        alert('Lỗi khi xóa: ' + (err.response?.data || err.message));
      }
    }
  };

  const handleSave = async (formData, id) => {
    if (id) {
      await updateHospital(id, formData);
    } else {
      await createHospital(formData);
    }
    fetchHospitals(currentPage); // Tải lại trang hiện tại
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Đang tải danh sách...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Bệnh viện</h2>
        <button
          onClick={() => { setEditingHospital(null); setIsModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Thêm Bệnh viện
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên Bệnh viện</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Địa chỉ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Điện thoại</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hospitals.map((hospital) => (
              <tr key={hospital.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{hospital.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{hospital.address}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{hospital.phone}</td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button
                    onClick={() => { setEditingHospital(hospital); setIsModalOpen(true); }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(hospital.id)}
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

      {/* Thêm bộ điều khiển trang */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {isModalOpen && (
        <HospitalFormModal
          hospital={editingHospital}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default HospitalManagementPage;