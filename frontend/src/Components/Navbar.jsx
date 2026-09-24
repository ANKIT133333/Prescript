import React, { useState, useContext } from 'react'
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken } = useContext(AppContext)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/login')
    }

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/doctors', label: 'All Doctors' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ]

    return (
        <header className='sticky top-0 z-50 mb-6 border-b border-slate-200 bg-white/80 py-3 backdrop-blur-md'>
            <div className='flex items-center justify-between gap-4'>
                <img className='w-40 cursor-pointer sm:w-44' src={assets.logo} alt='Prescripto logo' onClick={() => navigate('/')} />

                <nav className='hidden items-center gap-5 md:flex'>
                    {navItems.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                `nav-link relative px-2 py-1 text-sm font-medium transition ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
                            }
                        >
                            <span>{label}</span>
                            <hr className='mt-1 hidden h-0.5 rounded-full bg-blue-600' />
                        </NavLink>
                    ))}
                </nav>

                <div className='flex items-center gap-3'>
                    {token ? (
                        <div className='group relative hidden items-center gap-3 md:flex'>
                            <img className='h-9 w-9 rounded-full object-cover ring-2 ring-slate-200' src={assets.profile_pic} alt='Profile' />
                            <img className='w-2.5' src={assets.dropdown_icon} alt='Dropdown' />
                            <div className='absolute right-0 top-full z-20 hidden pt-4 text-base font-medium text-slate-600 group-hover:block'>
                                <div className='min-w-48 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl'>
                                    <p onClick={() => navigate('/my-profile')} className='cursor-pointer rounded-xl px-3 py-2 hover:bg-slate-100'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointment')} className='cursor-pointer rounded-xl px-3 py-2 hover:bg-slate-100'>My Appointment</p>
                                    <p onClick={logout} className='cursor-pointer rounded-xl px-3 py-2 hover:bg-slate-100'>Logout</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className='hidden rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 md:inline-flex'>
                            Create Account
                        </button>
                    )}

                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className='inline-flex rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm md:hidden'
                        aria-label='Toggle menu'
                    >
                        <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='2'>
                            <path d='M4 7h16M4 12h16M4 17h16' strokeLinecap='round' />
                        </svg>
                    </button>
                </div>
            </div>

            {showMenu && (
                <div className='mt-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg md:hidden'>
                    {navItems.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            onClick={() => setShowMenu(false)}
                            className={({ isActive }) =>
                                `block rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-100'}`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}

                    {token ? (
                        <>
                            <button onClick={() => { navigate('/my-profile'); setShowMenu(false); }} className='mt-2 block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100'>My Profile</button>
                            <button onClick={() => { navigate('/my-appointment'); setShowMenu(false); }} className='block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100'>My Appointment</button>
                            <button onClick={() => { logout(); setShowMenu(false); }} className='block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100'>Logout</button>
                        </>
                    ) : (
                        <button onClick={() => { navigate('/login'); setShowMenu(false); }} className='mt-2 block w-full rounded-xl bg-blue-600 px-3 py-2 text-left text-sm font-medium text-white'>Create Account</button>
                    )}
                </div>
            )}
        </header>
    )
}

export default Navbar

