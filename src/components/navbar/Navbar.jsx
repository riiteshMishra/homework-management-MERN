import { Link } from 'react-router-dom';
import Brand from './Brand'
import Private from './Private'
import Right from './Right'
import { BookOpen, CheckCircle2, Clock, Bell, Users, BarChart3, Sparkles, ArrowRight } from "lucide-react";
const Navbar = () => {

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[#fdfbf5]/70 border-b border-emerald-900/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <Link to={"/"} className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-600 grid place-items-center shadow-md">
                        <BookOpen className="h-5 w-5 text-amber-50" />
                    </Link>

                    <Link to={"/"} className="font-bold text-black text-lg tracking-tight font-[Outfit,sans-serif]">
                        HomeworkHub
                    </Link>

                </div>
                <Private />
                <Right />

            </div>
        </header>
    )
}

export default Navbar