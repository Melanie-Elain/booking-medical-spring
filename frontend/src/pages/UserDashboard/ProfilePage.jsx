import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';

// Component con để hiển thị 1 hàng thông tin
const InfoRow = ({ label, value }) => (
  <div className="flex">
    <span className="w-1/3 text-gray-500">{label}</span>
    <span className="w-2/3 font-medium text-gray-800">{value || 'Chưa cập nhật'}</span>
  </div>
);

// Component con để sửa 1 hàng thông tin
const EditRow = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex items-center py-1">
    <label htmlFor={name} className="w-1/3 text-gray-500">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);


const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  // === THÊM MỚI: State cho upload avatar ===
  const [isUploading, setIsUploading] = useState(false);
  // ==========================================

  // Hàm gọi API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // === SỬA ĐỔI: Đổi tên API cho đúng với backend (nếu cần) ===
        // Giả sử API lấy thông tin user là /api/users/me
        const response = await axiosInstance.get('/user/me'); 
        setFormData(response.data);
        setOriginalData(response.data); // Lưu data gốc
      } catch (err) {
        setError("Không thể tải hồ sơ");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []); // [] = chạy 1 lần khi tải trang

  // Hàm cập nhật state khi gõ (cho các trường text)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // === THÊM MỚI: Hàm xử lý upload ảnh đại diện ===
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    
    // !!! THAY THẾ BẰNG UPLOAD PRESET CỦA BẠN !!!
    formDataCloud.append('upload_preset', 'medical-booking'); 

    try {
      // 1. Tải ảnh lên Cloudinary
      // !!! THAY THẾ BẰNG CLOUD NAME CỦA BẠN !!!
      const cloudResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dlqpohz0j/image/upload',
        {
          method: 'POST',
          body: formDataCloud,
        }
      );
      
      const cloudData = await cloudResponse.json();
      const imageUrl = cloudData.secure_url;

      if (!imageUrl) {
        throw new Error('Upload lên Cloudinary thất bại');
      }

      // 2. Gọi API backend để lưu URL mới
      await axiosInstance.put('/user/update-avatar', { avatarUrl: imageUrl });

      // 3. Cập nhật state để hiển thị ảnh mới
      setFormData(prev => ({ ...prev, avatarUrl: imageUrl }));
      setOriginalData(prev => ({ ...prev, avatarUrl: imageUrl })); // Cập nhật cả data gốc

      alert('Cập nhật ảnh đại diện thành công!');

    } catch (err) {
      console.error(err);
      alert('Tải ảnh lên thất bại. Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };
  // ==============================================

  // Hàm nhấn "Hủy" (chỉ hủy các trường text)
  const handleCancel = () => {
    setFormData(originalData); // Quay về data gốc
    setIsEditing(false);
  };

  // Hàm nhấn "Lưu" (chỉ lưu các trường text)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // === SỬA ĐỔI: Đổi tên API cho đúng với backend ===
      // API này map với hàm updateProfile trong UserService
      const updateRequest = {
        fullName: formData.fullName,
        dob: formData.dob,
        idCard: formData.idCard,
        gender: formData.gender,
        email: formData.email,
        ethnicity: formData.ethnicity,
        healthInsurance: formData.healthInsurance,
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        address: formData.address,
        occupation: formData.occupation,
      };

      const response = await axiosInstance.put('/user/profile', updateRequest);
      
      // response.data trả về là User đã cập nhật (từ hàm updateProfile)
      setFormData(response.data); 
      setOriginalData(response.data); 
      setIsEditing(false); // Quay về chế độ xem
      alert('Cập nhật hồ sơ thành công!');

    } catch (err) {
      alert('Cập nhật thất bại. Vui lòng thử lại.');
    }
  };

  // Xử lý loading
  if (loading) return <div>Đang tải hồ sơ...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  // Lấy 2 chữ cái đầu (Avatar)
  const avatarText = formData.fullName ? formData.fullName.substring(0, 2).toUpperCase() : 'US';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Hồ sơ</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cột 1: Danh sách hồ sơ */}
            <div className="lg:col-span-1 border-r border-gray-200 pr-4">
              <input 
                type="text" 
                placeholder="Tìm nhanh hồ sơ" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
                  
                  {/* === SỬA ĐỔI: HIỂN THỊ AVATAR THẬT === */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg relative">
                    {formData.avatarUrl ? (
                      <img 
                        src={formData.avatarUrl || null}
                        alt="Avatar" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-full h-full bg-blue-500 text-white font-bold rounded-full flex items-center justify-center">
                        {avatarText}
                      </span>
                    )}

                    {/* === THÊM MỚI: NÚT UPLOAD ẢNH === */}
                    {isEditing && (
                      <label 
                        htmlFor="avatarUpload" 
                        className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-900 border-2 border-white"
                        title="Đổi ảnh đại diện"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
                        </svg>
                        <input 
                          type="file" 
                          id="avatarUpload"
                          accept="image/png, image/jpeg"
                          className="hidden"
                          onChange={handleFileChange}
                          disabled={isUploading} // Vô hiệu hóa khi đang upload
                        />
                      </label>
                    )}
                  </div>
                  {/* =================================== */}

                  <div>
                    <div className="font-semibold text-blue-700">{formData.fullName}</div>
                    <div className="text-sm text-gray-600">{formData.dob}</div>
                    {/* THÊM MỚI: Hiển thị trạng thái Upload */}
                    {isUploading && <div className="text-sm text-blue-500 font-medium">Đang tải ảnh lên...</div>}
                  </div>
                </div>
                {/* Nút này tạm thời chưa cần logic */}
                <button type="button" className="w-full py-2 px-4 border-2 border-dashed border-blue-400 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                  Thêm hồ sơ
                </button>
              </div>
            </div>

            {/* Cột 2: Chi tiết hồ sơ */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Xem hồ sơ</h3>
                <span className="text-sm text-gray-500">Mã BN: {formData.id}</span>
              </div>
              <div className="bg-orange-50 border border-orange-200 text-orange-700 text-sm p-3 rounded-lg mb-6">
                Hoàn thiện thông tin để đặt khám và quản lý hồ sơ y tế được tốt hơn.
              </div>

              {/* === PHẦN THÔNG TIN ĐỘNG === */}
              <h4 className="text-md font-semibold text-gray-800 mb-4">Thông tin cơ bản</h4>
              <div className="space-y-3 text-sm">
                {isEditing ? (
                  <>
                    <EditRow label="Họ và tên" name="fullName" value={formData.fullName} onChange={handleChange} />
                    {/* SĐT không cho sửa */}
                    <InfoRow label="Điện thoại" value={formData.phoneNumber} /> 
                    <EditRow label="Ngày sinh" name="dob" value={formData.dob} onChange={handleChange} type="date" />
                    {/* (Bạn có thể dùng <select> cho Giới tính) */}
                    <EditRow label="Giới tính" name="gender" value={formData.gender} onChange={handleChange} />
                    <EditRow label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <InfoRow label="Họ và tên" value={formData.fullName} />
                    <InfoRow label="Điện thoại" value={formData.phoneNumber} />
                    <InfoRow label="Ngày sinh" value={formData.dob} />
                    <InfoRow label="Giới tính" value={formData.gender} />
                    <InfoRow label="Địa chỉ" value={formData.address} />
                  </>
                )}
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              <h4 className="text-md font-semibold text-gray-800 mb-4">Thông tin bổ sung</h4>
              <div className="space-y-3 text-sm">
                {isEditing ? (
                  <>
                    <EditRow label="Mã BHYT" name="healthInsurance" value={formData.healthInsurance} onChange={handleChange} />
                    <EditRow label="Số CMND/CCCD" name="idCard" value={formData.idCard} onChange={handleChange} />
                    <EditRow label="Dân tộc" name="ethnicity" value={formData.ethnicity} onChange={handleChange} />
                    <EditRow label="Nghề nghiệp" name="occupation" value={formData.occupation} onChange={handleChange} />
                    <EditRow label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
                  </>
                ) : (
                  <>
                    <InfoRow label="Mã BHYT" value={formData.healthInsurance} />
                    <InfoRow label="Số CMND/CCCD" value={formData.idCard} />
                    <InfoRow label="Dân tộc" value={formData.ethnicity} />
                    <InfoRow label="Nghề nghiệp" value={formData.occupation} />
                    <InfoRow label="Email" value={formData.email} />
                  </>
                )}
              </div>

              {/* === NÚT BẤM ĐỘNG === */}
              <div className="flex justify-end gap-4 mt-8">
                {isEditing ? (
                  <>
                    <button 
                      type="button" 
                      onClick={handleCancel}
                      className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
                      disabled={isUploading} // Vô hiệu hóa khi đang upload
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                      disabled={isUploading} // Vô hiệu hóa khi đang upload
                    >
                      Lưu thay đổi
                    </button>
                  </>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Thay đổi thông tin
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;