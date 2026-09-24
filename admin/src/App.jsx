import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './controllers/Navbar'
import SliderPart from './controllers/SliderPart'
import { Route, Routes } from 'react-router-dom'
import Allappointment from './pages/Admin/Allappointment'
import AddDoctor from './pages/Admin/AddDoctor'
import Dashboard from './pages/Admin/Dashboard'
import DoctorList from './pages/Admin/DoctorList'

const App = () => {
  const { aToken } = useContext(AdminContext)

  return aToken ? (
    <div className='min-h-screen bg-slate-100 text-slate-800'>
      <ToastContainer />
      <Navbar />
      <div className='mx-auto flex max-w-[1600px] flex-col gap-0 xl:flex-row'>
        <SliderPart />

        <main className='min-w-0 flex-1 px-3 py-4 sm:px-5 lg:px-6'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/app-appointment" element={<Allappointment />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorList />} />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <div className='min-h-screen bg-slate-100'>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App
