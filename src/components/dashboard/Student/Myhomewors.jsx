import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllHomeworks } from '../../../services/oprations/homework'
import { useSelector } from 'react-redux'
import SubmitModal from './SubmitModal'

// status badge colors
const statusStyles = {
    published: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-500",
    closed: "bg-red-100 text-red-600",
}

const MyHomeworks = () => {
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [homeworks, setHomeworks] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedHomeworkId, setSelectedHomeworkId] = useState(null)


    useEffect(() => {
        const fetchHomeworks = async () => {
            try {
                const res = await getAllHomeworks(token)
                setHomeworks(res)
            } catch (err) {
                console.log("Error fetching homeworks", err)
            } finally {
                setLoading(false)
            }
        }
        fetchHomeworks()
    }, [])

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-[#d9f0f8]">
            <p className="text-sm text-gray-400">Loading homeworks...</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#d9f0f8] p-6">

            {/* Header */}
            <div className="mb-5">
                <h1 className="text-lg font-semibold text-gray-800">My Homeworks</h1>
                <p className="text-sm text-gray-500">
                    {homeworks.length} homework{homeworks.length !== 1 ? 's' : ''} assigned
                </p>
            </div>

            {/* Empty state */}
            {homeworks.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                    <p className="text-sm text-gray-400">No homeworks assigned yet</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {homeworks.map((hw) => (
                        <div
                            key={hw._id}
                            className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm"
                        >
                            {/* Left */}
                            <div className="flex-1 min-w-0">

                                {/* Title + Status */}
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h2 className="text-sm font-medium text-gray-800 capitalize truncate">
                                        {hw.title}
                                    </h2>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 ${statusStyles[hw.status] || "bg-gray-100 text-gray-500"}`}>
                                        {hw.status}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                                    {hw.description}
                                </p>

                                {/* Meta */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md capitalize">
                                        {hw.subject}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {hw.students.length} student{hw.students.length !== 1 ? 's' : ''}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        • {hw.submissions.length} submission{hw.submissions.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>

                            {/* View Button */}
                            <div className="flex gap-2 shrink-0">

                                {/* View */}
                                <button
                                    onClick={() => navigate(`/dashboard/homeworks/${hw._id}`)}
                                    className="text-xs px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white cursor-pointer rounded-lg transition"
                                >
                                    View
                                </button>

                                {/* Submit Homework */}
                                <button
                                    onClick={() => setSelectedHomeworkId(hw._id)}
                                    className="text-xs px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer transition"
                                >
                                    Submit
                                </button>

                                {/* View Result */}
                                <button
                                    onClick={() => navigate(`/dashboard/my-results/${hw._id}`)}
                                    className="text-xs px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition cursor-pointer"
                                >
                                    Result
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedHomeworkId && (
                <SubmitModal
                    homeworkId={selectedHomeworkId}
                    onClose={() => setSelectedHomeworkId(null)}
                    onSubmitSuccess={async () => {
                        setSelectedHomeworkId(null);
                        const res = await getAllHomeworks(token);
                        setHomeworks(res);
                    }}
                />
            )}
        </div>
    )
}

export default MyHomeworks