import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getHomeworkById } from "../../../services/oprations/homework";

const statusStyles = {
    published: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-500",
    closed: "bg-red-100 text-red-600",
};

const ViewHomework = () => {
    const { homeworkId } = useParams();
    const { token } = useSelector((state) => state.auth);

    const [homework, setHomework] = useState(null);
    const [loading, setLoading] = useState(true);

    // ================= FETCH =================
    useEffect(() => {
        const fetchHomework = async () => {
            try {
                const res = await getHomeworkById(homeworkId, token);
                setHomework(res);
            } finally {
                setLoading(false);
            }
        };

        fetchHomework();
    }, []);

    // ================= LOADING =================
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 p-6 animate-pulse text-white">
                <div className="h-6 w-60 bg-gray-700 rounded mb-3"></div>
                <div className="h-4 w-40 bg-gray-700 rounded mb-6"></div>

                <div className="h-20 bg-gray-800 rounded-xl mb-4"></div>

                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-800 rounded-xl mb-3"></div>
                ))}
            </div>
        );
    }

    // ================= UI =================
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold capitalize">
                    {homework?.title}
                </h1>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${statusStyles[homework?.status]}`}>
                        {homework?.status}
                    </span>

                    <span className="text-xs bg-gray-800 px-2 py-1 rounded capitalize">
                        {homework?.subject}
                    </span>

                    <span className="text-xs text-gray-400">
                        {homework?.students?.length || 0} assigned
                    </span>

                    <span className="text-xs text-gray-400">
                        • {homework?.submissions?.length || 0} submissions
                    </span>

                    <span className="text-xs text-gray-400">
                        • {new Date(homework?.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-xl p-4 mb-6">
                <h2 className="text-sm text-gray-400 mb-1">Description</h2>
                <p className="text-sm">{homework?.description}</p>
            </div>

            {/* Submissions */}
            <div>
                <h2 className="text-sm text-gray-400 mb-3">
                    Submissions ({homework?.submissions?.length || 0})
                </h2>

                {homework?.submissions?.length === 0 ? (
                    <div className="text-gray-500 text-sm">
                        No submissions yet
                    </div>
                ) : (
                    <div className="space-y-3">
                        {homework?.submissions?.map((sub, i) => (
                            <div
                                key={sub._id || i}
                                className="bg-gray-800 rounded-xl p-4 flex items-center justify-between"
                            >
                                {/* Student */}
                                <div>
                                    <p className="text-sm font-medium">
                                        {sub.students?.name || "Unknown"}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {sub.student?.email}
                                    </p>
                                </div>

                                {/* Right */}
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-400">
                                        {new Date(sub.createdAt).toLocaleDateString()}
                                    </span>

                                    <button className="text-xs px-3 py-1.5 bg-blue-600 rounded-lg hover:bg-blue-700">
                                        View
                                    </button>

                                    <button className="text-xs px-3 py-1.5 bg-green-600 rounded-lg hover:bg-green-700">
                                        Check
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default ViewHomework;