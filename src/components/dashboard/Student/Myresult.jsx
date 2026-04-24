import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getStudentResult } from '../../../services/oprations/submission'

const MyResult = () => {
    const { token } = useSelector(state => state.auth)
    const { homeworkId } = useParams()

    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await getStudentResult(homeworkId, token)

                setResult(res?.data || null)

            } catch (err) {
                console.log("Error fetching result", err)
            } finally {
                setLoading(false)
            }
        }
        fetchResult()
    }, [homeworkId, token])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#d9f0f8]">
                <p className="text-sm text-gray-400">Loading result...</p>
            </div>
        )
    }

    if (!result) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#d9f0f8]">
                <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                    <p className="text-sm text-gray-400">No result found</p>
                </div>
            </div>
        )
    }

    const submittedDate = result?.submittedAt
        ? new Date(result.submittedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
        : "N/A"

    return (
        <div className="min-h-screen bg-[#d9f0f8] p-6">

            {/* Header */}
            <div className="mb-5">
                <h1 className="text-lg font-semibold text-gray-800">My Result</h1>
                <p className="text-sm text-gray-500">Your submission details</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">

                {/* Top */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                    <div>
                        <p className="text-sm font-medium text-gray-800 capitalize">
                            {result?.homework?.title || "Homework"}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Submitted on {submittedDate}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${result.isLate
                                ? "bg-red-50 text-red-500"
                                : "bg-gray-100 text-gray-500"
                            }`}>
                            {result.isLate ? "Late" : "On Time"}
                        </span>

                        <span className="text-2xl font-bold text-blue-700">
                            {result.marks ?? "—"}
                            <span className="text-sm text-gray-400 font-normal">/100</span>
                        </span>
                    </div>
                </div>

                {/* Answer */}
                <div className="px-5 py-4 border-b border-gray-50">
                    <p className="text-xs font-medium text-gray-400 uppercase mb-2">
                        Your Answer
                    </p>
                    <p className="text-sm text-gray-600 bg-slate-50 px-4 py-3 rounded-lg">
                        {result.textAnswer || "No answer submitted"}
                    </p>
                </div>

                {/*  attachedLink */}
                {result.attachedLink && (
                    <div className="px-5 py-4 border-b border-gray-50">
                        <p className="text-xs font-medium text-gray-400 uppercase mb-2">
                            Attached Link
                        </p>
                        <a
                            href={result.attachedLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-600 underline"
                        >
                            🔗 Open Link
                        </a>
                    </div>
                )}

                {/* Feedback */}
                <div className={`px-5 py-4 ${result.feedback ? "bg-blue-50" : "bg-amber-50"}`}>
                    <p className="text-xs font-medium uppercase mb-1 text-amber-700">
                        Teacher Feedback
                    </p>
                    <p className={`text-sm ${result.feedback ? "text-blue-700" : "text-amber-600"}`}>
                        {result.feedback || "Not reviewed yet"}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default MyResult