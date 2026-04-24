import React from 'react'
import { useSelector } from 'react-redux'
import { getNavLinks } from './nav.data';

const Private = () => {
    const { user, token } = useSelector(state => state.auth);

    const navLinks = getNavLinks(user?.accountType)
    return (
        <div>
            {user && (
                <div className="hidden sm:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <motion.div
                            key={link.path}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-md text-sm ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-500 hover:bg-gray-50'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Private