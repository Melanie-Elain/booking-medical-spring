import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Thư viện multi-select
import { 
    getClinicProfileByUserId, 
    updateClinicProfile 
} from '../../api/ClinicWorkspaceService'; // Import API riêng tư
import { getClinicById } from '../../api/clinicService'; // Import API công khai
import { getAllSpecialties } from '../../api/specialtyService'; // Dùng chung

// --- Component chính: Hồ sơ Phòng khám ---
const ClinicProfileManagement = () => {
    const [profile, setProfile] = useState(null); // Lưu hồ sơ
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        description: '',
        phone: '',
        image: '',
        banner: '',
        imagesIntro: '' // Thêm trường này (ảnh giới thiệu)
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

                // A. Lấy ID thật của phòng khám (bảng phongkham)
                const clinicResponse = await getClinicProfileByUserId(userId);
                const realClinicId = clinicResponse.data.id;
                
                // B. Lấy hồ sơ chi tiết
                const profileData = await getClinicById(realClinicId);
                
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
                    banner: profileData.banner || '',
                    imagesIntro: profileData.imagesIntro || '' // Load ảnh giới thiệu
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

            // Khớp với ClinicRequestDTO
            const updateDTO = {
                ...formData,
                specialtyIds: specialtyIds,
            };
            
            await updateClinicProfile(profile.id, updateDTO);
            alert('Cập nhật hồ sơ phòng khám thành công!');
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
            <h2 className="text-2xl font-bold mb-4">Hồ sơ Phòng khám</h2>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border space-y-4">
                
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tên phòng khám</label>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">URL Ảnh giới thiệu (nếu có)</label>
                    <input
                        type="text"
                        name="imagesIntro"
                        value={formData.imagesIntro}
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

export default ClinicProfileManagement;