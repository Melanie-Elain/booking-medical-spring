import React, { useState, useEffect } from 'react';

import { 
    getDoctorSchedules, 
    getDoctorProfileByUserId 
} from '../../api/DoctorWorkspaceService'; // <-- Đã sửa
import { 
    createDoctorSchedule, 
    deleteScheduleSlot,     
    updateScheduleSlot      
} from '../../api/DoctorScheduleService';

// Import icons
import { Calendar, Clock,  Trash2, Edit2, X, ChevronDown,  } from 'lucide-react';

// === HÀM HELPER: TẠO KHUNG GIỜ ===
// (Tạo danh sách các khung giờ, ví dụ 30 phút một)
const generateTimeSlots = (startStr, endStr, interval) => {
    const slots = [];
    let [startHour, startMinute] = startStr.split(':').map(Number);
    const [endHour, endMinute] = endStr.split(':').map(Number);

    const totalEndMinutes = endHour * 60 + endMinute;
    let totalCurrentMinutes = startHour * 60 + startMinute;

    while (totalCurrentMinutes < totalEndMinutes) {
        let nextTotalMinutes = totalCurrentMinutes + interval;

        let currentHour = Math.floor(totalCurrentMinutes / 60).toString().padStart(2, '0');
        let currentMinute = (totalCurrentMinutes % 60).toString().padStart(2, '0');
        
        let nextHour = Math.floor(nextTotalMinutes / 60).toString().padStart(2, '0');
        let nextMinute = (nextTotalMinutes % 60).toString().padStart(2, '0');

        // Điều kiện dừng nếu vượt quá giờ kết thúc
        if (nextTotalMinutes > totalEndMinutes) break;

        slots.push(`${currentHour}:${currentMinute} - ${nextHour}:${nextMinute}`);
        totalCurrentMinutes = nextTotalMinutes;
    }
    return slots;
};

// *** TẠO DANH SÁCH GIỜ CỐ ĐỊNH (TỪ 7:00 ĐẾN 17:00) ***
const ALL_TIME_SLOTS = generateTimeSlots('07:00', '17:00', 30);
// (Bạn có thể đổi '17:00' thành '21:00' và 30 thành 15 nếu muốn)

// --- COMPONENT CON: Form Thêm Lịch ---
// const AddScheduleForm = ({ doctorId, onScheduleAdded }) => {
//     const [date, setDate] = useState('');
//     const [timeSlots, setTimeSlots] = useState(['08:00 - 08:30']);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const addSlot = () => {
//         setTimeSlots([...timeSlots, '']);
//     };

//     const handleSlotChange = (index, value) => {
//         const newSlots = [...timeSlots];
//         newSlots[index] = value;
//         setTimeSlots(newSlots);
//     };

//     const removeSlot = (index) => {
//         const newSlots = timeSlots.filter((_, i) => i !== index);
//         setTimeSlots(newSlots);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setIsLoading(true);

//         const validTimeSlots = timeSlots.filter(slot => slot.trim() !== '');

//         if (!date || validTimeSlots.length === 0) {
//             setError('Vui lòng chọn ngày và nhập ít nhất một khung giờ.');
//             setIsLoading(false);
//             return;
//         }

//         const scheduleDTO = {
//             date: date, // "YYYY-MM-DD"
//             timeSlots: validTimeSlots
//         };

//         try {
//             // Gọi API (Đã khớp): api.post(`/doctors/${doctorId}/schedules`, ...);
//             await createDoctorSchedule(doctorId, scheduleDTO);
//             alert('Thêm lịch làm việc thành công!');
//             setDate('');
//             setTimeSlots(['08:00 - 08:30']);
//             onScheduleAdded(); // Báo cho component cha biết để tải lại danh sách
//         } catch (err) {
//             setError(err.response?.data?.message || err.response?.data || 'Lỗi khi thêm lịch làm việc.');
//         } finally {
//             setIsLoading(false);
//         }
//     };
const AddScheduleForm = ({ doctorId, onScheduleAdded }) => {
    const [date, setDate] = useState('');
    // State mới: Dùng Set để lưu các slot đã chọn (hiệu quả hơn)
    const [selectedSlots, setSelectedSlots] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // State mới: Để mở/đóng "dropdown"
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // State mới: Để lọc/tìm kiếm
    const [searchTerm, setSearchTerm] = useState('');

    // Hàm xử lý khi tick/bỏ tick 1 checkbox
    const handleSlotToggle = (slot) => {
        const newSet = new Set(selectedSlots); // Sao chép Set cũ
        if (newSet.has(slot)) {
            newSet.delete(slot); // Bỏ chọn
        } else {
            newSet.add(slot); // Thêm chọn
        }
        setSelectedSlots(newSet);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Chuyển Set thành mảng để gửi đi
        const timeSlotsArray = Array.from(selectedSlots);

        if (!date || timeSlotsArray.length === 0) {
            setError('Vui lòng chọn ngày và chọn ít nhất một khung giờ.');
            setIsLoading(false);
            return;
        }

        const scheduleDTO = {
            date: date, // "YYYY-MM-DD"
            timeSlots: timeSlotsArray
        };

        try {
            await createDoctorSchedule(doctorId, scheduleDTO);
            alert('Thêm lịch làm việc thành công!');
            // Reset form
            setDate('');
            setSelectedSlots(new Set());
            setIsDropdownOpen(false);
            setSearchTerm('');
            onScheduleAdded(); // Báo cho cha để tải lại
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || 'Lỗi khi thêm lịch làm việc.');
        } finally {
            setIsLoading(false);
        }
    };

    // Lọc danh sách giờ dựa trên tìm kiếm
    const filteredTimeSlots = ALL_TIME_SLOTS.filter(slot => 
        slot.includes(searchTerm)
    );

