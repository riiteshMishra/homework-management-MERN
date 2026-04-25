import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiAlertTriangle, FiInfo } from "react-icons/fi";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger",
}) => {

    const typeStyles = {
        danger: {
            icon: <FiTrash2 />,
            confirmBtn: "bg-red-600 hover:bg-red-500",
            iconBg: "bg-red-500/10 border border-red-500/20",
        },
        warning: {
            icon: <FiAlertTriangle />,
            confirmBtn: "bg-yellow-500 hover:bg-yellow-400 text-black",
            iconBg: "bg-yellow-500/10 border border-yellow-500/20",
        },
        info: {
            icon: <FiInfo />,
            confirmBtn: "bg-blue-600 hover:bg-blue-500",
            iconBg: "bg-blue-500/10 border border-blue-500/20",
        },
    };

    const style = typeStyles[type] || typeStyles.danger;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 30 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    >
                        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5">

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto ${style.iconBg}`}>
                                {style.icon}
                            </div>

                            {/* Text */}
                            <div className="text-center flex flex-col gap-1">
                                <h2 className="text-white text-lg font-semibold">
                                    {title}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {message}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-1">
                                <button
                                    onClick={onClose}
                                    className=" cursor-pointer flex-1 py-2.5 text-sm rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition"
                                >
                                    {cancelText}
                                </button>

                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className={`flex-1 cursor-pointer py-2.5 text-sm rounded-xl text-white font-medium transition ${style.confirmBtn}`}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;