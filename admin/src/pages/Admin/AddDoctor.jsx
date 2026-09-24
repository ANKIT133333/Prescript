// import React, { useState, useContext } from 'react'
// import axios from 'axios'
// import { AdminContext } from '../../context/AdminContext'

// const AddDoctor = () => {
//     const { aToken, backendUrl } = useContext(AdminContext)
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         password: '',
//         speciality: '',
//         degree: '',
//         experience: '',
//         about: '',
//         fees: '',
//         address: '',
//         image: null
//     })
//     const [loading, setLoading] = useState(false)
//     const [message, setMessage] = useState('')
//     const [error, setError] = useState('')

//     const handleChange = (e) => {
//         const { name, value, files } = e.target
//         if (name === 'image') {
//             setForm((prev) => ({ ...prev, image: files?.[0] || null }))
//         } else {
//             setForm((prev) => ({ ...prev, [name]: value }))
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if (!aToken) {
//             setError('Please login first')
//             return
//         }

//         if (!form.image) {
//             setError('Please select a doctor image')
//             return
//         }

//         setLoading(true)
//         setError('')
//         setMessage('')

//         try {
//             const data = new FormData()
//             data.append('name', form.name)
//             data.append('email', form.email)
//             data.append('password', form.password)
//             data.append('speciality', form.speciality)
//             data.append('degree', form.degree)
//             data.append('experience', form.experience)
//             data.append('about', form.about)
//             data.append('fees', form.fees)
//             data.append('address', form.address)
//             data.append('image', form.image)

//             const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, data, {
//                 headers: {
//                     atoken: aToken,
//                     'Content-Type': 'multipart/form-data'
//                 }
//             })

//             if (response.data.success) {
//                 setMessage(response.data.message || 'Doctor added successfully')
//                 setForm({
//                     name: '',
//                     email: '',
//                     password: '',
//                     speciality: '',
//                     degree: '',
//                     experience: '',
//                     about: '',
//                     fees: '',
//                     address: '',
//                     image: null
//                 })
//             } else {
//                 setError(response.data.message || 'Unable to add doctor')
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong')
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="p-6 md:p-8">
//             <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//                 <div className="mb-6">
//                     <h2 className="text-2xl font-semibold text-slate-800">Add Doctor</h2>
//                     <p className="mt-1 text-sm text-slate-500">Create a new doctor profile for the clinic.</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
//                     <div>
//                         <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
//                         <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
//                     </div>
//                     <div>
//                         <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
//                         <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
//                     </div>
//                     <div>
//                         <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
//                         <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
//                     </div>
//                     <div>
//                         <label className="mb-1 block text-sm font-medium text-slate-700">Speciality</label>
//                         <input name="speciality" value={form.speciality} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
//                     </div>
//                     <div>
//                         <label className="mb-1 block text-sm font-medium text-slate-700">Degree</label>
//                         <input name="degree" value={form.degree} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
//                     </div>
//                     <div>
//                         <label className="mb-1 block text-sm font-medium text-slate-700">Experience</label>
//                         <input name="experience" value={form.experience} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
//                     </div>
//                     <div>
//                         <label className="mb-1 block text-sm font-medium text-slate-700">Fees</label>
//                         <input type="number" name="fees" value={form.fees} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
//                     </div>
//                     <div>
//                         <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
//                         <input name="address" value={form.address} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
//                     </div>
//                     <div className="md:col-span-2">
//                         <label className="mb-1 block text-sm font-medium text-slate-700">About</label>
//                         <textarea name="about" value={form.about} onChange={handleChange} rows="4" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
//                     </div>
//                     <div className="md:col-span-2">
//                         <label className="mb-1 block text-sm font-medium text-slate-700">Doctor Image</label>
//                         <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full rounded-lg border border-dashed border-slate-300 px-3 py-3" />
//                     </div>

//                     {error ? <p className="md:col-span-2 text-sm text-red-600">{error}</p> : null}
//                     {message ? <p className="md:col-span-2 text-sm text-green-600">{message}</p> : null}

//                     <div className="md:col-span-2">
//                         <button type="submit" disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60">
//                             {loading ? 'Saving...' : 'Add Doctor'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default AddDoctor

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { assets } from "../../../../frontend/src/assets/assets_frontend/assets";
import { AdminContext } from "../../context/AdminContext";

const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
];

const experiences = Array.from(
    { length: 10 },
    (_, index) => `${index + 1} Year`
);

