import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    image:assets.profile_pic,
    email: 'johndoe@example.com',
    phone: '+1 (555) 123-4567',
    address: {
      line1: '123 Healthcare Street',
      line2: 'Medical City, MC 12345'
    },
    gender: 'Male',
    dob: '1990-05-15',
    image: assets.profile_pic
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address_')) {
      const field = name.replace('address_', '');
      setUserData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Profile saved:', userData);
    setIsEdit(false);
  };

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
        <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row gap-8 mb-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={userData.image}
                alt={userData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
              {isEdit && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                  <img src={assets.upload_icon} alt="Upload" className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {isEdit ? (
              <button
                onClick={() => setIsEdit(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Information */}
          <div className="flex-1 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              {isEdit ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              ) : (
                <p className="text-lg text-gray-900">{userData.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              {isEdit ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              ) : (
                <p className="text-lg text-gray-900">{userData.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              {isEdit ? (
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              ) : (
                <p className="text-lg text-gray-900">{userData.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8" />

        {/* Additional Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth
              </label>
              {isEdit ? (
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              ) : (
                <p className="text-gray-900">{new Date(userData.dob).toLocaleDateString()}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              {isEdit ? (
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-900">{userData.gender}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Address</h4>
            <div className="space-y-3">
              {/* Address Line 1 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Street Address
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="address_line1"
                    value={userData.address.line1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                ) : (
                  <p className="text-gray-900">{userData.address.line1}</p>
                )}
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  City, State & ZIP
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    name="address_line2"
                    value={userData.address.line2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                ) : (
                  <p className="text-gray-900">{userData.address.line2}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button (Only show when editing) */}
        {isEdit && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
