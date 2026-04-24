import React, { useEffect, useRef, useState } from 'react'
import { getAllStudents } from '../../../services/oprations/auth'
import { X } from 'lucide-react'

const StudentsInput = ({ register, setValue }) => {

    const [allStudents, setAllStudents] = useState([])
    const [selected, setSelected] = useState([])
    const [search, setSearch] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    // fetch all students on mount   
    useEffect(() => {
        const fetchStudents = async () => {
            const result = await getAllStudents()
            if (result) setAllStudents(result)
        }
        fetchStudents()
    }, [])

    // register field IDs jaayengi form mei
    useEffect(() => {
        register("students")
    }, [register])

    // jab bhi selected change ho → setValue mein IDs update karo
    useEffect(() => {
        const ids = selected.map(s => s._id)
        setValue("students", ids)
    }, [selected, setValue])

    // close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleOutsideClick)
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [])

    // search filter — already selected wale hide karo
    const filteredStudents = allStudents.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase()) &&
        !selected.find(s => s._id === student._id)
    )

    const handleSelect = (student) => {
        setSelected(prev => [...prev, student])
        setSearch("")
        setShowDropdown(false)
    }

    const handleRemove = (id) => {
        setSelected(prev => prev.filter(s => s._id !== id))
    }

    return (
        <div ref={dropdownRef} className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
                Students
            </label>

            {/* Selected tags + input */}
            <div
                className="w-full min-h-[42px] border border-gray-300 px-2 py-1.5 rounded-lg flex flex-wrap gap-1.5 cursor-text 
                bg-[#5f6c6d]
                focus-within:ring-2 focus-within:ring-blue-400"
                onClick={() => setShowDropdown(true)}
            >
                {/* Selected student tags — naam dikhega */}
                {selected.map(student => (
                    <span
                        key={student._id}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded-full"
                    >
                        {student.name}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleRemove(student._id) }}
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}

                {/* Search input */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setShowDropdown(true) }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder={selected.length === 0 ? "Search students..." : ""}
                    className="flex-1 min-w-[120px] outline-none text-sm bg-transparent "
                />
            </div>

            {/* Dropdown */}
            {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-[#234041] border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <div
                                key={student._id}
                                onClick={() => handleSelect(student)}
                                className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer flex justify-between items-center"
                            >
                                <span>{student.name}</span>
                                <span className="text-xs text-gray-400">{student._id.slice(-6)}</span>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-400">
                            {search ? "No student found" : "No more students"}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default StudentsInput