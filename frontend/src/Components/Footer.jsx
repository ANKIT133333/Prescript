import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <footer className="mt-16 rounded-t-3xl border-t border-slate-200 bg-white/80 px-4 py-8 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 py-6 text-sm sm:grid-cols-[3fr_1fr_1fr]">
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Logo" />
          <p className="max-w-md leading-7 text-slate-600">
            Caring for your health with trusted doctors, easy appointments, and a patient-first experience designed to make care accessible and simple.
          </p>
        </div>

        <div>
          <p className="mb-5 text-lg font-semibold text-slate-800">Company</p>
          <ul className="flex flex-col gap-3 text-slate-600">
            <li className="cursor-pointer transition hover:text-blue-600">Home</li>
            <li className="cursor-pointer transition hover:text-blue-600">About Us</li>
            <li className="cursor-pointer transition hover:text-blue-600">Contact Us</li>
            <li className="cursor-pointer transition hover:text-blue-600">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-lg font-semibold text-slate-800">Get in Touch</p>
          <ul className="flex flex-col gap-3 text-slate-600">
            <li>+1-212-456-789</li>
            <li>ankit@example.com</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200" />

      <p className="py-5 text-center text-sm text-slate-500">
        Copyright © 2023 Prescripto. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;