//     return (
//         <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border mb-8">
//             <h3 className="text-lg font-semibold mb-4">Thêm Lịch làm việc mới</h3>
//             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-date">
//                     Chọn ngày
//                 </label>
//                 <input
//                     type="date"
//                     id="schedule-date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     min={new Date().toISOString().split('T')[0]} // Ngày nhỏ nhất là hôm nay
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Các khung giờ (ví dụ: 08:00 - 08:30)
//                 </label>
//                 {timeSlots.map((slot, index) => (
//                     <div key={index} className="flex items-center mb-2">
//                         <input
//                             type="text"
//                             value={slot}
//                             onChange={(e) => handleSlotChange(index, e.target.value)}
//                             className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//                             placeholder="HH:mm - HH:mm"
//                             required
//                         />
//                         <button type="button" onClick={() => removeSlot(index)} className="ml-2 p-2 text-red-500 hover:text-red-700">
//                             <Trash2 size={18} />
//                         </button>
//                     </div>
//                 ))}
//                 <button type="button" onClick={addSlot} className="mt-2 flex items-center px-3 py-1 border border-dashed border-gray-400 text-gray-600 rounded-md hover:bg-gray-50">
//                     <Plus size={16} className="mr-1" /> Thêm khung giờ
//                 </button>
//             </div>

//             <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300">
//                 {isLoading ? 'Đang lưu...' : 'Lưu Lịch làm việc'}
//             </button>
//         </form>
//     );
// };

