import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"

const NavModal = ({ navLinks, menuOpen, setMenuOpen }) => {
    return (
        <AnimatePresence>
            {menuOpen && (
                <>
                    {/* fix: backdrop — bahar click karo toh band ho */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 z-40 sm:hidden"
                    />

                    {/* Dropdown */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-4 top-14 z-50 w-52 sm:hidden
                                   bg-white border border-gray-100 rounded-xl
                                    shadow-gray-200/60 overflow-hidden"
                    >
                        {/* Nav Links */}
                        <div className="p-2 flex flex-col gap-0.5">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive
                                            ? 'bg-blue-50 text-blue-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default NavModal