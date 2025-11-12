import React, { useState, useEffect } from 'react';
import { 
  getAllDoctors, createDoctor, updateDoctor, deleteDoctor,
  getAllSpecialtiesList // <-- SỬA LẠI: Gọi hàm /all
} from '../../api/adminService'; 
import Select from 'react-select'; 

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

// === COMPONENT CON: MODAL FORM (Form Thêm/Sửa Bác sĩ) ===
const DoctorFormModal = ({ doctor, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    phoneNumber: doctor?.user?.phoneNumber || '',
    password: '',
    name: doctor?.name || '',
    email: doctor?.user?.email || '', // THÊM EMAIL
    specialty: doctor?.specialty || '', 
    address: doctor?.address || '',
    workplace: doctor?.workplace || '',
    image: doctor?.image || '',
    experienceYear: doctor?.experienceYear || 0,
    description: doctor?.description || '',
    specialtyIds: doctor?.specialties?.map(s => s.id) || [],
  });
  const [error, setError] = useState('');
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const isEditMode = !!doctor;

  // 1. Tải danh sách chuyên khoa khi Modal mở
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        // SỬA LẠI: Gọi hàm /all (không phân trang)
        const response = await getAllSpecialtiesList();
        const options = response.data.map(s => ({ value: s.id, label: s.name }));
        setSpecialtyOptions(options);
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
    const ids = selectedOptions.map(option => option.value);
    setFormData(prev => ({ ...prev, specialtyIds: ids }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.phoneNumber) {
      setError('Số điện thoại là bắt buộc');
      return;
    }
    if (!isEditMode && !formData.password) {
      setError('Mật khẩu là bắt buộc khi tạo mới');
      return;
    }
    try {
      await onSave(formData, doctor?.id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Đã xảy ra lỗi');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {isEditMode ? 'Cập nhật Bác sĩ' : 'Thêm Bác sĩ Mới'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Thông tin đăng nhập */}
          <InputRow label="Số điện thoại (Đăng nhập)" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required disabled={isEditMode} />
          {!isEditMode && (
              <InputRow label="Mật khẩu (Tạo mới)" name="password" value={formData.password} onChange={handleChange} type="password" required />
          )}
          <InputRow label="Email (Đăng nhập)" name="email" value={formData.email} onChange={handleChange} type="email" />
          
          {/* Thông tin hồ sơ */}
          <InputRow label="Tên Bác sĩ (Hồ sơ)" name="name" value={formData.name} onChange={handleChange} required />
          <InputRow label="Chuyên môn (Text)" name="specialty" value={formData.specialty} onChange={handleChange} />
          <InputRow label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} />
          <InputRow label="Nơi công tác" name="workplace" value={formData.workplace} onChange={handleChange} />
          <InputRow label="Link Ảnh (URL)" name="image" value={formData.image} onChange={handleChange} />
          <InputRow label="Số năm kinh nghiệm" name="experienceYear" value={formData.experienceYear} onChange={handleChange} type="number" />
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Liên kết Chuyên khoa (Specialties)</label>
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
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              {isEditMode ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component con cho Input
const InputRow = ({ label, name, value, onChange, type = "text", disabled = false, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type} id={name} name={name} value={value}
      onChange={onChange} disabled={disabled} required={required}
      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm ${disabled ? 'bg-gray-100' : ''}`}
    />
  </div>
);


// === COMPONENT CHA: TRANG QUẢN LÝ (ĐÃ SỬA PHÂN TRANG) ===
const DoctorManagementPage = () => {
  const [doctors, setDoctors] = useState([]); // Sẽ chứa mảng [content]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State Phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage]); // Tải lại khi 'currentPage' thay đổi

  const fetchDoctors = async (page) => {
    try {
      setLoading(true);
      // Gọi API với page và size (10)
      const response = await getAllDoctors(page, 10);
      
      // Lấy 'content' từ object 'Page'
      setDoctors(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);

    } catch (err) {
      setError('Không thể tải danh sách bác sĩ.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn XÓA bác sĩ này (bao gồm cả tài khoản user)?')) {
      try {
        await deleteDoctor(id);
        fetchDoctors(currentPage); // Tải lại trang hiện tại
      } catch (err) {
        alert('Lỗi khi xóa: ' + (err.response?.data || err.message));
      }
    }
  };

  const handleSave = async (formData, id) => {
    if (id) {
      // Sửa: Logic cập nhật Doctor cần gửi ID, không phải formData
      // (Backend DoctorService của bạn chưa có logic cập nhật User,
      // nên chúng ta chỉ gửi thông tin Doctor)
      await updateDoctor(id, formData);
    } else {
      await createDoctor(formData);
    }
    fetchDoctors(currentPage); // Tải lại trang hiện tại
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Đang tải danh sách...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý Bác sĩ</h2>
        <button
          onClick={() => { setEditingDoctor(null); setIsModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Thêm Bác sĩ
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên Bác sĩ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SĐT (Login)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chuyên môn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nơi công tác</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{doc.user?.phoneNumber || '(Chưa liên kết)'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{doc.specialty}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{doc.workplace}</td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <button
                    onClick={() => { setEditingDoctor(doc); setIsModalOpen(true); }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
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
        <DoctorFormModal
          doctor={editingDoctor}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default DoctorManagementPage;