const AddDoctor = () => {
    const { backendUrl, aToken } = useContext(AdminContext);

    const [docImg, setDocImg] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        experience: "1 Year",
        fees: "",
        speciality: "General physician",
        degree: "",
        address1: "",
        address2: "",
        about: "",
    });

    const [loading, setLoading] = useState(false);

    // --------------------------------------------------
    // Image Preview
    // --------------------------------------------------
    useEffect(() => {
        if (!docImg) {
            setImagePreview("");
            return;
        }

        const objectUrl = URL.createObjectURL(docImg);
        setImagePreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [docImg]);

    // --------------------------------------------------
    // Handle Input Changes
    // --------------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // --------------------------------------------------
    // Handle Image
    // --------------------------------------------------
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Check file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image.");
            return;
        }

        // Maximum 5MB
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB.");
            return;
        }

        setDocImg(file);
    };

    // --------------------------------------------------
    // Reset Form
    // --------------------------------------------------
    const resetForm = () => {
        setDocImg(null);

        setFormData({
            name: "",
            email: "",
            password: "",
            experience: "1 Year",
            fees: "",
            speciality: "General physician",
            degree: "",
            address1: "",
            address2: "",
            about: "",
        });
    };

    // --------------------------------------------------
    // Submit Form
    // --------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!docImg) {
            toast.error("Please upload doctor image.");
            return;
        }

        if (!backendUrl) {
            toast.error("Backend URL is not configured.");
            return;
        }

        if (!aToken) {
            toast.error("Admin authentication token is missing.");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name.trim());
            data.append("email", formData.email.trim());
            data.append("password", formData.password);
            data.append("experience", formData.experience);
            data.append("fees", formData.fees);
            data.append("speciality", formData.speciality);
            data.append("degree", formData.degree.trim());
            data.append(
                "address",
                JSON.stringify({
                    line1: formData.address1.trim(),
                    line2: formData.address2.trim(),
                })
            );
            data.append("about", formData.about.trim());

            // IMPORTANT:
            // Your backend is expecting "image"
            data.append("image", docImg);

            // Debug - check data before sending
            console.log("Doctor Form Data:");

            for (const [key, value] of data.entries()) {
                console.log(key, value);
            }

            const response = await axios.post(
                backendUrl + '/api/admin/add-doctor',
                data,
                {
                    headers: {
                        atoken: aToken,
                    },
                }
            );

            if (response.data.success) {
                toast.success(
                    response.data.message || "Doctor added successfully!"
                );
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('1 Year')
                setFees('')
                setSpeciality('General physician')
                setDegree('')
                setAddress1('')
                setAddress2('')
                setAbout('')

                resetForm();
            } else {
                toast.error(
                    response.data.message || "Failed to add doctor."
                );
            }
        } catch (error) {
            console.error("Add Doctor Error:", error);

            toast.error(
                error.response?.data?.message ||
                    "Something went wrong while adding doctor."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-6xl p-4 sm:p-5"
        >
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Add Doctor
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Add a new doctor to your medical system.
                </p>
            </div>

            {/* Main Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-8">

                {/* Doctor Image */}
                <div className="flex items-center gap-5 mb-8">
                    <label
                        htmlFor="doctor-image"
                        className="cursor-pointer"
                    >
                        <img
                            src={
                                imagePreview
                                    ? imagePreview
                                    : assets.upload_area
                            }
                            alt="Doctor"
                            className="w-24 h-24 object-cover rounded-full bg-gray-100 border border-gray-200"
                        />
                    </label>

                    <input
                        type="file"
                        id="doctor-image"
                        name="image"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleImageChange}
                        hidden
                    />

                    <div>
                        <p className="text-base font-medium text-gray-700">
                            Upload doctor picture
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                            JPG, JPEG, PNG or WEBP
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                            Maximum size: 5MB
                        </p>
                    </div>
                </div>

                {/* Doctor Information */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        Doctor Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {/* Doctor Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Doctor Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter doctor name"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Doctor Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter doctor email"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Doctor Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                minLength={8}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <label
                                htmlFor="experience"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Experience
                            </label>

                            <select
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            >
                                {experiences.map((experience) => (
                                    <option
                                        key={experience}
                                        value={experience}
                                    >
                                        {experience}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Fees */}
                        <div>
                            <label
                                htmlFor="fees"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Consultation Fees
                            </label>

                            <input
                                id="fees"
                                type="number"
                                name="fees"
                                value={formData.fees}
                                onChange={handleChange}
                                placeholder="Enter fees"
                                min="0"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Speciality */}
                        <div>
                            <label
                                htmlFor="speciality"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Speciality
                            </label>

                            <select
                                id="speciality"
                                name="speciality"
                                value={formData.speciality}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            >
                                {specialties.map((speciality) => (
                                    <option
                                        key={speciality}
                                        value={speciality}
                                    >
                                        {speciality}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Education */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <label
                                htmlFor="degree"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Education / Degree
                            </label>

                            <input
                                id="degree"
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                placeholder="e.g. MBBS, MD"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        Address
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Address 1 */}
                        <div>
                            <label
                                htmlFor="address1"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Address Line 1
                            </label>

                            <input
                                id="address1"
                                type="text"
                                name="address1"
                                value={formData.address1}
                                onChange={handleChange}
                                placeholder="Enter address"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Address 2 */}
                        <div>
                            <label
                                htmlFor="address2"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Address Line 2
                            </label>

                            <input
                                id="address2"
                                type="text"
                                name="address2"
                                value={formData.address2}
                                onChange={handleChange}
                                placeholder="City, State, Pincode"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* About Doctor */}
                <div className="mt-8">
                    <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        About Doctor
                    </label>

                    <textarea
                        id="about"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        placeholder="Write something about the doctor..."
                        rows={5}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                    />
                </div>

                {/* Add Doctor Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "Adding Doctor..." : "Add Doctor"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddDoctor;