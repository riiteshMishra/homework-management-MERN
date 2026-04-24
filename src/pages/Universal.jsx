import React from "react";
import { Link } from "react-router-dom";

const Universal = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-600">

            {/* Emoji / Icon */}
            <div className="text-6xl mb-4">🚧</div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Page Not Found
            </h1>

            {/* Subtext */}
            <p className="text-gray-600 mb-6 max-w-md">
                The page you are looking for doesn’t exist or is still under development.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
                <Link
                    to="/"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Go Home
                </Link>

                <Link
                    to="/dashboard/profile"
                    className="border px-5 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                    Dashboard
                </Link>
            </div>

            {/* Coming soon text */}
            <p className="mt-8 text-sm text-gray-500">
                🚀 Coming Soon...
            </p>

        </div>
    );
};

export default Universal;