return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border mb-8">
            <h3 className="text-lg font-semibold mb-4">Thêm Lịch làm việc mới</h3>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-date">
                    Chọn ngày
                </label>
                <input
                    type="date"
                    id="schedule-date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chọn các khung giờ
                </label>
                {/* Nút bấm để mở/đóng dropdown */}
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left"
                >
                    <span className={selectedSlots.size === 0 ? 'text-gray-500' : ''}>
                        {selectedSlots.size === 0 
                            ? 'Nhấp để chọn khung giờ' 
                            : `Đã chọn ${selectedSlots.size} khung giờ`}
                    </span>
                    <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Danh sách Checkbox (dropdown) */}
                {isDropdownOpen && (
                    <div className="mt-2 border border-gray-300 rounded-md shadow-lg bg-white">
                        {/* Thanh tìm kiếm */}
                        <div className="p-2 border-b">
                            <input
                                type="text"
                                placeholder="Tìm giờ (ví dụ: 08:00)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md"
                            />
                        </div>
                        
                        {/* Danh sách cuộn */}
                        <div className="max-h-60 overflow-y-auto p-2 grid grid-cols-2 gap-2">
                            {filteredTimeSlots.map((slot) => (
                                <label 
                                    key={slot} 
                                    className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedSlots.has(slot)}
                                        onChange={() => handleSlotToggle(slot)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{slot}</span>
                                </label>
                            ))}
                            {filteredTimeSlots.length === 0 && (
                                <p className="text-gray-500 text-sm p-2 col-span-2">Không tìm thấy khung giờ.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300">
                {isLoading ? 'Đang lưu...' : `Lưu ${selectedSlots.size} khung giờ`}
            </button>
        </form>
    );
};

// --- COMPONENT CON: Modal Xóa (Không đổi) ---
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onCancel}><X size={20} /></button>
                </div>
                <p className="text-sm text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                    >
                        Xác nhận Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENT CON: Hiển thị Lịch đã có (Không đổi) ---
const ViewSchedules = ({ doctorId, refreshKey, onSlotChange }) => {
    const [schedules, setSchedules] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, slotId: null });

    useEffect(() => {
        const fetchSchedules = async () => {
            if (!doctorId) return;
            setIsLoading(true);
            setError(null);
            try {
                const response = await getDoctorSchedules(doctorId);
                setSchedules(response);
            } catch (err) {
                setError('Lỗi khi tải lịch làm việc.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSchedules();
    }, [doctorId, refreshKey]); 

    const openDeleteModal = (slotId) => {
        setModal({ isOpen: true, slotId: slotId });
    };

    const closeDeleteModal = () => {
        setModal({ isOpen: false, slotId: null });
    };

    const handleConfirmDelete = async () => {
        if (!modal.slotId) return;
        try {
            // Gọi API (Đã khớp): api.delete(`/doctors/schedules/${slotId}`)
            await deleteScheduleSlot(modal.slotId);
            closeDeleteModal();
            onSlotChange(); // Báo cho cha để tải lại
        } catch (err) {
            alert(err.response?.data?.message || err.response?.data || 'Lỗi khi xóa khung giờ.');
            closeDeleteModal();
        }
    };

    const handleEditSlot = async (slotId, oldTime) => {
        const newTime = prompt('Nhập khung giờ mới:', oldTime);
        if (newTime && newTime !== oldTime) {
            try {
                // Gọi API (Đã khớp): api.put(`/doctors/schedules/${slotId}`, ...)
                await updateScheduleSlot(slotId, newTime);
                onSlotChange(); // Báo cho cha để tải lại
            } catch (err) {
                alert(err.response?.data?.message || err.response?.data || 'Lỗi khi sửa khung giờ.');
            }
        }
    };

    if (isLoading) return <p>Đang tải lịch làm việc...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const scheduleKeys = Object.keys(schedules || {});
    if (scheduleKeys.length === 0) {
        return <p className="text-gray-500">Chưa có lịch làm việc nào (chỉ hiển thị các khung giờ còn trống).</p>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border">
            <ConfirmationModal
                isOpen={modal.isOpen}
                title="Xác nhận Xóa"
                message="Bạn có chắc muốn xóa khung giờ này? (Không thể xóa nếu đã có người đặt)."
                onConfirm={handleConfirmDelete}
                onCancel={closeDeleteModal}
            />
            
            <h3 className="text-lg font-semibold mb-4">Lịch làm việc còn trống</h3>
            <div className="space-y-6">
                {scheduleKeys.map(dateKey => (
                    <div key={dateKey}>
                        <h4 className="flex items-center text-md font-semibold text-gray-800 mb-3 pb-2 border-b">
                            <Calendar size={18} className="mr-2 text-blue-600" />
                            {dateKey}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {schedules[dateKey].map(slot => (
                                <div 
                                    key={slot.id} 
                                    className="group flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full relative"
                                >
                                    <Clock size={14} className="mr-1.5" />
                                    {slot.time}
                                    
                                    <div className="absolute -top-6 right-0 flex opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            title="Sửa" 
                                            onClick={() => handleEditSlot(slot.id, slot.time)}
                                            className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                                        >
                                            <Edit2 size={14} className="text-gray-600" />
                                        </button>
                                        <button 
                                            title="Xóa"
                                            onClick={() => openDeleteModal(slot.id)}
                                            className="p-1 bg-white rounded-full shadow hover:bg-gray-100 ml-1"
                                        >
                                            <Trash2 size={14} className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- COMPONENT CHÍNH: (Không đổi) ---
const ScheduleManagement = () => {
    const [realDoctorId, setRealDoctorId] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0); 

    useEffect(() => {
        const getDoctorProfile = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('Không tìm thấy user ID. Vui lòng đăng nhập lại.');
                setLoading(false);
                return;
            }
            try {
                const response = await getDoctorProfileByUserId(userId);
                setRealDoctorId(response.data.id); 
            } catch (err) {
                setError('Không thể tải thông tin bác sĩ. (API /doctors/user/{userId} thất bại)');
            } finally {
                setLoading(false);
            }
        };
        getDoctorProfile();
    }, []);

    const handleSlotChange = () => {
        setRefreshKey(prevKey => prevKey + 1); 
    };

    if (loading) return <div>Đang tải thông tin bác sĩ...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;
    if (!realDoctorId) return <div className="text-red-500 p-4">Không thể xác định ID bác sĩ.</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Quản lý Lịch làm việc</h2>
            
            <AddScheduleForm 
                doctorId={realDoctorId} 
                onScheduleAdded={handleSlotChange}
            />
            
            <ViewSchedules 
                doctorId={realDoctorId} 
                refreshKey={refreshKey}
                onSlotChange={handleSlotChange}
            />
        </div>
    );
};

export default ScheduleManagement;