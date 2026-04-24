import React from 'react'

const Logo = () => {
    return (
        <div className="flex items-center gap-2.5 mb-7">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h16v3H4V4zm0 5h10v10H4V9zm12 0h4v6h-4V9z" />
                </svg>
            </div>
            <span className="font-medium text-gray-900 text-base">HomeworkHub</span>
        </div>)
}

export default Logo