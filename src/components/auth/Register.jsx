import { useState } from "react"
import { useDispatch } from "react-redux"        // fix: dispatch chahiye thunk ke liye
import { signup } from "../../services/oprations/auth"
import { setToken } from "../../toolkit/auth.slice"

const Register = ({ setIsLogin }) => {
    const dispatch = useDispatch()               // fix: dispatch initialize karo
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        accountType: "student",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setError("")
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword)
            return setError("Passwords do not match")

        setLoading(true)
        try {
            const result = await signup(formData);
            if (result?.data?.token)
                dispatch(setToken(result.data?.token));


        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1.5">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ritesh Mishra"
                            required
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1.5">Role</label>
                        <select
                            name="accountType"   // fix: "role" → "accountType" formData se match karo
                            value={formData.accountType}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-600 mb-1.5">Email address</label>
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

                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1.5">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1.5">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition cursor-pointer"
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
                Already have an account?{' '}
                <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                    Sign in
                </button>
            </p>
        </div>
    )
}

export default Register