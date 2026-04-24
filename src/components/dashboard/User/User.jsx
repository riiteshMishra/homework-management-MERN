import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../services/oprations/auth";
import { setUser } from "../../../toolkit/user.slice";

const User = () => {
    const { user } = useSelector(state => state.user);
    const { token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const userDetails = async () => {
        setLoading(true);
        try {
            const result = await getUserDetails(token);
            dispatch(setUser(result))
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        userDetails();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">

            <div className="w-full max-w-md bg-gray-800 text-white rounded-2xl shadow-lg p-6 text-center">

                {/*  SKELETON */}
                {loading ? (
                    <div className="animate-pulse">

                        {/* Avatar Skeleton */}
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-700"></div>

                        {/* Name */}
                        <div className="h-5 bg-gray-700 rounded w-40 mx-auto mb-2"></div>

                        {/* Email */}
                        <div className="h-4 bg-gray-700 rounded w-52 mx-auto mb-3"></div>

                        {/* Role */}
                        <div className="h-6 bg-gray-700 rounded w-24 mx-auto mb-5"></div>

                        {/* Divider */}
                        <div className="border-t border-gray-700 my-5"></div>

                        {/* Info */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex gap-3 justify-center">
                            <div className="h-10 w-32 bg-gray-700 rounded-lg"></div>
                            <div className="h-10 w-32 bg-gray-700 rounded-lg"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Avatar */}
                        <img
                            src={user?.image}
                            alt="user"
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500"
                        />

                        {/* Name */}
                        <h2 className="text-xl font-semibold capitalize">
                            {user?.name}
                        </h2>

                        {/* Email */}
                        <p className="text-gray-400 text-sm">
                            {user?.email}
                        </p>

                        {/* Role */}
                        <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-600 rounded-full">
                            {user?.accountType}
                        </span>

                        {/* Divider */}
                        <div className="border-t border-gray-700 my-5"></div>

                        {/* Extra Info */}
                        <div className="text-left space-y-2 text-sm">
                            <p><span className="text-gray-400">User ID:</span> {user?._id}</p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex gap-3 justify-center">
                            <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                Edit Profile
                            </button>

                            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition">
                                Logout
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default User;