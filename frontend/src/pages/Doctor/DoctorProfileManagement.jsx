import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // <-- Thư viện multi-select

import { DoctorService } from '../../api/DoctorService'; // <-- Giữ lại file cũ
import { 
  getDoctorProfileByUserId, 
  updateDoctorProfile 
} from '../../api/DoctorWorkspaceService'; // <-- Thêm file mới
import { getAllSpecialties } from '../../api/specialtyService';

// --- Component chính: Hồ sơ Bác sĩ ---
const DoctorProfileManagement = () => {
    const [profile, setProfile] = useState(null); // Lưu hồ sơ bác sĩ
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        workplace: '',
        experienceYear: 0,
        description: '',
        image: '' // (Trường image bạn có thể dùng input text hoặc file upload)
    });
    const [allSpecialties, setAllSpecialties] = useState([]); // Danh sách tất cả chuyên khoa
    const [selectedSpecialties, setSelectedSpecialties] = useState([]); // Chuyên khoa đã chọn
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm helper để chuyển đổi định dạng cho react-select
    const toSelectFormat = (specialty) => ({
        value: specialty.id,
        label: specialty.name
    });

    // 1. Tải dữ liệu khi component mount
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Lấy userId từ localStorage
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('Không thể xác thực người dùng.');
                }

                // A. Lấy ID thật của bác sĩ (bảng bacsi)
                const doctorResponse = await getDoctorProfileByUserId(userId);
                const realDoctorId = doctorResponse.data.id;
                
                // B. Lấy hồ sơ chi tiết (đã bao gồm các chuyên khoa)
                // (Sử dụng hàm getDoctorById từ object DoctorService)
                const profileData = await DoctorService.getDoctorById(realDoctorId);
                
                // C. Lấy TẤT CẢ chuyên khoa để chọn
                const specialtiesResponse = await getAllSpecialties();
                
                // Cập nhật State
                setProfile(profileData);
                setFormData({
                    name: profileData.name || '',
                    address: profileData.address || '',
                    workplace: profileData.workplace || '',
                    experienceYear: profileData.experienceYear || 0,
                    description: profileData.description || '',
                    image: profileData.image || ''
                });
                
                const currentSpecs = profileData.specialties || []; // Tránh lỗi nếu nó là null
                setSelectedSpecialties(currentSpecs.map(toSelectFormat));
                
                setAllSpecialties(specialtiesResponse.map(toSelectFormat));

            } catch (err) {
                setError('Lỗi khi tải hồ sơ. ' + (err.message || ''));
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // 2. Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Xử lý thay đổi chuyên khoa
    const handleSpecialtyChange = (selectedOptions) => {
        setSelectedSpecialties(selectedOptions || []);
    };

    // 4. Xử lý Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Chuyển đổi chuyên khoa về mảng các ID
            const specialtyIds = selectedSpecialties.map(s => s.value);

            // Tạo DTO để gửi đi
            // Phải khớp với DoctorRequestDTO của backend
            const updateDTO = {
                ...formData,
                specialtyIds: specialtyIds,
                // Bỏ qua trường 'specialty' (text) như bạn yêu cầu
                specialty: profile.specialty 
            };
            
            // Gọi API
            await updateDoctorProfile(profile.id, updateDTO);
            alert('Cập nhật hồ sơ thành công!');
        } catch (err) {
            setError('Lỗi khi cập nhật hồ sơ: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // --- Render ---
    if (loading && !profile) return <div>Đang tải hồ sơ...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;
    if (!profile) return null;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Hồ sơ Bác sĩ</h2>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border space-y-4">
                
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tên hiển thị</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Chuyên khoa (Sử dụng bảng `bacsi_chuyenkhoa`)</label>
                    <Select
                        isMulti
                        options={allSpecialties}
                        value={selectedSpecialties}
                        onChange={handleSpecialtyChange}
                        className="mt-1"
                        placeholder="Chọn chuyên khoa..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nơi công tác</label>
                    <input
                        type="text"
                        name="workplace"
                        value={formData.workplace}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Số năm kinh nghiệm</label>
                    <input
                        type="number"
                        name="experienceYear"
                        value={formData.experienceYear}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả / Giới thiệu</label>
                    <textarea
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">URL Hình ảnh</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
            </form>
        </div>
    );
};

export default DoctorProfileManagement;