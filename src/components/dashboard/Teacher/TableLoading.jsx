import React from 'react'

const TableLoading = () => {
    return (
        <table className="w-full text-left">
            <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-sm">
                    <th className="py-3 px-2">#</th>
                    <th className="py-3 px-2">Student</th>
                    <th className="py-3 px-2">Email</th>
                    <th className="py-3 px-2">Role</th>
                    <th className="py-3 px-2">Actions</th>
                </tr>
            </thead>

            <tbody className="animate-pulse">
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <tr key={index} className="border-b border-gray-700">
                        <td className="py-3 px-2">
                            <div className="h-4 w-6 bg-gray-700 rounded"></div>
                        </td>
                        <td className="py-3 px-2 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                            <div className="h-4 w-24 bg-gray-700 rounded"></div>
                        </td>
                        <td className="py-3 px-2">
                            <div className="h-4 w-40 bg-gray-700 rounded"></div>
                        </td>
                        <td className="py-3 px-2">
                            <div className="h-5 w-20 bg-gray-700 rounded-full"></div>
                        </td>
                        {/* Actions Skeleton */}
                        <td className="py-3 px-2">
                            <div className="flex gap-2">
                                <div className="h-6 w-14 bg-gray-700 rounded-full"></div>
                                <div className="h-6 w-14 bg-gray-700 rounded-full"></div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default TableLoading