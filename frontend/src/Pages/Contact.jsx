import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* Contact Us Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CONTACT US</h1>
        <div className="w-24 h-1 bg-blue-600 rounded-full mx-auto"></div>
      </div>

      {/* Contact Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Image */}
        <div className="flex-shrink-0">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Contact Form */}
        <div>
          <p className="text-gray-600 text-lg mb-8">
            Have questions or feedback? We'd love to hear from you. Reach out to us using the contact form below, and our team will get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please share your message here..."
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        {/* Email Card */}
        <div className="border border-gray-300 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
          <div className="mb-4 flex justify-center">
            <img src={assets.chats_icon} alt="Email" className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
          <p className="text-gray-600">support@prescripto.com</p>
        </div>

        {/* Phone Card */}
        <div className="border border-gray-300 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
          <div className="mb-4 flex justify-center">
            <img src={assets.verified_icon} alt="Phone" className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
          <p className="text-gray-600">+1 (555) 123-4567</p>
        </div>

        {/* Location Card */}
        <div className="border border-gray-300 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
          <div className="mb-4 flex justify-center">
            <img src={assets.info_icon} alt="Location" className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Location</h3>
          <p className="text-gray-600">123 Healthcare St, Medical City, MC 12345</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us On Map</h2>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Prescripto Location"
            width="100%"
            height="500"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen=""
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.8671156908167!2d-74.00601592346895!3d40.71282567138067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197e283c0b%3A0x40c6a5770666d4d4!2s123%20Healthcare%20St%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
