import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-blue-600 rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden">
      
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-16">

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Book Appointment <br />
          With Trusted Doctors
        </h1>

        <div className="flex items-center gap-3 text-white text-sm">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Doctors"
          />

          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-700 text-sm hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex justify-center items-end">
        <img
          className="w-full max-w-md"
          src={assets.header_img}
          alt="Header"
        />
      </div>
    </div>
  );
};

export default Header;