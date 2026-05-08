import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setToken } from "../../toolkit/auth.slice"
import { login } from "../../services/oprations/auth"
import { setUser } from "../../toolkit/user.slice"
import Ban from "../../pages/Ban"
import Loader from "../common/Loader"

const LoginForm = ({ setIsLogin }) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const [ban, setBan] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })


    // Handle change
    const handleChange = (e) => {
        setError("")
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 'teacher' : 'student') : value,
        }))
    }

    // submit handler
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await login(formData, navigate, dispatch, setBan);
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    if (ban) return <Ban />

    if (loading) return <Loader
        title="Logging In"
        message="Verifying your credentials and preparing your dashboard..."
    />

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1.5">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@school.com"
                        required
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm text-gray-600">Password</label>
                        <Link
                            to="/forgot-password"
                            className="text-xs text-blue-600 hover:text-blue-700"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="*******"
                        required
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>


                {/* Error */}
                {error && (
                    <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                        {error}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition cursor-pointer"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>

            {/* Switch to Register */}
            <p className="text-center text-sm text-gray-500 mt-5">
                Don't have an account?{' '}
                <button
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                    Register
                </button>
            </p>
        </div>
    )
}

export default LoginForm