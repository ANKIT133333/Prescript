import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
    const {
        doctors = [],
        aToken,
        getAllDoctors,
        changeAvailability,
    } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken, getAllDoctors]);

    return (
        <div className="w-full p-4 sm:p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">
                    All Doctors
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage all registered doctors
                </p>
            </div>

            {/* Doctor List */}
            {doctors.length === 0 ? (
                <div className="rounded-lg border bg-white p-8 text-center">
                    <p className="text-gray-500">
                        No doctors found.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {doctors.map((doctor, index) => (
                        <div
                            key={doctor._id || index}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                        >
                            {/* Doctor Image */}
                            <div className="h-56 w-full bg-gray-100">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name || "Doctor"}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://via.placeholder.com/300x300?text=Doctor";
                                    }}
                                />
                            </div>

                            {/* Doctor Information */}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {doctor.name || "Unknown Doctor"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {doctor.speciality ||
                                        "Specialty not available"}
                                </p>

                                {/* Availability */}
                                <label className="mt-4 flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(doctor.available)}
                                        onChange={() =>
                                        changeAvailability(doctor._id)
                                        }
                                        className="h-4 w-4 cursor-pointer accent-blue-600"
                                    />

                                    <span
                                        className={`text-sm font-medium ${
                                            doctor.available
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {doctor.available
                                            ? "Available"
                                            : "Not Available"}
                                    </span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorList;