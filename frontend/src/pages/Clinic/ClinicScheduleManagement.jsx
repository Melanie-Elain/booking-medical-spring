import React, { useState, useEffect } from 'react';

// === 1. IMPORT API ===
import { 
    getClinicSchedules 
} from '../../api/clinicService'; // Import hàm lấy lịch (công khai)

import { 
    getClinicProfileByUserId 
} from '../../api/ClinicWorkspaceService'; // Import hàm lấy ID phòng khám

import { 
    createClinicSchedule, 
    deleteScheduleSlot,     
    updateScheduleSlot      
} from '../../api/ClinicScheduleService'; // Import các hàm thao tác lịch

// Import icons
import { Calendar, Clock, Trash2, Edit2, X, ChevronDown } from 'lucide-react';

// === HÀM HELPER: TẠO KHUNG GIỜ (30 phút/slot) ===
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

        if (nextTotalMinutes > totalEndMinutes) break;

        slots.push(`${currentHour}:${currentMinute} - ${nextHour}:${nextMinute}`);
        totalCurrentMinutes = nextTotalMinutes;
    }
    return slots;
};

// Tạo danh sách giờ từ 07:00 đến 20:00 (Phù hợp với phòng khám)
const ALL_TIME_SLOTS = generateTimeSlots('07:00', '20:00', 30);


