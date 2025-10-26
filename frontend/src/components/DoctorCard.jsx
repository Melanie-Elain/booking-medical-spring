import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 p-4 w-72 h-64 flex flex-col items-center hover:shadow-md">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover mb-3"
      />
      <h3 className="text-lg font-semibold text-center">{doctor.name}</h3>
      <p className="text-sm text-gray-600">{doctor.specialty}</p>
      <p className="text-sm text-gray-500 mb-3">{doctor.hospital}</p>
      <button className="text-blue-600 font-semibold hover:underline">
        Đặt lịch khám →
      </button>
    </div>
  );
};

export default DoctorCard;
