import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Thư viện multi-select
import { 
    getHospitalProfileByUserId, 
    updateHospitalProfile 
} from '../../api/HospitalWorkspaceService'; 
import { getHospitalById } from '../../api/hospitalService'; // File mới
import { getAllSpecialties } from '../../api/specialtyService'; // Dùng chung

// --- Component chính: Hồ sơ Bệnh viện ---
const HospitalProfileManagement = () => {
    const [profile, setProfile] = useState(null); // Lưu hồ sơ
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        description: '',
        phone: '',
        image: '',
        banner: ''
    });
    const [allSpecialties, setAllSpecialties] = useState([]); 
    const [selectedSpecialties, setSelectedSpecialties] = useState([]); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm helper chuyển đổi format cho react-select
    const toSelectFormat = (specialty) => ({
        value: specialty.id,
        label: specialty.name
    });

    // 1. Tải dữ liệu
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('Không thể xác thực người dùng.');
                }

                // A. Lấy ID thật của bệnh viện (bảng benhvien)
                const hospitalResponse = await getHospitalProfileByUserId(userId);
                const realHospitalId = hospitalResponse.data.id;
                
                // B. Lấy hồ sơ chi tiết (backend đã sửa để tải kèm specialties)
                const profileData = await getHospitalById(realHospitalId);
                
                // C. Lấy TẤT CẢ chuyên khoa
                const specialtiesResponse = await getAllSpecialties();
                
                // Cập nhật State
                setProfile(profileData);
                setFormData({
                    name: profileData.name || '',
                    address: profileData.address || '',
                    description: profileData.description || '',
                    phone: profileData.phone || '',
                    image: profileData.image || '',
                    banner: profileData.banner || ''
                });
                
                const currentSpecs = profileData.specialties || [];
                setSelectedSpecialties(currentSpecs.map(toSelectFormat));
                
                setAllSpecialties(specialtiesResponse.map(toSelectFormat));

            } catch (err) {
                console.error("Lỗi tải hồ sơ:", err);
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
            const specialtyIds = selectedSpecialties.map(s => s.value);

            // Khớp với HospitalRequestDTO
            const updateDTO = {
                ...formData,
                specialtyIds: specialtyIds,
            };
            
            await updateHospitalProfile(profile.id, updateDTO);
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
            <h2 className="text-2xl font-bold mb-4">Hồ sơ Bệnh viện</h2>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border space-y-4">
                
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tên bệnh viện</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Chuyên khoa</label>
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
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
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
                    <label className="block text-sm font-medium text-gray-700">URL Logo/Ảnh đại diện</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">URL Ảnh bìa (Banner)</label>
                    <input
                        type="text"
                        name="banner"
                        value={formData.banner}
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

export default HospitalProfileManagement;