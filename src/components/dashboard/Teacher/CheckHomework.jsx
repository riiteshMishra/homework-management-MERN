import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckHomework = () => {
    const { homeworkId } = useParams();
    const { token } = useSelector((state) => state.auth);

    const [homework, setHomework] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomework = async () => {
            setLoading(true);
            try {
                // TODO: replace with API
                const res = await

                    setHomework();
            } finally {
                setLoading(false);
            }
        };

        fetchHomework();
    }, []);

    // ================= LOADING =================
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 p-6 animate-pulse">
                <div className="h-6 w-60 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-40 bg-gray-700 rounded mb-6"></div>

                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="bg-gray-800 p-4 rounded-xl mb-3">
                        <div className="h-4 w-40 bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 w-60 bg-gray-700 rounded"></div>
                    </div>
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
                <p className="text-sm text-gray-400 capitalize">
                    Subject: {homework?.subject}
                </p>
            </div>

            {/* Submissions */}
            {homework?.submissions?.length === 0 ? (
                <div className="text-center text-gray-400">
                    No submissions yet
                </div>
            ) : (
                <div className="space-y-3">

                    {homework?.submissions?.map((sub) => (
                        <div
                            key={sub._id}
                            className="bg-gray-800 rounded-xl p-4 flex items-center justify-between"
                        >
                            {/* Student Info */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={sub.student.image}
                                    alt="student"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">{sub.student.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {sub.student.email}
                                    </p>
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-3">

                                {/* Date */}
                                <span className="text-xs text-gray-400">
                                    {new Date(sub.submittedAt).toLocaleDateString()}
                                </span>

                                {/* View */}
                                <a
                                    href={sub.file}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs px-3 py-1.5 bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    View
                                </a>

                                {/* Check */}
                                <button className="text-xs px-3 py-1.5 bg-green-600 rounded-lg hover:bg-green-700">
                                    Check
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default CheckHomework;