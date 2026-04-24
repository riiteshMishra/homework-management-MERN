// nav.data.js

export const teacherLinks = [
    { label: 'Dashboard', path: '/dashboard/profile' },
    { label: 'Homeworks', path: '/homeworks' },
    { label: 'Results', path: '/results' },
]

export const studentLinks = [
    { label: 'Dashboard', path: '/dashboard/profile' },
    { label: 'My Homeworks', path: '/my-homeworks' },
    { label: 'My Results', path: '/my-results' },
]

export const getNavLinks = (role) => {
    return role === 'teacher' ? teacherLinks : studentLinks
}