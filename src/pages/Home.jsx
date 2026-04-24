import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, Clock, Bell, Users, BarChart3, Sparkles, ArrowRight } from "lucide-react";
import heroImage from "/book.jpg";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#fdfbf5] text-[#1a2e25] font-[Figtree,sans-serif]">


            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl -z-10" />
                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300/50 text-sm text-emerald-900 font-medium">
                            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                            Built for modern classrooms
                        </span>
                        <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] font-[Outfit,sans-serif] tracking-tight">
                            Homework, <span className="text-amber-500">organized</span>
                            <span className="block">beautifully.</span>
                        </h1>
                        <p className="mt-6 text-lg text-emerald-900/70 max-w-lg leading-relaxed">
                            Track assignments, submit work, and stay ahead of every deadline — all in one elegant workspace designed for students and teachers.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-800 to-emerald-600 text-amber-50 px-7 py-3.5 rounded-full font-medium shadow-xl shadow-emerald-900/20 hover:scale-[1.02] transition"
                            >
                                Get started free
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <a
                                href="#features"
                                className="inline-flex items-center gap-2 bg-white text-emerald-900 px-7 py-3.5 rounded-full font-medium border border-emerald-900/10 hover:bg-amber-50 transition"
                            >
                                See features
                            </a>
                        </div>
                        <div className="mt-10 flex items-center gap-6 text-sm text-emerald-900/60">
                            <div className="flex -space-x-2">
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 border-2 border-[#fdfbf5]"
                                    />
                                ))}
                            </div>
                            <span>
                                Trusted by <strong className="text-emerald-900">2,400+</strong> students
                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-700 rounded-3xl rotate-3 opacity-20 blur-2xl" />
                        <img
                            src={heroImage}
                            alt="Homework management workspace"
                            className="relative rounded-3xl shadow-2xl w-full object-cover animate-[float_6s_ease-in-out_infinite] pointer-events-none"
                        />
                    </div>
                </div>
            </section>

            {/* BENTO FEATURES */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-24">
                <div className="max-w-2xl mb-12">
                    <span className="text-sm text-amber-600 font-medium uppercase tracking-wider">Features</span>
                    <h2 className="mt-3 text-4xl md:text-5xl font-bold font-[Outfit,sans-serif] tracking-tight">
                        Everything you need, nothing you don't.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px]">
                    {/* Big card */}
                    <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-3xl p-8 text-amber-50 relative overflow-hidden shadow-xl group">
                        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-300/30 blur-2xl group-hover:scale-110 transition duration-700" />
                        <CheckCircle2 className="h-10 w-10 text-amber-300 mb-6" />
                        <h3 className="text-3xl font-bold mb-3 font-[Outfit,sans-serif]">Assignment Tracking</h3>
                        <p className="text-amber-50/80 max-w-sm leading-relaxed">
                            Visual dashboards for every class. Mark complete, see progress, and never miss a deadline again.
                        </p>
                        <div className="absolute bottom-8 right-8 flex gap-2">
                            <div className="h-2 w-12 rounded-full bg-amber-300" />
                            <div className="h-2 w-6 rounded-full bg-amber-50/30" />
                            <div className="h-2 w-3 rounded-full bg-amber-50/30" />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-md border border-emerald-900/5 hover:shadow-xl transition">
                        <Clock className="h-8 w-8 text-emerald-800 mb-4" />
                        <h3 className="font-bold text-lg mb-1 font-[Outfit,sans-serif]">Smart Deadlines</h3>
                        <p className="text-sm text-emerald-900/60">Auto-prioritized by urgency.</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-300 to-amber-400 rounded-3xl p-6 shadow-md hover:shadow-xl transition">
                        <Bell className="h-8 w-8 text-emerald-900 mb-4" />
                        <h3 className="font-bold text-lg mb-1 text-emerald-900 font-[Outfit,sans-serif]">Reminders</h3>
                        <p className="text-sm text-emerald-900/70">Gentle nudges that work.</p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-md border border-emerald-900/5 hover:shadow-xl transition">
                        <Users className="h-8 w-8 text-emerald-800 mb-4" />
                        <h3 className="font-bold text-lg mb-1 font-[Outfit,sans-serif]">Class Groups</h3>
                        <p className="text-sm text-emerald-900/60">Collaborate with classmates.</p>
                    </div>

                    <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-md border border-emerald-900/5 hover:shadow-xl transition flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-amber-50 grid place-items-center flex-shrink-0">
                            <BarChart3 className="h-7 w-7 text-emerald-800" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1 font-[Outfit,sans-serif]">Performance Insights</h3>
                            <p className="text-sm text-emerald-900/60">
                                See trends, completion rates, and where to improve — all visualized clearly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how" className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { step: "01", title: "Add your classes", desc: "Set up subjects and teachers in seconds." },
                        { step: "02", title: "Log homework", desc: "Capture assignments with due dates & notes." },
                        { step: "03", title: "Stay on track", desc: "Get reminders and submit on time, every time." },
                    ].map((item) => (
                        <div key={item.step} className="relative">
                            <div className="text-7xl font-bold text-amber-300/50 font-[Outfit,sans-serif]">
                                {item.step}
                            </div>
                            <h3 className="mt-2 text-2xl font-bold font-[Outfit,sans-serif]">{item.title}</h3>
                            <p className="mt-2 text-emerald-900/60">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section id="cta" className="max-w-7xl mx-auto px-6 pb-24">
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 to-emerald-600 p-12 md:p-20 text-center shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
                    <div className="relative">
                        <h2 className="text-4xl md:text-5xl font-bold text-amber-50 max-w-2xl mx-auto leading-tight font-[Outfit,sans-serif]">
                            Start managing homework <span className="text-amber-300">the smart way.</span>
                        </h2>
                        <p className="mt-5 text-amber-50/80 max-w-md mx-auto">
                            Join thousands of students who turned chaos into clarity.
                        </p>
                        <Link
                            to="/login"
                            className="mt-8 inline-flex items-center gap-2 bg-gradient-to-br from-amber-300 to-amber-400 text-emerald-900 px-8 py-4 rounded-full font-semibold shadow-xl shadow-amber-500/30 hover:scale-[1.03] transition"
                        >
                            Join Now — it's free
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-emerald-900/10 py-8 text-center text-sm text-emerald-900/50">
                © {new Date().getFullYear()} HomeworkHub. Crafted with care.
            </footer>
        </div>
    );
};

export default Home;
