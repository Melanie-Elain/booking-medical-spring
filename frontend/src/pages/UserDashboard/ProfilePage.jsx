

import React, { useState, useEffect } from 'react';
// Sử dụng import thật, không còn mock
import axiosInstance from '../../api/axiosConfig'; 
import axios from 'axios'; // Để gọi API tỉnh thành

// Component con để hiển thị 1 hàng thông tin
const InfoRow = ({ label, value }) => (
  <div className="flex py-1">
    <span className="w-1/3 text-gray-500">{label}</span>
    <span className="w-2/3 font-medium text-gray-800">{value || 'Chưa cập nhật'}</span>
  </div>
);

// Component con để sửa 1 hàng thông tin (Input)
const EditRow = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div className="flex items-center py-1">
    <label htmlFor={name} className="w-1/3 text-gray-500">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

// Component con để sửa 1 hàng thông tin (Select/Dropdown)
const EditSelectRow = ({ label, name, value, onChange, children, disabled = false }) => (
  <div className="flex items-center py-1">
    <label htmlFor={name} className="w-1/3 text-gray-500">{label}</label>
    <select
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      disabled={disabled}
      className={`w-2/3 px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'bg-gray-100 border-gray-300' : 'border-gray-300'}`}
    >
      {children}
    </select>
  </div>
);


