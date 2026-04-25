
// routes

export const teacherDashboardRoutes = [
    {
        id: 1,
        title: "Profile",
        path: "/dashboard/profile",
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Create Homework",
        path: "/dashboard/homework/create",
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16v3H4V4zm0 5h10v10H4V9zm12 0h4v6h-4V9z" />
            </svg>
        )
    },
    {
        id: 3,
        title: "All Homeworks",
        path: "/dashboard/homeworks/all",
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        )
    },
    {
        id: 4,
        title: "Students",
        path: "/dashboard/students",
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.7 0 3-1.3 3-3S17.7 5 16 5s-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4zm8 0c-.3 0-.7 0-1 .1 1.7 1 3 2.4 3 3.9v2h6v-2c0-2.7-5.3-4-8-4z" />
            </svg>
        )
    }
]

export const studentDashboardRoutes = [
    {
        id: 1,
        title: "Profile",
        path: "/dashboard/profile",
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
        )
    },
    {
        id: 2,
        title: "My Homeworks",
        path: "/dashboard/my-homeworks",
        icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16v3H4V4zm0 5h10v10H4V9zm12 0h4v6h-4V9z" />
            </svg>
        )
    },
    // {
    //     id: 3,
    //     title: "My Results",
    //     path: "/dashboard/my-results/:homeworkId",
    //     icon: (
    //         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    //             <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    //         </svg>
    //     )
    // },
]


export const getDashboardRoutes = (role) => {
    return role === 'teacher' ? teacherDashboardRoutes : studentDashboardRoutes
}