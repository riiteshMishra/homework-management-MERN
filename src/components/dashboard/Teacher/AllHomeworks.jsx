import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllHomeworks, deleteHomework } from '../../../services/oprations/homework'
import { useSelector } from 'react-redux'

const statusStyles = {
    published: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-500",
    closed: "bg-red-100 text-red-600",
}

const AllHomeworks = () => {
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const [homeworks, setHomeworks] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)

    // ================= FETCH =================
    useEffect(() => {
        const fetchHomeworks = async () => {
            try {
                const res = await getAllHomeworks(token)
                setHomeworks(res || [])

            } catch (err) {
                console.log("Error fetching homeworks", err)
                toast.error("Failed to load homeworks")
            } finally {
                setLoading(false)
            }
        }
        fetchHomeworks()
    }, [])

    // ================= DELETE =================
    const handleDelete = async (homeworkId) => {
        if (!window.confirm("Delete this homework?")) return

        setDeletingId(homeworkId)
        try {
            await deleteHomework(homeworkId, token)
            setHomeworks(prev => prev.filter(hw => hw._id !== homeworkId))

        } catch (err) {
            console.log("Error deleting homework", err)
            toast.error("Failed to delete homework")
        } finally {
            setDeletingId(null)
        }
    }

    // ================= LOADING =================
    if (loading) return (
        <div className="min-h-screen bg-[#d9f0f8] p-6">

            <div className="flex items-center justify-between mb-5 animate-pulse">
                <div>
                    <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="h-9 w-32 bg-gray-300 rounded-lg"></div>
            </div>

            <div className="flex flex-col gap-3">
                {[1, 2, 3, 4].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between gap-4 animate-pulse"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-40 bg-gray-300 rounded"></div>
                                <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                <div className="h-3 w-28 bg-gray-200 rounded"></div>
                                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
                            <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
                            <div className="h-8 w-16 bg-gray-300 rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    // ================= UI =================
    return (
        <div className="min-h-screen bg-[#d9f0f8] p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">All Homeworks</h1>
                    <p className="text-sm text-gray-500">
                        {homeworks.length} homework{homeworks.length !== 1 ? 's' : ''} created
                    </p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/homework/create')}
                    className="text-sm px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition"
                >
                    + Create New
                </button>
            </div>

            {/* Empty */}
            {homeworks.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                    <p className="text-sm text-gray-400 mb-3">No homeworks created yet</p>
                    <button
                        onClick={() => navigate('/dashboard/homework/create')}
                        className="text-sm px-4 py-2 bg-blue-700 text-white rounded-lg"
                    >
                        Create First Homework
                    </button>
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
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                    <h2 className="text-sm font-medium text-gray-800 capitalize truncate">
                                        {hw.title}
                                    </h2>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusStyles[hw.status]}`}>
                                        {hw.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md capitalize">
                                        {hw.subject}
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        {hw.students?.length || 0} assigned
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        • {hw.submissions?.length || 0} submitted
                                    </span>

                                    {/* ✅ date added */}
                                    <span className="text-xs text-gray-400">
                                        • {new Date(hw.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => navigate(`/dashboard/homework/update/${hw._id}`)}
                                    className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg cursor-pointer"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(hw._id)}
                                    disabled={deletingId === hw._id}
                                    className="text-xs px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg disabled:opacity-50 cursor-pointer"
                                >
                                    {deletingId === hw._id ? "Deleting..." : "Delete"}
                                </button>

                                <button
                                    onClick={() => navigate(`/dashboard/homeworks/${hw._id}`)}
                                    className=" cursor-pointer text-xs px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AllHomeworks