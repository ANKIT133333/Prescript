import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const About = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* About Us Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ABOUT US</h1>
        <div className="w-24 h-1 bg-blue-600 rounded-full mx-auto"></div>
      </div>

      {/* About Content Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
        {/* Image */}
        <div className="lg:w-1/3 flex-shrink-0">
          <img
            src={assets.about_image}
            alt="About Us"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="lg:w-2/3">
          <p className="text-gray-700 text-lg leading-8 mb-6">
            Welcome To Prescripto, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficiently.
            At Prescripto, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor Appointments And Managing Their Health Records.
          </p>

          <p className="text-gray-700 text-lg leading-8 mb-8">
            Prescripto Is Committed To Excellence In Healthcare Technology. We Continuously Strive To Enhance Our Platform, Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service. Whether You're Booking Your First Appointment Or Managing Ongoing Care, Prescripto Is Here To Support You Every Step Of The Way.
          </p>

          {/* Vision Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-8">
              Our Vision At Prescripto Is To Create A Seamless Healthcare Experience For Every User. We Aim To Bridge The Gap Between Patients And Healthcare Providers, Making It Easier For You To Access The Care You Need, When You Need It.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          WHY <span>CHOOSE US</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Efficiency Card */}
          <div className="border border-gray-300 p-8 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">EFFICIENCY:</h3>
            <p className="text-gray-600">
              Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.
            </p>
          </div>

          {/* Convenience Card */}
          <div className="border border-gray-300 p-8 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">CONVENIENCE:</h3>
            <p className="text-gray-600">
              Access To A Network Of Trusted Healthcare Professionals In Your Area.
            </p>
          </div>

          {/* Personalization Card */}
          <div className="border border-gray-300 p-8 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">PERSONALIZATION:</h3>
            <p className="text-gray-600">
              Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
