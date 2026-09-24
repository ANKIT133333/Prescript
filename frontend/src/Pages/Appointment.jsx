import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../Context/AppContext";
import RelatedDoctors from "../Components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // Get doctor information
  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      setIsLoading(false);
      return;
    }

    const doctor = doctors.find((doc) => doc._id === docId);

    setDocInfo(doctor || null);
    setIsLoading(false);
  }, [docId, doctors]);

  // Generate appointment dates and times
  const slotDates = useMemo(() => {
    if (!docInfo) return [];

    const dates = [];

    const today = new Date();

    const timeSlots = [
      "03:00 pm",
      "03:30 pm",
      "04:00 pm",
      "04:30 pm",
      "05:00 pm",
      "05:30 pm",
    ];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);

      currentDate.setDate(today.getDate() + i);

      dates.push({
        dateObj: currentDate,

        day: currentDate
          .toLocaleDateString([], {
            weekday: "short",
          })
          .toUpperCase(),

        date: currentDate.getDate(),

        dateStr: currentDate.toDateString(),

        times: timeSlots,
      });
    }

    return dates;
  }, [docInfo]);

  // Get available times for selected date
  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];

    const selected = slotDates.find(
      (slot) => slot.dateStr === selectedDate
    );

    return selected?.times || [];
  }, [selectedDate, slotDates]);

  // Set first date and time automatically
  useEffect(() => {
    if (slotDates.length > 0) {
      setSelectedDate(slotDates[0].dateStr);
      setSelectedTime(slotDates[0].times[0]);
    }
  }, [slotDates]);



  // Book appointment
  const bookAppointment = async () => {
    // 1. Check login
    if (!token) {
      toast.error("Please login to book an appointment");
      navigate("/login");
      return;
    }

    // 2. Check doctor
    if (!docId) {
      toast.error("Doctor ID is missing");
      return;
    }

    if (!docInfo) {
      toast.error("Doctor information is not available");
      return;
    }

    // 3. Check date and time
    if (!selectedDate) {
      toast.error("Please select an appointment date");
      return;
    }

    if (!selectedTime) {
      toast.error("Please select an appointment time");
      return;
    }

    try {
      // 4. Find selected date
      const selectedSlot = slotDates.find(
        (slot) => slot.dateStr === selectedDate
      );

      if (!selectedSlot) {
        toast.error("Invalid appointment date");
        return;
      }

      // 5. Format date as DD-MM-YYYY
      const date = selectedSlot.dateObj;

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const slotDate = `${day}-${month}-${year}`;

      // 6. Use the selected time directly
      const slotTime = selectedTime;

      // 7. Prepare appointment data
      const appointmentData = {
        docId,
        slotDate,
        slotTime,
      };

      console.log("📅 Booking appointment:", appointmentData);

      // 8. Send request to backend
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        appointmentData,
        {
          headers: {
            token,
          },
        }
      );

      console.log("✅ Booking response:", data);

      // 9. Handle backend response
      if (!data.success) {
        toast.error(
          data.message || "Unable to book appointment"
        );
        return;
      }

      // 10. Show success message
      toast.success(
        data.message || "Appointment booked successfully!"
      );

      // 11. Refresh doctor data
      try {
        await getDoctorsData();
      } catch (refreshError) {
        console.error(
          "Doctor data refresh error:",
          refreshError
        );
      }

      // 12. Navigate after showing toast
      setTimeout(() => {
        navigate("/my-appointment");
      }, 1200);

    } catch (error) {
      console.error("❌ Booking Error:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while booking appointment";

      toast.error(message);
    }
  };
  // Loading
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-600">
        Loading doctor profile...
      </div>
    );
  }









  // Doctor not found
  if (!docInfo) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-600">
        Doctor not found.
      </div>
    );
  }











  return (
    <div className="max-w-6xl mx-auto px-2 py-6">
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Doctor Card */}
        <div className="w-full lg:w-[320px] bg-gradient-to-br from-blue-50 to-white p-4 rounded-2xl shadow-sm border border-blue-100">
          <img
            className="w-full h-80 object-cover rounded-xl"
            src={docInfo.image}
            alt={docInfo.name}
          />

          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              Available
            </span>

            <p className="mt-3 text-lg font-semibold text-gray-900">
              {docInfo.name}
            </p>

            <p className="text-sm text-gray-600">
              {docInfo.degree} • {docInfo.speciality}
            </p>

            <p className="mt-2 flex items-center gap-2 text-sm text-blue-600">
              <img
                className="w-4"
                src={assets.verified_icon}
                alt="Verified"
              />

              Verified specialist
            </p>
          </div>
        </div>

        {/* Appointment Section */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

          {/* Doctor Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {docInfo.name}
              </h1>

              <p className="text-sm text-gray-600 mt-1">
                {docInfo.degree} - {docInfo.speciality}
              </p>
            </div>

            <div className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {docInfo.experience}
            </div>
          </div>

          {/* About */}
          <div className="mt-6">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <img
                className="w-4"
                src={assets.info_icon}
                alt="About"
              />

              About
            </div>

            <p className="mt-2 text-sm leading-6 text-gray-600 max-w-2xl">
              {docInfo.about}
            </p>
          </div>

          {/* Consultation Fee */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-900">
                Consultation Fee
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                {currencySymbol}
                {docInfo.fees}
              </p>
            </div>
          </div>

          {/* Booking Slots */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-900">
              Booking Slots
            </p>

            {/* Date Selection */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {slotDates.map((slot) => (
                <button
                  type="button"
                  key={slot.dateStr}
                  onClick={() => {
                    setSelectedDate(slot.dateStr);
                    setSelectedTime(slot.times[0]);
                  }}
                  className={`flex flex-col items-center justify-center rounded-full px-4 py-3 whitespace-nowrap transition ${selectedDate === slot.dateStr
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <span className="text-xs font-medium">
                    {slot.day}
                  </span>

                  <span className="text-sm font-semibold">
                    {slot.date}
                  </span>
                </button>
              ))}
            </div>

            {/* Time Selection */}
            <div className="mt-4 flex flex-wrap gap-2">
              {availableTimes.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${selectedTime === time
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={bookAppointment}
              disabled={isBooking}
              className={`px-6 py-3 rounded-full text-white transition ${isBooking
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isBooking ? "Booking..." : "Book Appointment"}
            </button>

            <button
              type="button"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition"
            >
              Call Clinic
            </button>
          </div>
        </div>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors
        docId={docId}
        speciality={docInfo.speciality}
      />
    </div>
  );
};

export default Appointment;