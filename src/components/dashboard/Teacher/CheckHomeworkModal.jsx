import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createResult } from '../../../services/oprations/submission';

import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaLink } from "react-icons/fa";

// 🔥 NEW
import { motion, AnimatePresence } from "framer-motion";

const CheckHomeworkModal = ({ submission, onClose }) => {
    const { token } = useSelector(state => state.auth);

    const [marks, setMarks] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isLate, setIsLate] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleSubmit = async () => {
        if (marks === "") {
            alert("Enter marks");
            return;
        }

        const data = {
            studentId: submission?.student?._id,
            marks,
            feedback,
            isLate
        };

        setLoading(true);
        try {
            const res = await createResult(submission?.homework, data, token);
            console.log("Result created:", res);
            onClose();
        } catch (err) {
            console.log("Error", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white w-[95%] max-w-md rounded-2xl shadow-2xl p-6 flex flex-col gap-4"
                    initial={{ scale: 0.8, y: 40, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 40, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Check Homework
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-purple-600 hover:text-gray-600 text-xl cursor-pointer hover:scale-110"
                        >
                            <IoClose />
                        </button>
                    </div>

                    {/* Student */}
                    <div className="flex items-center gap-3">
                        <img
                            src={submission?.student?.image}
                            className="w-10 h-10 rounded-full"
                            alt=""
                        />
                        <div>
                            <p className="text-sm font-medium">
                                {submission?.student?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {submission?.student?.email}
                            </p>
                        </div>
                    </div>

                    {/* Answer */}
                    <div className="bg-gray-100 border border-gray-200 p-3 rounded-lg text-sm text-gray-700">
                        {submission?.textAnswer}
                    </div>

                    {/* Link */}
                    {submission?.attachedLink && (
                        <a
                            href={submission.attachedLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-blue-600 text-sm underline"
                        >
                            <FaLink /> Open Submission Link
                        </a>
                    )}

                    {/* Marks */}
                    <input
                        type="number"
                        placeholder="Enter marks"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Feedback */}
                    <textarea
                        rows={3}
                        placeholder="Write feedback..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Late */}
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={isLate}
                            onChange={() => setIsLate(!isLate)}
                            className="accent-blue-600"
                        />
                        <span className='text-blue-600 font-semibold'>
                            Mark as Late
                        </span>
                    </label>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
                    >
                        <FaCheckCircle />
                        {loading ? "Saving..." : "Save Result"}
                    </button>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CheckHomeworkModal;