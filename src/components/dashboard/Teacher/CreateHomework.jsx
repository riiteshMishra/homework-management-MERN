import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createHomework, updateHomework, getHomeworkById } from "../../../services/oprations/homework";
import { useSelector } from "react-redux";
import StudentsInput from "./StudentsInput";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const CreateHomework = () => {
    const { token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const navigate = useNavigate()

    const { homeworkId } = useParams()
    const isEditMode = Boolean(homeworkId)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm();

    useEffect(() => {
        if (!isEditMode) return

        const fetchHomework = async () => {
            setFetching(true)
            const result = await getHomeworkById(homeworkId, token)
            console.log({ result })
            if (result) {
                const { title, description, subject, dueDate, status, students } = result;

                reset({
                    title,
                    description,
                    subject,
                    status,
                    dueDate: dueDate?.slice(0, 10),
                })
                // students IDs StudentsInput ke liye
                setValue("students", students)
            }
            setFetching(false)
        }

        fetchHomework()
    }, [homeworkId])

    const onSubmit = async (data) => {
        try {
            setLoading(true)

            if (isEditMode) {
                //  edit mode → updateHomework call
                data.homeworkId = homeworkId
                await updateHomework(data, token, navigate);
            } else {
                await createHomework(data, token);
            }

            reset()

        } finally {
            setLoading(false)
        }
    };

    // edit mode mein data fetch ho raha hai
    if (fetching) {
        return (
            <div className="min-h-screen bg-[#1184aa] flex items-center justify-center">
                <Loader2 size={36} className="animate-spin text-white" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#1184aa] flex items-center justify-center p-4">

            {/* Card */}
            <div className="w-full max-w-lg bg-[#7f9190] shadow-xl rounded-2xl p-6">

                {/*  heading dynamically change */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {isEditMode ? "Update Homework" : "Create Homework"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            // message add kiya taaki error show ho
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Subject
                        </label>
                        <select
                            className="w-full border bg-[#88a8ac] border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            // message add kiya taaki error show ho
                            {...register("subject", { required: "Subject is required" })}
                        >
                            <option value="">Select Subject</option>
                            <option value="math">Math</option>
                            <option value="english">English</option>
                            <option value="computer">Computer</option>
                        </select>
                        {errors.subject && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.subject.message}
                            </p>
                        )}
                    </div>

                    {/* Students */}
                    <StudentsInput
                        register={register}
                        setValue={setValue}
                    />

                    {/* Due Date */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Due Date
                        </label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            // message add kiya taaki error show ho
                            {...register("dueDate", { required: "Due date is required" })}
                        />
                        {errors.dueDate && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.dueDate.message}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            className="w-full border bg-[#8197c4] border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register("status")}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* Button */}
                    {/* button text bhi dynamically change */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white py-2.5 rounded-lg transition font-medium flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {loading
                            ? (isEditMode ? "Updating..." : "Creating...")
                            : (isEditMode ? "Update Homework" : "Create Homework")
                        }
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateHomework;