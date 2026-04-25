import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllStudents } from "../../../services/oprations/auth";
import { banUnbanStudent, deleteStudent } from "../../../services/oprations/teacher";
import ConfirmationModal from "../../common/ConfirmationModal";


const StudentsList = () => {
    const { token } = useSelector((state) => state.auth);

    const [modalData, setModalData] = useState(null);

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await getAllStudents(token);
            setStudents(res || []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // ================= BAN / UNBAN =================
    const handleBan = async (studentId) => {
        try {
            await banUnbanStudent(token, studentId);
        } catch (error) {
            console.error("Ban action failed:", error);
        }
    };

    // ================= DELETE =================
    const handleDelete = async (studentId) => {
        try {

            const formData = {
                "students": studentId
            }
            await deleteStudent(token, formData)
            setStudents((prev) => prev.filter((s) => s._id !== studentId));
        } catch (error) {
            console.error("Delete action failed:", error);
        }
    };


    const closeModal = () => setModalData(null);


    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">

            <h1 className="text-2xl font-semibold mb-6">
                Students
                <span className="ml-2 text-sm text-gray-400 font-normal">
                    ({students.length} total)
                </span>
            </h1>

            {/* ================= LOADING ================= */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                        <div key={i} className="bg-gray-800 rounded-2xl p-5 animate-pulse flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0"></div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="h-4 w-28 bg-gray-700 rounded"></div>
                                    <div className="h-3 w-36 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                            <div className="h-5 w-16 bg-gray-700 rounded-full"></div>
                            <div className="flex gap-2">
                                <div className="h-9 flex-1 bg-gray-700 rounded-lg"></div>
                                <div className="h-9 flex-1 bg-gray-700 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>

            ) : students.length === 0 ? (

                /* ================= EMPTY ================= */
                <div className="text-center py-20 text-gray-400">
                    No students found
                </div>

            ) : (

                /* ================= CARDS ================= */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {students.map((student, index) => (
                        <div
                            key={student._id}
                            className={`bg-gray-800 rounded-2xl p-5 flex flex-col gap-4 shadow-lg border transition ${student.status === "active"
                                ? "border-red-500/50"
                                : "border-gray-700"
                                }`}
                        >
                            {/* ---- Avatar + Info ---- */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-lg font-bold uppercase flex-shrink-0">
                                    {student?.name?.charAt(0) || "S"}
                                </div>

                                <div className="flex flex-col overflow-hidden flex-1">
                                    <span className="capitalize font-medium text-sm truncate">
                                        {student?.name}
                                    </span>
                                    <span className="text-xs text-gray-400 truncate">
                                        {student?.email}
                                    </span>
                                </div>

                                <span className="text-xs text-gray-600 flex-shrink-0">
                                    #{index + 1}
                                </span>
                            </div>

                            {/* ---- Role + Banned Badge ---- */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-3 py-1 text-xs bg-blue-600 rounded-full">
                                    {student?.accountType || "Student"}
                                </span>

                                {student.status === "banned" && (
                                    <span className="px-3 py-1 text-xs bg-red-600/20 text-red-400 border border-red-500/30 rounded-full">
                                        Banned
                                    </span>
                                )}
                            </div>

                            {/* ---- Action Buttons ---- */}
                            <div className="flex gap-2 mt-auto">
                                <button
                                    // onClick={() => handleBan(student._id, student.isBanned)}
                                    onClick={() =>
                                        setModalData({
                                            type: "warning",
                                            title: student.isBanned ? "Unban Student?" : "Ban Student?",
                                            message: student.isBanned
                                                ? `${student.name} will be able to log in again after unbanning.`
                                                : `${student.name} will not be able to log in after being banned.`,
                                            confirmText: student.isBanned ? "Yes, Unban" : "Yes, Ban",
                                            cancelText: "Cancel",
                                            onConfirm: () => handleBan(student._id),
                                            onClose: closeModal,
                                        })
                                    }
                                    className={`flex-1 cursor-pointer py-2 text-xs rounded-lg font-medium transition ${student.isBanned
                                        ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                                        : "bg-orange-500 hover:bg-orange-400 text-white"
                                        }`}
                                >
                                    {student.isBanned ? "Unban" : "Ban"}
                                </button>

                                <button
                                    // onClick={() => handleDelete(student._id)}
                                    onClick={() =>
                                        setModalData({
                                            type: "danger",
                                            title: "Delete Student?",
                                            message: `${student.name} will be permanently deleted. This action cannot be undone.`,
                                            confirmText: "Yes, Delete",
                                            cancelText: "Cancel",
                                            onConfirm: () => handleDelete(student._id),
                                            onClose: closeModal,
                                        })
                                    }
                                    className="flex-1 py-2 text-xs bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* modal */}
            {modalData && (
                <ConfirmationModal
                    isOpen={!!modalData}
                    onClose={modalData.onClose}
                    onConfirm={modalData.onConfirm}
                    title={modalData.title}
                    message={modalData.message}
                    confirmText={modalData.confirmText}
                    cancelText={modalData.cancelText}
                    type={modalData.type}
                />
            )}
        </div>
    );
};

export default StudentsList;