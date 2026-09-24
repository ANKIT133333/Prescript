import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Doctor from './Pages/Doctor'
import Login from './Pages/Login'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyProfile from './Pages/MyProfile'
import Appiontment from './Pages/Appointment'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import MyAppointment from './Pages/MyAppointment'

import { ToastContainer, toast } from 'react-toastify/unstyled'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <div className='min-h-screen bg-slate-50 text-slate-800'>
      <ToastContainer />
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/doctors/:speciality" element={<Doctor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointment" element={<MyAppointment />} />
          <Route path="/appointment/:docId" element={<Appiontment />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
