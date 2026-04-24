import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className=" bg-amber-700 min-h-screen">
            <section className=" max-w-7xl center px-4 sm:px-6 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12"
            >

                {/* Left */}
                <div className="space-y-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Manage Homework <br /> Easily & Efficiently 🚀
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto md:mx-0">
                        Assign, submit, and track homework seamlessly for students and teachers.
                    </p>

                    <div className="flex justify-center md:justify-start gap-4">
                        <Link
                            to="/signup"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow hover:shadow-md"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="border border-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Right Image */}
                <div className="w-full max-w-sm md:max-w-md">
                    <img
                        src="https://illustrations.popsy.co/gray/web-design.svg"
                        alt="Homework Illustration"
                        className="w-full h-auto pointer-events-none"
                    />
                </div>
            </section>
        </div>
    )
}

export default Hero