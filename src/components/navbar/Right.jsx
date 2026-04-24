import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getNavLinks } from './nav.data';
import { motion, AnimatePresence } from "framer-motion"

import NavModal from './NavModal';
import { RxCross1, RxHamburgerMenu } from "react-icons/rx"  // ya
import { logoutAccount } from '../../services/oprations/auth';


const Right = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false)


    const handleLogout = () => {
        logoutAccount(dispatch, navigate)
    }

    const navLinks = getNavLinks(user?.accountType)

    return (
        <div className='relatinve z-20'>

            <div className="flex items-center gap-3">

                {user ? (
                    <>
                        {/* Avatar */}
                        <motion.div
                            onClick={() => navigate('/dashboard/profile')}
                            whileHover={{ scale: 1.1 }}
                            className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-sm font-medium cursor-pointer"
                        >
                            <img src={user?.image} />
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="text-xs px-3 py-1.5 border rounded-md hover:bg-red-500 cursor-pointer text-black"
                        >
                            Logout
                        </motion.button>
                    </>
                ) : (
                    <Link to="/login" className='text-black'>Login</Link>
                )}

                {/* Mobile Toggle */}
                {
                    token && (
                        <button
                            className="sm:hidden text-gray-600 hover:text-gray-900 transition"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen
                                ? <RxCross1 className="w-5 h-5" />
                                : <RxHamburgerMenu className="w-5 h-5" />
                            }
                        </button>
                    )
                }
            </div>

            {/* Mobile Menu Animation */}
            <NavModal navLinks={navLinks} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>

    )
}

export default Right