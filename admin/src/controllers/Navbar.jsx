import React, { useContext } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { AdminContext } from '../context/AdminContext'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        setAToken(null)
    }

    return (
        <header className="border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <img src={assets.logo} alt="Prescript logo" className="h-10 w-40 rounded-full object-cover sm:w-44" />
                    <div>
                        <p className="text-base font-semibold text-slate-800 sm:text-lg">Prescript Admin</p>
                        <p className="text-xs text-slate-500 sm:text-sm">{aToken ? 'Signed in as Admin' : 'Doctor panel'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 sm:block">
                        {aToken ? 'Administrator' : 'Doctor'}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
