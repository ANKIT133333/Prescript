import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
// import cancel_icon from "../assets/cancel_icon.png";

const Allappointment = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  const getStatusBadge = (item) => {
    if (item.cancelled) {
      return "bg-red-100 text-red-600 border border-red-200";
    }

    if (item.isCompleted) {
      return "bg-green-100 text-green-600 border border-green-200";
    }

    return "bg-blue-100 text-blue-600 border border-blue-200";
  };

  const getStatusText = (item) => {
    if (item.cancelled) return "Cancelled";
    if (item.isCompleted) return "Completed";
    return "Upcoming";
  };

  return (
    <div className="w-full max-w-7xl p-4 sm:p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-lg font-semibold text-gray-800">All Appointments</p>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
          {appointments?.length || 0} total
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="hidden md:grid md:grid-cols-[50px_2fr_80px_2fr_2fr_100px_120px] md:items-center md:gap-4 md:border-b md:border-gray-200 md:bg-gray-50 md:px-6 md:py-4 md:text-sm md:font-semibold md:text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => {
            const patient = item.userData || {};
            const doctor = item.docData || {};

            return (
              <div
                key={item._id || `${item.userId}-${index}`}
                className="grid grid-cols-1 gap-3 border-b border-gray-200 px-4 py-4 text-sm last:border-b-0 md:grid-cols-[50px_2fr_80px_2fr_2fr_100px_120px] md:items-center md:gap-4 md:px-6"
              >
                <p className="text-gray-600 md:text-gray-700">
                  <span className="font-semibold text-gray-500 md:hidden"># </span>
                  {index + 1}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                    {(patient.name || "P").charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {patient.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {patient.email || "No email"}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600">
                  {patient.dob ? calculateAge(patient.dob) : "N/A"}
                </p>

                <div>
                  <p className="text-gray-800">{item.slotDate || "N/A"}</p>
                  <p className="text-gray-500">{item.slotTime || "N/A"}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                    {(doctor.name || "D").charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {doctor.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {doctor.speciality || "General"}
                    </p>
                  </div>
                </div>

                <p className="font-medium text-gray-800">₹{item.amount || 0}</p>

                <div>
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(item)}`}>
                    {getStatusText(item)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-gray-500">No appointments found</div>
        )}
      </div>
    </div>
  );
};

const calculateAge = (dob) => {
  if (!dob) return "N/A";

  const birthDate = new Date(dob);

  if (Number.isNaN(birthDate.getTime())) {
    return "N/A";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};

export default Allappointment;