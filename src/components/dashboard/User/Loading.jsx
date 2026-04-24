import React from 'react'

const Loading = () => {
    return (
        <div className="min-h-screen bg-gray-900 p-6 animate-pulse text-white">
            <div className="h-6 w-60 bg-gray-700 rounded mb-3"></div>
            <div className="h-4 w-40 bg-gray-700 rounded mb-6"></div>

            <div className="h-20 bg-gray-800 rounded-xl mb-4"></div>

            {[1, 2, 3].map((_, i) => (
                <div key={i} className="h-16 bg-gray-800 rounded-xl mb-3"></div>
            ))}
        </div>
    )
}

export default Loading