import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const SliderPart = () => {
    const { aToken } = useContext(AdminContext)

    const links = [
        { to: '/admin-dashboard', label: 'Dashboard' },
        { to: '/app-appointment', label: 'Appointments' },
        { to: '/add-doctor', label: 'Add Doctor' },
        { to: '/doctor-list', label: 'Doctor List' }
    ]

    if (!aToken) return null

    return (
        <aside className="w-full border-b border-slate-200 bg-white shadow-sm xl:w-72 xl:border-b-0 xl:border-r xl:shadow-none">
            <div className="px-4 py-5 sm:px-5 xl:min-h-[calc(100vh-73px)] xl:px-4 xl:py-6">
                <div className="mb-4 px-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Navigation</p>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}
                                    `
                                }
                            >
                                <span className="mr-3 h-2.5 w-2.5 rounded-full bg-current opacity-70" />
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default SliderPart
