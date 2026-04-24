import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

// icons
import { IoClose } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const ViewModal = ({ viewModal, onClose }) => {
    if (!viewModal) return null;

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

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
                    className="bg-white w-[96%] max-w-lg rounded-2xl shadow-xl p-6 flex flex-col gap-4"
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 50, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Submission Details
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
                        >
                            <IoClose />
                        </button>
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center gap-3 border-b pb-3">
                        <img
                            src={viewModal?.student?.image}
                            alt="student"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {viewModal?.student?.name}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MdOutlineEmail />
                                {viewModal?.student?.email}
                            </div>
                        </div>
                    </div>

                    {/* Answer */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase mb-1">
                            Answer
                        </p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {viewModal?.textAnswer || "No answer"}
                        </p>
                    </div>

                    {/* Link */}
                    {viewModal?.attachedLink && (
                        <div>
                            <p className="text-xs text-gray-400 uppercase mb-1">
                                Attached Link
                            </p>
                            <a
                                href={viewModal.attachedLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-blue-600 text-sm underline break-all"
                            >
                                <FaLink />
                                Open Link
                            </a>
                        </div>
                    )}

                    {/* Marks & Status */}
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div>
                            <p className="text-xs text-gray-400">Marks</p>
                            <p className="text-lg font-semibold text-blue-700">
                                {viewModal?.marks ?? "—"}/100
                            </p>
                        </div>

                        <span className={`text-xs px-3 py-1 rounded-full ${viewModal?.isLate
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                            }`}>
                            {viewModal?.isLate ? "Late" : "On Time"}
                        </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <FiClock />
                        {formatDate(viewModal?.submittedAt)}
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ViewModal;