const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submitError, setSubmitError] = useState(null); // State báo lỗi

  // State và API cho Tỉnh/Huyện/Xã
  const API_BASE_URL = "https://provinces.open-api.vn/api";
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // State cho Dân tộc
  const [ethnicities, setEthnicities] = useState([]);

  // Hàm gọi API lấy hồ sơ
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/me');
        setFormData(response.data);
        setOriginalData(response.data);
      } catch (err) {
        console.error("Lỗi khi tải hồ sơ:", err);
        setError("Không thể tải hồ sơ. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []); 

  // 1. Tải danh sách Tỉnh/Thành phố
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/p/`);
        setProvinces(response.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách tỉnh/thành phố:", err);
      }
    };
    fetchProvinces();
  }, []); 

  // 2. Tải Quận/Huyện
  useEffect(() => {
    if (!formData?.province) {
      setDistricts([]);
      setWards([]);
      return;
    }
    const selectedProvince = provinces.find(p => p.name === formData.province);
    if (selectedProvince) {
      axios.get(`${API_BASE_URL}/p/${selectedProvince.code}?depth=2`)
        .then(res => setDistricts(res.data.districts))
        .catch(err => console.error("Lỗi khi tải danh sách quận/huyện:", err));
    }
  }, [formData?.province, provinces]);

  // 3. Tải Phường/Xã
  useEffect(() => {
    if (!formData?.district) {
      setWards([]);
      return;
    }
    const selectedDistrict = districts.find(d => d.name === formData.district);
    if (selectedDistrict) {
      axios.get(`${API_BASE_URL}/d/${selectedDistrict.code}?depth=2`)
        .then(res => setWards(res.data.wards))
        .catch(err => console.error("Lỗi khi tải danh sách phường/xã:", err));
    }
  }, [formData?.district, districts]);

  // Tải danh sách Dân tộc
  useEffect(() => {
    setEthnicities([
      "Kinh", "Tày", "Thái", "Hoa", "Khmer", "Mường", "Nùng", "H'Mông", "Dao", 
      "Gia Rai", "Ngái", "Ê Đê", "Ba Na", "Sán Dìu", "Chăm", "Sán Chay", 
      "Cơ Ho", "Xơ Đăng", "Bru-Vân Kiều", "Thổ", "Giáy", "Tà Ôi", "Mạ", "Khác"
    ]);
  }, []);

  // Hàm handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newState = { ...prev, [name]: value };

      if (name === "province") {
        newState.district = "";
        newState.ward = "";
      }
      if (name === "district") {
        newState.ward = "";
      }
      return newState;
    });
  };

  // Hàm xử lý upload ảnh đại diện
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', 'medical-booking'); // !!! THAY PRESET CỦA BẠN !!!

    try {
      const cloudResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dlqpohz0j/image/upload', // !!! THAY CLOUD NAME CỦA BẠN !!!
        { method: 'POST', body: formDataCloud }
      );
      
      const cloudData = await cloudResponse.json();
      const imageUrl = cloudData.secure_url;

      if (!imageUrl || cloudData.error) {
        throw new Error(cloudData.error?.message || 'Upload lên Cloudinary thất bại');
      }

      await axiosInstance.put('/user/update-avatar', { avatarUrl: imageUrl });

      setFormData(prev => ({ ...prev, avatarUrl: imageUrl }));
      setOriginalData(prev => ({ ...prev, avatarUrl: imageUrl }));

      alert('Cập nhật ảnh đại diện thành công!');

    } catch (err) {
      console.error("Lỗi khi tải ảnh lên:", err);
      alert(`Tải ảnh lên thất bại: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Hàm nhấn "Hủy"
  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setSubmitError(null); // Xóa lỗi khi hủy
  };

  // === HÀM SUBMIT (ĐÃ CẬP NHẬT THEO LOGIC MỚI CỦA BẠN) ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null); // Xóa lỗi cũ khi submit
    try {
      // 1. Gửi đầy đủ thông tin
      const updateRequest = {
        phoneNumber: formData.phoneNumber, 
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

      // 2. Gọi API
      const response = await axiosInstance.put('/user/profile', updateRequest);

      // 3. === THAY ĐỔI: KIỂM TRA LỖI DO LOGIC TỪ BACKEND ===
      // Backend của bạn trả về { "error": "..." } khi thất bại
      if (response.data.error) {
        setSubmitError(response.data.error); // Hiển thị lỗi này ra giao diện
        return; // Dừng hàm
      }
      // =======================================================

      // 4. Xử lý khi thành công (Backend trả về { user: {...}, token: "..." })
      const updatedUser = response.data.user;
      const newToken = response.data.token;

      if (!updatedUser) {
         throw new Error("Dữ liệu trả về từ máy chủ không hợp lệ.");
      }

      // 5. Cập nhật state
      setFormData(updatedUser);
      setOriginalData(updatedUser);
      setIsEditing(false);

      // 6. Lưu token mới nếu có
      if (newToken) {
        localStorage.setItem('jwtToken', newToken); // (Thay 'authToken' bằng key bạn dùng)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        console.log("Đã cập nhật token mới:", newToken);
        alert('Cập nhật hồ sơ thành công! (Token đã được làm mới)');
      } else {
        alert('Cập nhật hồ sơ thành công!');
      }

    } catch (err) {
      // Catch này bây giờ chỉ bắt lỗi MẠNG hoặc lỗi 500 (Server Error)
      console.error("Lỗi khi cập nhật hồ sơ:", err);
      
      let errorMessage = 'Cập nhật thất bại. Vui lòng thử lại.';
      if (err.response && err.response.data && err.response.data.message) {
         errorMessage = err.response.data.message;
      } else if (err.message) {
         errorMessage = err.message;
      }
      
      setSubmitError(errorMessage); // Hiển thị lỗi mạng/server
    }
  };
  // =======================================================

  if (loading) return <div className="p-6 text-center">Đang tải hồ sơ...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  // Kiểm tra nếu formData chưa kịp tải (trường hợp hiếm)
  if (!formData) return <div className="p-6 text-center">Không có dữ liệu hồ sơ.</div>;

  const avatarText = formData.fullName ? formData.fullName.substring(0, 2).toUpperCase() : 'US';

  // Helper tạo chuỗi địa chỉ đầy đủ
  const getFullAddress = () => {
    if (!formData) return 'Chưa cập nhật';
    const addressParts = [
      formData.address,
      formData.ward,
      formData.district,
      formData.province
    ];
    const fullAddress = addressParts.filter(part => part).join(', ');
    return fullAddress || 'Chưa cập nhật';
  };

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
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg relative">
                    {formData.avatarUrl ? (
                      <img 
                        src={formData.avatarUrl}
                        alt="Avatar" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-full h-full bg-blue-500 text-white font-bold rounded-full flex items-center justify-center">
                        {avatarText}
                      </span>
                    )}
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
                          disabled={isUploading}
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-blue-700">{formData.fullName}</div>
                    <div className="text-sm text-gray-600">{formData.dob}</div>
                    {isUploading && <div className="text-sm text-blue-500 font-medium">Đang tải ảnh lên...</div>}
                  </div>
                </div>
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

              {/* PHẦN THÔNG TIN CƠ BẢN */}
              <h4 className="text-md font-semibold text-gray-800 mb-4">Thông tin cơ bản</h4>
              <div className="space-y-3 text-sm">
                {isEditing ? (
                  <>
                    <EditRow label="Họ và tên" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <EditRow 
                      label="Điện thoại" 
                      name="phoneNumber" 
                      value={formData.phoneNumber} 
                      onChange={handleChange} 
                      type="tel" 
                      placeholder="Nhập số điện thoại"
                    />
                    <EditRow label="Ngày sinh" name="dob" value={formData.dob} onChange={handleChange} type="date" />
                    
                    <EditSelectRow 
                      label="Giới tính"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </EditSelectRow>
                    
                    {/* PHẦN ĐỊA CHỈ */}
                    <EditSelectRow
                      label="Tỉnh/Thành phố"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {provinces.map(p => <option key={p.code} value={p.name}>{p.name}</option>)}
                    </EditSelectRow>

                    <EditSelectRow
                      label="Quận/Huyện"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      disabled={!formData.province || districts.length === 0}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map(d => <option key={d.code} value={d.name}>{d.name}</option>)}
                    </EditSelectRow>

                    <EditSelectRow
                      label="Phường/Xã"
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      disabled={!formData.district || wards.length === 0}
                    >
                      <option value="">Chọn phường/xã</option>
                      {wards.map(w => <option key={w.code} value={w.name}>{w.name}</option>)}
                    </EditSelectRow>

                    <EditRow 
                      label="Địa chỉ cụ thể" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      placeholder="Số nhà, tên đường"
                    />
                  </>
                ) : (
                  <>
                    <InfoRow label="Họ và tên" value={formData.fullName} />
                    <InfoRow label="Điện thoại" value={formData.phoneNumber} />
                    <InfoRow label="Ngày sinh" value={formData.dob} />
                    <InfoRow label="Giới tính" value={formData.gender} />
                    <InfoRow label="Địa chỉ" value={getFullAddress()} />
                  </>
                )}
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              {/* PHẦN THÔNG TIN BỔ SUNG */}
              <h4 className="text-md font-semibold text-gray-800 mb-4">Thông tin bổ sung</h4>
              <div className="space-y-3 text-sm">
                {isEditing ? (
                  <>
                    <EditRow label="Mã BHYT" name="healthInsurance" value={formData.healthInsurance} onChange={handleChange} />
                    <EditRow label="Số CMND/CCCD" name="idCard" value={formData.idCard} onChange={handleChange} />
                    
                    <EditSelectRow
                      label="Dân tộc"
                      name="ethnicity"
                      value={formData.ethnicity}
                      onChange={handleChange}
                    >
                      <option value="">Chọn dân tộc</option>
                      {ethnicities.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </EditSelectRow>

                    <EditSelectRow
                      label="Nghề nghiệp"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                    >
                      <option value="">Chọn nghề nghiệp</option>
                      <option value="Văn phòng">Văn phòng</option>
                      <option value="Học sinh/Sinh viên">Học sinh/Sinh viên</option>
                      <option value="Kinh doanh">Kinh doanh</option>
                      <option value="Khác">Khác</option>
                    </EditSelectRow>

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

              {/* KHUNG HIỂN THỊ LỖI */}
              {submitError && (
                <div className="text-red-600 text-sm font-medium text-right mt-4">
                  {submitError}
                </div>
              )}
              {/* =================================== */}


              {/* Nút Bấm Động */}
              <div className="flex justify-end gap-4 mt-8">
                {isEditing ? (
                  <>
                    <button 
                      type="button" 
                      onClick={handleCancel}
                      className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
                      disabled={isUploading}
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                      disabled={isUploading}
                    >
                      Lưu thay đổi
                    </button>
                  </>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsEditing(true);
                      setSubmitError(null); // Xóa lỗi khi nhấn sửa
                    }}
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
