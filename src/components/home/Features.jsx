import React from 'react'

const Features = () => {
    return (
        <section className="bg-white dark:bg-gray-800 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <h2 className="text-3xl font-semibold text-center mb-14">
                    Features
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

                    {[
                        {
                            title: "📚 Assign Homework",
                            desc: "Teachers can assign homework with deadlines and attachments.",
                        },
                        {
                            title: "📤 Easy Submission",
                            desc: "Students can upload files and submit answers easily.",
                        },
                        {
                            title: "📊 Track Progress",
                            desc: "Monitor submissions, marks, and feedback in real-time.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-gray-50 dark:bg-gray-900"
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {item.desc}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>)
}

export default Features