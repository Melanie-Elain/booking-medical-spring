import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';

// Component con để hiển thị 1 hàng thông tin
const InfoRow = ({ label, value }) => (
  <div className="flex">
    <span className="w-1/3 text-gray-500">{label}</span>
    <span className="w-2/3 font-medium text-gray-800">{value}</span>
  </div>
);

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
  // 2. State để chuyển đổi
  const [isEditing, setIsEditing] = useState(false);

  // 3. State để lưu data thật từ API
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 4. State để lưu data gốc (khi nhấn "Hủy")
  const [originalData, setOriginalData] = useState(null);

  // 5. Hàm gọi API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
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

  // 6. Hàm cập nhật state khi gõ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 7. Hàm nhấn "Hủy"
  const handleCancel = () => {
    setFormData(originalData); // Quay về data gốc
    setIsEditing(false);
  };

  // 8. Hàm nhấn "Lưu"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API PUT (chỉ gửi các trường cần thiết, không gửi password/phone)
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
      
      setFormData(response.data); // Cập nhật state với data mới
      setOriginalData(response.data); // Cập nhật data gốc
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
      <form onSubmit={handleSubmit}> {/* Bọc mọi thứ trong <form> */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Hồ sơ</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cột 1: Danh sách hồ sơ (giữ nguyên, vì ta đang sửa chính user) */}
            <div className="lg:col-span-1 border-r border-gray-200 pr-4">
              <input 
                type="text" 
                placeholder="Tìm nhanh hồ sơ" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
                  <span className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center text-lg">
                    {avatarText}
                  </span>
                  <div>
                    <div className="font-semibold text-blue-700">{formData.fullName}</div>
                    <div className="text-sm text-gray-600">{formData.dob}</div>
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
                <span className="text-sm text-gray-500">Mã BN: (Tạm ẩn)</span>
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
                    <EditRow label="Điện thoại" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
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
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
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