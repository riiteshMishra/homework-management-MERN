import React, { useState } from 'react'
import Logo from '../components/auth/Logo'
import LoginForm from '../components/auth/LoginForm'
import Register from '../components/auth/Register'

const Login = () => {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="min-h-[calc(100vh-60px)] bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md shadow-sm">

                <Logo />

                {/* fix: heading + subtitle dynamically change hogi */}
                <h1 className="text-xl font-semibold text-gray-900 mb-1">
                    {isLogin ? 'Welcome back' : 'Create account'}
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                    {isLogin ? 'Sign in to your account to continue' : 'Fill in the details to get started'}
                </p>

                {isLogin
                    ? <LoginForm setIsLogin={setIsLogin} />
                    : <Register setIsLogin={setIsLogin} />
                }

            </div>
        </div>
    )
}

export default Login