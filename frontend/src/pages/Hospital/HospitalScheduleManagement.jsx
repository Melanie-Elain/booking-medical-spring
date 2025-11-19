import React, { useState, useEffect } from 'react';

// === API IMPORTS ===
import { getHospitalSchedules } from '../../api/hospitalService';
import { getHospitalProfileByUserId } from '../../api/HospitalWorkspaceService';
import { 
    createHospitalSchedule,
    deleteScheduleSlot,
    updateScheduleSlot 
} from '../../api/HospitalScheduleService';

// Icons
import { Calendar, Clock, Trash2, Edit2 } from 'lucide-react';

// === CA LÀM VIỆC CỐ ĐỊNH ===
const HOSPITAL_TIME_SLOTS = [
    "07:00 - 11:30", // Sáng
    "13:00 - 16:30"  // Chiều
];


/* ============================================================
   FORM THÊM LỊCH
============================================================ */
const AddScheduleForm = ({ hospitalId, onScheduleAdded }) => {
    const [date, setDate] = useState('');
    const [selectedSlots, setSelectedSlots] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleSlot = (slot) => {
        const newSet = new Set(selectedSlots);
        newSet.has(slot) ? newSet.delete(slot) : newSet.add(slot);
        setSelectedSlots(newSet);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const slots = Array.from(selectedSlots);

        if (!date || slots.length === 0) {
            setError("Vui lòng chọn ngày và ít nhất một ca.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            await createHospitalSchedule(hospitalId, {
                date,
                timeSlots: slots
            });

            alert("Thêm lịch thành công!");

            setDate('');
            setSelectedSlots(new Set());
            onScheduleAdded();

        } catch (err) {
            setError(err.response?.data?.message || "Lỗi khi thêm lịch.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border mb-8">
            <h3 className="text-lg font-semibold mb-4">Thêm Lịch làm việc</h3>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Chọn ngày</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>

            {/* CA LÀM VIỆC */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Chọn các ca</label>

                <div className="grid grid-cols-2 gap-4">
                    {HOSPITAL_TIME_SLOTS.map(slot => (
                        <label
                            key={slot}
                            className={`flex items-center p-3 border rounded-md cursor-pointer ${
                                selectedSlots.has(slot) ? "border-blue-600 bg-blue-50" : "border-gray-300"
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedSlots.has(slot)}
                                onChange={() => toggleSlot(slot)}
                                className="h-4 w-4"
                            />
                            <span className="ml-3 text-sm font-medium">
                                {slot.includes("07:00") ? "Ca Sáng" : "Ca Chiều"}
                                <span className="block text-xs text-gray-500">{slot}</span>
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300"
            >
                {isLoading ? "Đang lưu..." : `Lưu ${selectedSlots.size} ca`}
            </button>
        </form>
    );
};


/* ============================================================
   MODAL XÁC NHẬN
============================================================ */
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{message}</p>

                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-md">
                        Hủy
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};


/* ============================================================
   HIỂN THỊ LỊCH ĐÃ TẠO
============================================================ */
const ViewSchedules = ({ hospitalId, refreshKey, onSlotChange }) => {
    const [schedules, setSchedules] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, slotId: null });

    useEffect(() => {
        const loadSchedules = async () => {
            if (!hospitalId) return;

            setIsLoading(true);
            setError(null);

            try {
                const data = await getHospitalSchedules(hospitalId);
                setSchedules(data);
            } catch {
                setError("Lỗi khi tải lịch.");
            } finally {
                setIsLoading(false);
            }
        };

        loadSchedules();
    }, [hospitalId, refreshKey]);

    const openDelete = (slotId) => setModal({ isOpen: true, slotId });
    const closeDelete = () => setModal({ isOpen: false, slotId: null });

    const confirmDelete = async () => {
        try {
            await deleteScheduleSlot(modal.slotId);
            closeDelete();
            onSlotChange();
        } catch (err) {
            alert(err.response?.data?.message || "Lỗi khi xóa.");
        }
    };

    const toggleSlotTime = async (slotId, oldTime) => {
        const newTime =
            oldTime.includes("07:00") ? HOSPITAL_TIME_SLOTS[1] : HOSPITAL_TIME_SLOTS[0];

        if (!window.confirm(`Đổi từ ${oldTime} → ${newTime}?`)) return;

        try {
            await updateScheduleSlot(slotId, newTime);
            onSlotChange();
        } catch {
            alert("Lỗi khi cập nhật.");
        }
    };

    if (isLoading) return <p>Đang tải lịch...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const days = Object.keys(schedules);
    if (days.length === 0) return <p>Chưa có lịch làm việc.</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border">
            <ConfirmationModal
                isOpen={modal.isOpen}
                title="Xác nhận xóa"
                message="Bạn có chắc muốn xóa ca này?"
                onConfirm={confirmDelete}
                onCancel={closeDelete}
            />

            <h3 className="text-lg font-semibold mb-4">Lịch đã tạo</h3>

            <div className="space-y-6">
                {days.map(date => (
                    <div key={date}>
                        <h4 className="flex items-center text-md font-semibold border-b pb-2 mb-3">
                            <Calendar size={18} className="mr-2 text-blue-600" /> {date}
                        </h4>

                        <div className="flex flex-wrap gap-2">
                            {schedules[date].map(slot => (
                                <div
                                    key={slot.id}
                                    className="group flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full relative"
                                >
                                    <Clock size={14} className="mr-1.5" />
                                    {slot.time.includes("07:00") ? "Ca Sáng" : "Ca Chiều"} ({slot.time})

                                    {/* ACTION BUTTONS */}
                                    <div className="absolute -top-6 right-0 flex opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            title="Đổi ca"
                                            onClick={() => toggleSlotTime(slot.id, slot.time)}
                                            className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
                                        >
                                            <Edit2 size={14} />
                                        </button>

                                        <button
                                            title="Xóa"
                                            onClick={() => openDelete(slot.id)}
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


/* ============================================================
   MAIN COMPONENT
============================================================ */
const HospitalScheduleManagement = () => {
    const [hospitalId, setHospitalId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const loadProfile = async () => {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                setError("Không tìm thấy user ID.");
                setLoading(false);
                return;
            }

            try {
                const res = await getHospitalProfileByUserId(userId);
                setHospitalId(res.data.id);
            } catch {
                setError("Không thể tải thông tin bệnh viện.");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const refresh = () => setRefreshKey(prev => prev + 1);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    if (!hospitalId)
        return <p className="text-red-500">Không tìm thấy ID bệnh viện.</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Quản lý Lịch làm việc</h2>

            <AddScheduleForm 
                hospitalId={hospitalId}
                onScheduleAdded={refresh}
            />

            <ViewSchedules
                hospitalId={hospitalId}
                refreshKey={refreshKey}
                onSlotChange={refresh}
            />
        </div>
    );
};

export default HospitalScheduleManagement;
