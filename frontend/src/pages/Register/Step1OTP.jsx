import React, { useState } from "react";

const Step1OTP = ({ onVerify, phone }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();

    if (otp.trim().length !== 6 || isNaN(otp)) {
      alert("Vui lòng nhập mã OTP gồm 6 chữ số!");
      return;
    }

    setLoading(true);
    try {
      onVerify(otp); // Gọi callback xác thực OTP
    } catch (error) {
      console.error(error);
      alert("Xác thực OTP thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = () => {
    alert("Đã gửi lại mã OTP đến " + phone);
    // Ở đây bạn có thể gọi lại API gửi OTP nếu dùng Firebase
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Xác nhận mã OTP
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Mã xác nhận đã được gửi đến{" "}
          <span className="font-semibold text-gray-700">{phone}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nhập mã OTP
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Nhập mã gồm 6 chữ số"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-lg tracking-widest focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-xl font-semibold text-lg transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Đang xác thực..." : "Xác nhận"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Chưa nhận được mã?{" "}
            <button
              type="button"
              onClick={resendOTP}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Gửi lại
            </button>
          </p>
        </form>

        {/* Recaptcha container bắt buộc khi dùng Firebase */}
        <div id="recaptcha-container" className="mt-4"></div>
      </div>
    </div>
  );
};

export default Step1OTP;
