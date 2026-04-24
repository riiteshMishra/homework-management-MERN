import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDashboardRoutes } from '../data/dashboard'


const Dashboard = () => {
    const { user } = useSelector(state => state.user)

    const dashboardRoutes = getDashboardRoutes(user?.accountType)
    return (
        <div
            className=" flex sm:flex-row flex-col min-h-screen  max-w-[1400px] mx-auto bg-[#d9f0f8]"
        >

            {/* Sidebar */}
            <aside className="sm:w-52  border-r border-gray-100 bg-[#84d6f1] shrink-0 px-3 py-5 flex flex-col gap-1">

                <p className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full 
bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
text-white shadow-md w-fit  mb-3">
                    {user?.accountType}
                </p>

                {dashboardRoutes.map(route => (
                    <NavLink
                        key={route.id}
                        to={route.path}
                        className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors font-bold ${isActive
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-800 hover:bg-gray-50 hover:text-gray-800'
                            }`
                        }
                    >
                        {route.icon}
                        {route.title}
                    </NavLink>
                ))}
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-[#d9f0f8]">
                <Outlet />
            </main>

        </div>
    )
}

export default Dashboard    