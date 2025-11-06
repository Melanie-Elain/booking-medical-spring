

import React, { useState } from "react";
import axios from 'axios';

// === PHẦN DÀNH CHO CÁC COMPONENT CON (để code chính gọn gàng) ===

// Component InputField (ô nhập liệu)
const InputField = ({ label, name, value, onChange, type = "text", placeholder, required, readOnly }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || `Nhập ${label.toLowerCase()}`}
      required={required}
      readOnly={readOnly}
      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${readOnly ? 'bg-gray-100' : 'border-gray-300'}`}
    />
  </div>
);

// Component SelectField (ô chọn dropdown)
const SelectField = ({ label, name, value, onChange, required, children }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {children}
    </select>
  </div>
);

// ================================================================
// === COMPONENT CHÍNH: Step3Info ===
// ================================================================
const Step3Info = ({ fullName, phone, password }) => {
  // Nhận props từ RegisterPage (như đã setup ở bước trước)
  
  const [formData, setFormData] = useState({
    // Cột 1
    fullName: fullName || "", // Lấy từ prop
    phone: phone || "",     // Lấy từ prop
    dob: "",
    idCard: "",
    gender: "Nam", // Giá trị mặc định
    email: "",
    ethnicity: "Kinh", // Dân tộc
    
    // Cột 2
    healthInsurance: "",
    province: "", // Tỉnh/Thành phố
    district: "", // Quận/Huyện
    ward: "",     // Phường/Xã
    address: "",
    referralCode: "",
    occupation: "", // Nghề nghiệp
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  const handleSubmit = async (e) => { // Chuyển hàm thành async
    e.preventDefault(); 
    // Đã xóa đoạn text lỗi ở đây

    // 1. Kiểm tra validation
    if (!formData.fullName || !formData.dob) {
      return alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
    }

    // 2. Gom tất cả dữ liệu lại để gửi đi
    // (Bao gồm dữ liệu từ props và từ state của form này)
    const registrationData = {
      // Dữ liệu từ props (Step 1 & 2)
      fullName: fullName,
      phoneNumber: phone,
      password: password,
      
      // Dữ liệu từ state (Step 3)
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
      referralCode: formData.referralCode,
      occupation: formData.occupation
    };

    console.log("Dữ liệu chuẩn bị gửi đi:", registrationData);

    try {
      // 3. GỌI API BACKEND

      const response = await axios.post('http://localhost:8080/api/auth/register', registrationData);

      // 4. Xử lý khi backend trả về thành công
      if (response.status === 201 || response.status === 200) {
        alert("Đăng ký thành công!");
        // (Chuyển hướng người dùng đến trang đăng nhập/trang chủ ở đây)
      } else {
        // Xử lý các trường hợp thành công nhưng không phải 200/201
        alert("Đăng ký hoàn tất (mã: " + response.status + ")");
      }

    } catch (error) {
      // 5. Xử lý khi backend BÁO LỖI (lỗi 400, 500...)
      console.error('Lỗi khi gọi API đăng ký:', error);
      
      if (error.response) {
        // Lỗi có phản hồi từ server (ví dụ: email đã tồn tại)
        alert(`Đăng ký thất bại: ${error.response.data.message || 'Lỗi từ server'}`);
      } else if (error.request) {
        // Không kết nối được tới server
        alert('Đăng ký thất bại: Không thể kết nối tới máy chủ.');
      } else {
        // Lỗi gì đó ở phía frontend
        alert('Đăng ký thất bại: Lỗi không xác định.');
      }
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-semibold text-blue-600">
          Tạo hồ sơ
        </h2>
      </div>

      {/* 2. Tiêu đề */}
      <h2 className="text-xl font-semibold mb-2">Tạo hồ sơ y tế</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Tạo hồ sơ y tế đầy đủ thông tin sẽ hỗ trợ việc khám chữa bệnh của bạn tốt hơn.
      </p>

      {/* 3. Form nội dung */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          
          {/* === CỘT 1: Thông tin hồ sơ === */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Thông tin hồ sơ</h3>
            
            <InputField label="Họ và tên" name="fullName" value={formData.fullName} onChange={handleChange} required />
            <InputField label="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} readOnly />
            <InputField label="Ngày sinh" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
            <InputField label="Số CMND/CCCD" name="idCard" value={formData.idCard} onChange={handleChange} />

            {/* Giới tính */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
              <div className="flex items-center gap-x-6">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="gender" value="Nam" checked={formData.gender === "Nam"} onChange={handleRadioChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Nam</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="gender" value="Nữ" checked={formData.gender === "Nữ"} onChange={handleRadioChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Nữ</span>
                </label>
              </div>
            </div>

            <InputField label="Địa chỉ email của bạn" name="email" type="email" value={formData.email} onChange={handleChange} />
            
            <SelectField label="Dân tộc" name="ethnicity" value={formData.ethnicity} onChange={handleChange}>
              <option value="Kinh">Kinh</option>
              <option value="Tày">Tày</option>
              <option value="Thái">Thái</option>
              <option value="Mường">Mường</option>
              <option value="Khác">Khác</option>
              {/* Thêm các dân tộc khác vào đây */}
            </SelectField>
          </div>

          {/* === CỘT 2: Thông tin bổ sung === */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Thông tin bổ sung</h3>

            <InputField label="Mã thẻ Bảo hiểm y tế" name="healthInsurance" value={formData.healthInsurance} onChange={handleChange} />
            
            <SelectField label="Tỉnh/Thành phố" name="province" value={formData.province} onChange={handleChange}>
              <option value="">Chọn tỉnh/thành phố</option>
              <option value="TP. HCM">TP. Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              {/* Thêm API hoặc data tỉnh thành vào đây */}
            </SelectField>

            <SelectField label="Quận/Huyện" name="district" value={formData.district} onChange={handleChange}>
              <option value="">Chọn quận/huyện</option>
              {/* Cần load data dựa trên tỉnh/thành phố */}
            </SelectField>

            <SelectField label="Phường/Xã" name="ward" value={formData.ward} onChange={handleChange}>
              <option value="">Chọn phường/xã</option>
              {/* Cần load data dựa trên quận/huyện */}
            </SelectField>

            <InputField label="Địa chỉ cụ thể" name="address" value={formData.address} onChange={handleChange} placeholder="Số nhà, tên đường"/>
            <InputField label="Mã giới thiệu" name="referralCode" value={formData.referralCode} onChange={handleChange} />
            
            <SelectField label="Nghề nghiệp" name="occupation" value={formData.occupation} onChange={handleChange}>
              <option value="">Chọn nghề nghiệp</option>
              <option value="Văn phòng">Văn phòng</option>
              <option value="Học sinh/Sinh viên">Học sinh/Sinh viên</option>
              <option value="Kinh doanh">Kinh doanh</option>
              <option value="Khác">Khác</option>
              {/* Thêm các nghề nghiệp khác */}
            </SelectField>
          </div>
        </div>

        {/* 4. Nút Hoàn tất */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Hoàn tất
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3Info;