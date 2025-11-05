import React, { useState } from "react";

const Step2Password = ({ onNext }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) return alert("Mật khẩu phải từ 6 ký tự");
    if (password !== confirm) return alert("Mật khẩu không khớp");
    onNext(password); // chuyển sang step 3
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          Tạo mật khẩu
        </h2>
        <p className="text-gray-600 mb-6">
          Hãy tạo mật khẩu mới để bảo mật tài khoản của bạn.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Tiếp tục
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step2Password;
