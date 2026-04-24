import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen } from "lucide-react";

const Brand = () => {
    return (

        <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-600 grid place-items-center shadow-md">
                    <BookOpen className="h-5 w-5 text-amber-50" />
                </div>
                <span className="font-bold text-lg tracking-tight font-[Outfit,sans-serif]">
                    HomeworkHub
                </span>
            </div>
        </Link>
    )
}

export default Brand