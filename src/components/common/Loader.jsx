import React from "react";
import { motion } from "framer-motion";

const Loader = ({
    title = "Loading",
    message = "Please wait while we process your request...",
}) => {

    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.12,
                ease: "easeOut",
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

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center flex-col gap-10 overflow-hidden bg-[#030712] px-4"
        >

            {/* Brand */}
            <motion.p
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: [0.6, 1, 0.6],
                    y: 0,
                    textShadow: [
                        "0 0 10px rgba(34,211,238,0.2)",
                        "0 0 20px rgba(34,211,238,0.6)",
                        "0 0 10px rgba(34,211,238,0.2)",
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="text-sm sm:text-base uppercase tracking-[0.35em] font-bold bg-gradient-to-r from-cyan-300 via-sky-300 to-purple-400 bg-clip-text text-transparent"
            >
                homework hub
            </motion.p>

            {/* Animated Background */}
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
                className="absolute top-[-120px] left-[-120px] w-96 h-96 rounded-full bg-cyan-500/20 blur-[140px]"
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
                className="absolute bottom-[-120px] right-[-120px] w-96 h-96 rounded-full bg-purple-500/20 blur-[140px]"
            />

            {/* Main Content */}
            <motion.div
                variants={itemVariants}
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col items-center justify-center text-center"
            >

                {/* Floating Particles */}
                <div className="absolute inset-0 -z-10">
                    {[...Array(15)].map((_, i) => (
                        <motion.span
                            key={i}
                            animate={{
                                y: [0, -40, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + i * 0.2,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                            className="absolute w-1 h-1 rounded-full bg-cyan-300/60"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                {/* Outer Ring */}
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute w-44 h-44 rounded-full border border-cyan-400/10"
                />

                {/* Middle Ring */}
                <motion.div
                    animate={{
                        rotate: -360,
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute w-32 h-32 rounded-full border-4 border-transparent border-t-cyan-400/80 border-r-purple-500/80"
                />

                {/* Core Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.18, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative flex items-center justify-center"
                >

                    {/* Blur Glow */}
                    <div className="absolute w-24 h-24 rounded-full bg-cyan-400/30 blur-3xl" />

                    {/* Main Orb */}
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-purple-500 border border-white/20 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.5)]" />
                </motion.div>

                {/* Loading Dots */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 flex items-center gap-2"
                >
                    {[0, 1, 2].map((dot) => (
                        <motion.div
                            key={dot}
                            animate={{
                                y: [0, -8, 0],
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: dot * 0.2,
                            }}
                            className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                        />
                    ))}
                </motion.div>

                {/* Title */}
                <motion.h2
                    variants={itemVariants}
                    animate={{
                        opacity: [0.6, 1, 0.6],
                        letterSpacing: [
                            "0.15em",
                            "0.3em",
                            "0.15em",
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                    className="mt-6 text-xl sm:text-2xl font-semibold uppercase text-white"
                >
                    {title}
                </motion.h2>

                {/* Message */}
                <motion.p
                    variants={itemVariants}
                    className="mt-3 max-w-md text-sm sm:text-base text-gray-400 leading-relaxed"
                >
                    {message}
                </motion.p>

            </motion.div>
        </motion.div>
    );
};

export default Loader;