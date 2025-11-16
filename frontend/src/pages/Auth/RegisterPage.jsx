

import React, { useState } from 'react';
import { Eye, EyeOff, User, Phone } from 'lucide-react';
import Header from '../../components/Home/Header';
import HomeFooter from '../../components/Home/HomeFooter';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../api/firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from "firebase/auth";

import Step1OTP from "../Register/Step1OTP";
import Step2Password from "../Register/Step2Password";
import Step3Info from "../Register/Step3Info";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    general: "",
  });
  
const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth, // ✅ phải truyền auth ở đây đầu tiên
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA resolved:", response);
        },
      }
    );
  }
};



  // Xử lý gửi OTP và sang Step1
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!phoneNumber) return alert("Vui lòng nhập số điện thoại");

  //   const formattedPhone = "+84" + phoneNumber.slice(1);
  //   setLoading(true);
  //   setupRecaptcha();
  //   const appVerifier = window.recaptchaVerifier;

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
  //     window.confirmationResult = confirmationResult;
  //     alert("Đã gửi mã OTP đến số " + phoneNumber);
  //     setStep(2);
  //   } catch (err) {
  //     alert("Gửi OTP thất bại: " + err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
   const handlePhoneBlur = async () => {
  if (!phoneNumber) return;

  try {
    const res = await fetch(`http://localhost:8080/api/auth/check-exist?phoneNumber=${phoneNumber}`);
    const data = await res.json();

    if (data.phoneExists) {
      setErrors(prev => ({ ...prev, phoneNumber: "Số điện thoại đã tồn tại" }));
    } else {
      setErrors(prev => ({ ...prev, phoneNumber: "" }));
    }

  } catch (err) {
    console.log("Lỗi check phone:", err);
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({ fullName: "", phoneNumber: "", general: "" });
  if (!phoneNumber) return alert("Vui lòng nhập số điện thoại");

  // Nếu phone đang có lỗi → không cho submit
  if (errors.phoneNumber) {
    return;
  }

  try {
    setLoading(true);
    const formattedPhone = "+84" + phoneNumber.slice(1);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
    window.confirmationResult = confirmationResult;

    alert("Đã gửi mã OTP đến số " + phoneNumber);
    setStep(2);

  } catch (err) {
    console.log(err);
    setErrors(prev => ({ ...prev, general: "Có lỗi xảy ra, vui lòng thử lại" }));
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Bên trái */}
          <div className="flex flex-col items-center text-center space-y-6">
            <img
              src="https://youmed.vn/dat-kham/assets/img/booking/png/Login.png"
              alt="YouMed Register Illustration"
              className="w-96 max-w-full"
            />
            <p className="text-gray-700 text-base leading-relaxed">
              Đặt khám <span className="font-semibold text-indigo-600">DỄ DÀNG HƠN</span> <br />
              trên ứng dụng <span className="text-indigo-600 font-semibold">YouMed</span>
            </p>
          </div>

          {/* Bên phải */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Đăng ký</h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                  Nhập thông tin để nhận mã xác thực
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Họ và tên */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Nhập họ và tên của bạn"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Số điện thoại */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Nhập số điện thoại của bạn"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={handlePhoneBlur}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>

                  {/* Nút đăng ký */}
                  <button
                    type="submit"
                    disabled={loading || !!errors.phoneNumber }
                    className="w-full py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 font-semibold"
                  >
                    {loading ? "Đang gửi mã..." : "Đăng ký"}
                  </button>

                  {/* Đã có tài khoản? */}
                  <p className="mt-6 text-center text-sm text-gray-600">
                    Đã có tài khoản?{" "}
                    <a
                      href="/login"
                      className="font-bold text-indigo-600 hover:text-indigo-500 transition duration-150"
                    >
                      Đăng nhập ngay
                    </a>
                  </p>
                </form>
                <div id="recaptcha-container"></div>
              </>
            )}

            {step === 2 && (
              <Step1OTP
                phone={phoneNumber}
                onVerify={(otp) => {
                  console.log("OTP đã xác thực:", otp);
                  setStep(3); // 
                }}
              />
            )}
        
            {/* === STEP 3: Form tạo mật khẩu === */}
            {step === 3 && ( 
              <Step2Password
                onNext={(newPassword) => { 
                  setPassword(newPassword); 
                  setStep(4); 
                }}
              />
            )}
            
            {/* === STEP 4: Form điền thông tin cuối === */}
            {step === 4 && (
              <Step3Info 
                fullName={fullName} 
                phone={phoneNumber} 
                password={password} 
              />
            )}
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
};

export default RegisterPage;

