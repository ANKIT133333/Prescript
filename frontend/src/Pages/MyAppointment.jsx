import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [showReschedule, setShowReschedule] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [loading, setLoading] = useState(false);

    const getUserAppointment = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(
                `${backendUrl}/api/user/appointments`,
                {
                    headers: { token },
                }
            );

            if (data.success) {
                setAppointments(data.appointments || []);
            } else {
                toast.error(data.message || "Unable to get appointments");
            }
        } catch (error) {
            console.error("Get Appointment Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong while getting appointments"
            );
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/cancel-appointment`,
                { appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getUserAppointment();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Cancel Appointment Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to cancel appointment"
            );
        }
    };



    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Prescript",
            description: "Appointment Payment",
            order_id: order.id,

            handler: async (response) => {
                console.log("Payment Response:", response);

                try {

                    const { data } = await axios.post(
                        (backendUrl) + '/api/user/verifyRazorpay',
                        {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                        { headers: { token } }
                    );

                    if (data.success) {
                        toast.success(data.message);
                        getUserAppointment();
                        window.location.href = '/my-appointment';
                    } else {
                        toast.error(data.message);
                    }

                    console.log(
                        "Payment Verification Response:",
                        data

                    )
                } catch (error) {

                }
            },

            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                (backendUrl) + '/api/user/payment-razorpay',
                { appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                initPay(data.order);
                console.log("Razorpay Order:", data.order);

                // Razorpay payment code will go here
            } else {
                toast.error(data.message || "Unable to create payment order");
            }

        } catch (error) {
            console.error("Razorpay Payment Error:", error);

            toast.error(
                error.response?.data?.message ||
                "Unable to create payment order"
            );
        }
    };


    useEffect(() => {
        if (token) {
            getUserAppointment();
        }
    }, [token]);

    const handleReschedule = (appointmentId) => {
        if (!newDate || !newTime) {
            toast.error("Please select date and time");
            return;
        }

        setAppointments((prev) =>
            prev.map((appointment) =>
                appointment._id === appointmentId
                    ? {
                        ...appointment,
                        slotDate: newDate,
                        slotTime: newTime,
                    }
                    : appointment
            )
        );

        setShowReschedule(null);
        setNewDate("");
        setNewTime("");

        toast.success("Appointment rescheduled");
    };

    const getAppointmentStatus = (appointment) => {
        if (appointment.cancelled) {
            return "Cancelled";
        }

        return appointment.status || "Upcoming";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Upcoming":
                return "bg-blue-50 border-blue-200";
            case "Completed":
                return "bg-green-50 border-green-200";
            case "Cancelled":
                return "bg-red-50 border-red-200";
            default:
                return "bg-gray-50 border-gray-200";
        }
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "Upcoming":
                return "bg-blue-100 text-blue-700";
            case "Completed":
                return "bg-green-100 text-green-700";
            case "Cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Date not available";

        const parts = dateString.split("-");

        if (parts.length === 3) {
            const [day, month, year] = parts;

            const date = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );

            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                });
            }
        }

        return dateString;
    };

    return (
        <div className="py-12 px-4 max-w-6xl mx-auto">

            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    My Appointments
                </h1>

                <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
            </div>

            {loading ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-600 text-lg">
                        Loading appointments...
                    </p>
                </div>
            ) : appointments.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-600 text-lg">
                        No appointments found
                    </p>
                </div>
            ) : (
                <div className="space-y-6">

                    {appointments.map((appointment) => {
                        const doctor = appointment.docData || {};
                        const status = getAppointmentStatus(appointment);

                        return (
                            <div
                                key={appointment._id}
                                className={`border-2 rounded-lg p-6 transition ${getStatusColor(
                                    status
                                )}`}
                            >
                                <div className="flex flex-col lg:flex-row gap-6 items-start">

                                    <div className="flex-shrink-0">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name || "Doctor"}
                                            className="w-32 h-32 rounded-lg object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">

                                        <div className="flex items-start justify-between mb-4 gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {doctor.name || "Doctor"}
                                                </h3>

                                                <p className="text-gray-600">
                                                    {doctor.speciality ||
                                                        "Speciality not available"}
                                                </p>
                                            </div>

                                            <span
                                                className={`px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusBadgeColor(
                                                    status
                                                )}`}
                                            >
                                                {status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={assets.verified_icon}
                                                    alt="Date"
                                                    className="w-4 h-4"
                                                />

                                                <span className="text-gray-700">
                                                    {formatDate(
                                                        appointment.slotDate
                                                    )}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={assets.info_icon}
                                                    alt="Time"
                                                    className="w-4 h-4"
                                                />

                                                <span className="text-gray-700">
                                                    {appointment.slotTime ||
                                                        "Time not available"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={assets.arrow_icon}
                                                    alt="Fee"
                                                    className="w-4 h-4"
                                                />

                                                <span className="text-gray-700">
                                                    Consultation Fee: $
                                                    {appointment.amount ||
                                                        doctor.fees ||
                                                        0}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={assets.chats_icon}
                                                    alt="Address"
                                                    className="w-4 h-4"
                                                />

                                                <span className="text-gray-700">
                                                    {doctor.address
                                                        ? `${doctor.address.line1 || ""}, ${doctor.address.line2 || ""}`
                                                        : "Address not available"}
                                                </span>
                                            </div>
                                        </div>

                                        {showReschedule === appointment._id &&
                                            status === "Upcoming" && (
                                                <div className="bg-white p-4 rounded-lg border border-gray-300 mb-4 space-y-3">

                                                    <h4 className="font-semibold text-gray-900">
                                                        Reschedule Appointment
                                                    </h4>

                                                    <div className="flex flex-col sm:flex-row gap-3">

                                                        <input
                                                            type="date"
                                                            value={newDate}
                                                            onChange={(e) =>
                                                                setNewDate(
                                                                    e.target.value
                                                                )
                                                            }
                                                            min={
                                                                new Date()
                                                                    .toISOString()
                                                                    .split("T")[0]
                                                            }
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                                                        />

                                                        <select
                                                            value={newTime}
                                                            onChange={(e) =>
                                                                setNewTime(
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                                                        >
                                                            <option value="">
                                                                Select Time
                                                            </option>
                                                            <option value="09:00 am">
                                                                09:00 am
                                                            </option>
                                                            <option value="10:00 am">
                                                                10:00 am
                                                            </option>
                                                            <option value="11:00 am">
                                                                11:00 am
                                                            </option>
                                                            <option value="02:00 pm">
                                                                02:00 pm
                                                            </option>
                                                            <option value="03:00 pm">
                                                                03:00 pm
                                                            </option>
                                                            <option value="04:00 pm">
                                                                04:00 pm
                                                            </option>
                                                        </select>

                                                        <button
                                                            onClick={() =>
                                                                handleReschedule(
                                                                    appointment._id
                                                                )
                                                            }
                                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap"
                                                        >
                                                            Confirm
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setShowReschedule(
                                                                    null
                                                                );
                                                                setNewDate("");
                                                                setNewTime("");
                                                            }}
                                                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition font-semibold whitespace-nowrap"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                    </div>


                                    <div className="flex flex-col gap-2 w-full sm:w-auto">

                                        {/* Upcoming Appointment */}
                                        {status === "Upcoming" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        setShowReschedule(appointment._id)
                                                    }
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm whitespace-nowrap"
                                                >
                                                    Reschedule
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        cancelAppointment(appointment._id)
                                                    }
                                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold text-sm whitespace-nowrap"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}

                                        {/* Completed Appointment */}
                                        {status === "Completed" && (
                                            <button
                                                disabled
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-not-allowed font-semibold text-sm"
                                            >
                                                Completed
                                            </button>
                                        )}

                                        {/* Cancelled Appointment */}
                                        {appointment.cancelled && (
                                            <button
                                                disabled
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-not-allowed font-semibold text-sm"
                                            >
                                                Cancelled Appoitment
                                            </button>
                                        )}

                                        {/* Pay Online */}
                                        {!appointment.cancelled && status === "Upcoming" && (
                                            <button
                                                onClick={() => appointmentRazorpay(appointment._id)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm whitespace-nowrap"
                                            >
                                                Pay Online
                                            </button>
                                        )}


                                        {!appointment.cancelled && !appointment.payment && (
                                            <button
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm whitespace-nowrap"
                                            >
                                                Payment success
                                            </button>
                                        )}

                                    </div>


                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyAppointment;






// 12 14