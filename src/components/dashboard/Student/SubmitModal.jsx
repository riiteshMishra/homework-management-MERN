import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { submitHomework } from "../../../services/oprations/submission";
import { useSelector } from "react-redux";

const SubmitModal = ({ homeworkId, onClose, onSubmitSuccess }) => {
    const { token } = useSelector((state) => state.auth);

    const [textAnswer, setTextAnswer] = useState("");
    const [attachedLink, setAttachedLink] = useState("");
    const [loading, setLoading] = useState(false);

    //  URL validation
    const isValidLink = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    // ─── Submit ────────────────────────────────────────────────────
    const handleSubmit = async () => {

        if (!textAnswer.trim() && !attachedLink.trim()) {
            toast.error("Please provide answer or link");
            return;
        }
        const payload = {
            homeworkId,
            textAnswer: textAnswer.trim(),
            attachedLink: attachedLink.trim()
        };

        // link validation
        if (attachedLink.trim() && !isValidLink(attachedLink.trim())) {
            toast.error("Please enter a valid URL");
            return;
        }

        setLoading(true);
        const result = await submitHomework(payload, token);
        setLoading(false);

        if (result) {
            onSubmitSuccess?.();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-5">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Submit Homework
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
                    >
                        &times;
                    </button>
                </div>

                {/* Text Answer */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Your Answer
                    </label>
                    <textarea
                        rows={5}
                        placeholder="Write your answer here..."
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                {/* Attached Link */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        Attach Link
                        <span className="text-gray-400 font-normal ml-1">
                            (YouTube, Google Drive, or any URL)
                        </span>
                    </label>

                    <input
                        type="url"
                        placeholder="https://drive.google.com/... or https://youtube.com/..."
                        value={attachedLink}
                        onChange={(e) => setAttachedLink(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />

                    {/* Preview */}
                    {attachedLink.trim() && isValidLink(attachedLink.trim()) && (
                        <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2 mt-1">
                            <a
                                href={attachedLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 underline truncate"
                            >
                                {attachedLink}
                            </a>
                            <button
                                onClick={() => setAttachedLink("")}
                                className="text-red-400 hover:text-red-600 text-xs ml-2"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-1">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SubmitModal;