// --- COMPONENT CON: Form Thêm Lịch ---
const AddScheduleForm = ({ clinicId, onScheduleAdded }) => {
    const [date, setDate] = useState('');
    const [selectedSlots, setSelectedSlots] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // State cho Dropdown & Search
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSlotToggle = (slot) => {
        const newSet = new Set(selectedSlots);
        if (newSet.has(slot)) {
            newSet.delete(slot);
        } else {
            newSet.add(slot);
        }
        setSelectedSlots(newSet);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const timeSlotsArray = Array.from(selectedSlots);

        if (!date || timeSlotsArray.length === 0) {
            setError('Vui lòng chọn ngày và chọn ít nhất một khung giờ.');
            setIsLoading(false);
            return;
        }

        const scheduleDTO = {
            date: date,
            timeSlots: timeSlotsArray
        };

        try {
            await createClinicSchedule(clinicId, scheduleDTO);
            alert('Thêm lịch làm việc thành công!');
            setDate('');
            setSelectedSlots(new Set());
            setIsDropdownOpen(false);
            setSearchTerm('');
            onScheduleAdded();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || 'Lỗi khi thêm lịch làm việc.');
        } finally {
            setIsLoading(false);
        }
    };

    // Lọc danh sách giờ
    const filteredTimeSlots = ALL_TIME_SLOTS.filter(slot => 
        slot.includes(searchTerm)
    );

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border mb-8">
            <h3 className="text-lg font-semibold mb-4">Thêm Lịch làm việc mới</h3>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Chọn ngày</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Chọn các khung giờ</label>
                
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

                {isDropdownOpen && (
                    <div className="mt-2 border border-gray-300 rounded-md shadow-lg bg-white">
                        <div className="p-2 border-b">
                            <input
                                type="text"
                                placeholder="Tìm giờ (ví dụ: 08:00)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md"
                            />
                        </div>
                        
                        <div className="max-h-60 overflow-y-auto p-2 grid grid-cols-2 gap-2">
                            {filteredTimeSlots.map((slot) => (
                                <label key={slot} className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
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


// --- COMPONENT CON: Modal Xóa ---
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
                    <button onClick={onCancel} className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300">Hủy bỏ</button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700">Xác nhận Xóa</button>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENT CON: Hiển thị Lịch đã có ---
const ViewSchedules = ({ clinicId, refreshKey, onSlotChange }) => {
    const [schedules, setSchedules] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, slotId: null });

    // === Dán đè đoạn này vào trong ViewSchedules của Clinic ===

useEffect(() => {
    const fetchSchedules = async () => {
        if (!clinicId) return;
        setIsLoading(true);
        try {
            const response = await getClinicSchedules(clinicId);

            console.log("DEBUG API TRẢ VỀ:", response); 
            console.log("DATA THỰC TẾ:", response.data);
            
            // 1. Lấy data gốc (Xử lý vụ response.data)
            const rawData = response.data || response; 

            // 2. Kiểm tra nếu rawData là Mảng (Array) thì phải gom nhóm lại
            if (Array.isArray(rawData)) {
                const grouped = rawData.reduce((acc, item) => {
                    // Giả sử item có trường 'date' hoặc 'scheduleDate'
                    const dateKey = item.date || item.scheduleDate; 
                    if (!acc[dateKey]) acc[dateKey] = [];
                    acc[dateKey].push(item);
                    return acc;
                }, {});
                setSchedules(grouped);
            } else {
                // Nếu đã là Object thì dùng luôn
                setSchedules(rawData);
            }

        } catch (err) {
            console.log(err);
            setError('Lỗi tải lịch');
        } finally {
            setIsLoading(false);
        }
    };
    fetchSchedules();
}, [clinicId, refreshKey]); 

    const openDeleteModal = (slotId) => setModal({ isOpen: true, slotId });
    const closeDeleteModal = () => setModal({ isOpen: false, slotId: null });

    const handleConfirmDelete = async () => {
        if (!modal.slotId) return;
        try {
            await deleteScheduleSlot(modal.slotId);
            closeDeleteModal();
            onSlotChange(); 
        } catch (err) {
            alert(err.response?.data?.message || err.response?.data || 'Lỗi khi xóa khung giờ.');
            closeDeleteModal();
        }
    };

    const handleEditSlot = async (slotId, oldTime) => {
        const newTime = prompt('Nhập khung giờ mới:', oldTime);
        if (newTime && newTime !== oldTime) {
            try {
                await updateScheduleSlot(slotId, newTime);
                onSlotChange(); 
            } catch (err) {
                alert(err.response?.data?.message || err.response?.data || 'Lỗi khi sửa khung giờ.');
            }
        }
    };

    if (isLoading) return <p>Đang tải lịch làm việc...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const scheduleKeys = Object.keys(schedules || {});
    if (scheduleKeys.length === 0) {
        return <p className="text-gray-500">Chưa có lịch làm việc nào.</p>;
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
                            {(schedules[dateKey] || []).map(slot => (
                                <div key={slot.id} className="group flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full relative">
                                    <Clock size={14} className="mr-1.5" />
                                    {slot.time}
                                    <div className="absolute -top-6 right-0 flex opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button title="Sửa" onClick={() => handleEditSlot(slot.id, slot.time)} className="p-1 bg-white rounded-full shadow hover:bg-gray-100">
                                            <Edit2 size={14} className="text-gray-600" />
                                        </button>
                                        <button title="Xóa" onClick={() => openDeleteModal(slot.id)} className="p-1 bg-white rounded-full shadow hover:bg-gray-100 ml-1">
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


// --- COMPONENT CHÍNH ---
const ClinicScheduleManagement = () => {
    const [realClinicId, setRealClinicId] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0); 

    useEffect(() => {
        const getProfile = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('Không tìm thấy user ID. Vui lòng đăng nhập lại.');
                setLoading(false);
                return;
            }
            try {
                const response = await getClinicProfileByUserId(userId);
                setRealClinicId(response.data.id); 
            } catch (err) {
                setError('Không thể tải thông tin phòng khám.');
            } finally {
                setLoading(false);
            }
        };
        getProfile();
    }, []);

    const handleSlotChange = () => {
        setRefreshKey(prevKey => prevKey + 1); 
    };

    if (loading) return <div>Đang tải thông tin...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;
    if (!realClinicId) return <div className="text-red-500 p-4">Không thể xác định ID Phòng khám.</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Quản lý Lịch làm việc (Phòng khám)</h2>
            <AddScheduleForm clinicId={realClinicId} onScheduleAdded={handleSlotChange} />
            <ViewSchedules clinicId={realClinicId} refreshKey={refreshKey} onSlotChange={handleSlotChange} />
        </div>
    );
};

export default ClinicScheduleManagement;