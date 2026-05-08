import React from "react";
import { ShieldBan, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {
        opacity: 0,
        scale: 0.92,
        y: 40,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

const Ban = () => {
    return (
        <div className="fixed inset-0 z-[9999] min-h-screen bg-[#030712] flex items-center justify-center p-4 overflow-hidden">

            {/* Animated Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-red-500/20 blur-[140px] rounded-full"
            />

            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-purple-500/20 blur-[140px] rounded-full"
            />

            {/* Main Card */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)]"
            >

                {/* Glass Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

                {/* Top Shine */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 sm:px-10 sm:py-14 text-center">

                    {/* Icon */}
                    <motion.div
                        variants={itemVariants}
                        animate={floatingAnimation}
                        className="relative mb-8"
                    >
                        <div className="absolute inset-0 bg-red-500/30 blur-2xl rounded-full" />

                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center shadow-lg shadow-red-500/20">
                            <ShieldBan className="w-12 h-12 sm:w-14 sm:h-14 text-red-500" />
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent leading-tight"
                    >
                        Account Banned
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="mt-5 max-w-xl text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed"
                    >
                        Your account has been permanently restricted due to
                        suspicious activity or violation of platform policies.
                        Please contact support if you believe this action was
                        taken by mistake.
                    </motion.p>

                    {/* Status Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-7 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                        </span>

                        Access Restricted
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center"
                    >

                        <Link to="/" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="w-full sm:w-auto rounded-xl bg-white px-6 py-3 text-sm sm:text-base font-semibold text-black shadow-xl transition-all duration-300 hover:shadow-white/20 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Home size={18} />
                                Go Home
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm sm:text-base font-medium text-white transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </motion.button>

                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
};

export default Ban;