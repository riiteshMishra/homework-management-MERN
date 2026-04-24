import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllStudents } from "../../../services/oprations/auth";

const StudentsList = () => {
    const { token } = useSelector((state) => state.auth);

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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">

            <h1 className="text-2xl font-semibold mb-6">Students</h1>

            <div className="bg-gray-800 rounded-2xl shadow-lg p-4 overflow-x-auto">

                {/* ================= LOADING ================= */}
                {loading ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700 text-gray-400 text-sm">
                                <th className="py-3 px-2">#</th>
                                <th className="py-3 px-2">Student</th>
                                <th className="py-3 px-2">Email</th>
                                <th className="py-3 px-2">Role</th>
                            </tr>
                        </thead>

                        <tbody className="animate-pulse">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    {/* Index */}
                                    <td className="py-3 px-2">
                                        <div className="h-4 w-6 bg-gray-700 rounded"></div>
                                    </td>

                                    {/* Student */}
                                    <td className="py-3 px-2 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                                        <div className="h-4 w-24 bg-gray-700 rounded"></div>
                                    </td>

                                    {/* Email */}
                                    <td className="py-3 px-2">
                                        <div className="h-4 w-40 bg-gray-700 rounded"></div>
                                    </td>

                                    {/* Role */}
                                    <td className="py-3 px-2">
                                        <div className="h-5 w-20 bg-gray-700 rounded-full"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : students.length === 0 ? (

                    /* ================= EMPTY ================= */
                    <div className="text-center py-10 text-gray-400">
                        No students found
                    </div>

                ) : (

                    /* ================= TABLE ================= */
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700 text-gray-400 text-sm">
                                <th className="py-3 px-2">#</th>
                                <th className="py-3 px-2">Student</th>
                                <th className="py-3 px-2">Email</th>
                                <th className="py-3 px-2">Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {students.map((student, index) => (
                                <tr
                                    key={student._id}
                                    className="border-b border-gray-700 hover:bg-gray-700/40 transition"
                                >
                                    <td className="py-3 px-2 text-sm">{index + 1}</td>

                                    {/* Student Info */}
                                    <td className="py-3 px-2 flex items-center gap-3">
                                        <img
                                            src={student?.image}
                                            alt="student"
                                            className="w-10 h-10 rounded-full border border-gray-600"
                                        />
                                        <span className="capitalize">{student?.name}</span>
                                    </td>

                                    {/* Email */}
                                    <td className="py-3 px-2 text-sm text-gray-300">
                                        {student?.email}
                                    </td>

                                    {/* Role */}
                                    <td className="py-3 px-2">
                                        <span className="px-3 py-1 text-xs bg-blue-600 rounded-full">
                                            {student?.accountType || "Student"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                )}
            </div>
        </div>
    );
};

export default StudentsList;