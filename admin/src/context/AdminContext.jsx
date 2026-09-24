import { useState, createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(
        localStorage.getItem("adminToken") || null
    );

    const backendUrl =
        import.meta.env.VITE_BACKEND_URL ||
        "http://localhost:4000";

    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const [dashboard, setDashboard] = useState(false)

    // =========================
    // GET ALL DOCTORS
    // =========================
    const getAllDoctors = async () => {
        if (!aToken) {
            toast.error("Admin token is missing");
            return;
        }

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/all-doctors`,
                {},
                {
                    headers: {
                        aToken: aToken,
                    },
                }
            );

            if (data.success) {
                setDoctors(data.doctors || []);
            } else {
                toast.error(
                    data.message || "Unable to get doctors"
                );
            }
        } catch (error) {
            console.error(
                "Get doctors error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to connect to the server"
            );
        }
    };

    // =========================
    // CHANGE DOCTOR AVAILABILITY
    // =========================
    const changeAvailability = async (docId) => {
        if (!docId) {
            toast.error("Doctor ID is missing");
            return;
        }

        if (!aToken) {
            toast.error("Admin token is missing");
            return;
        }

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/change-availability`,
                {
                    docId,
                },
                {
                    headers: {
                        aToken: aToken,
                    },
                }
            );

            if (data.success) {
                toast.success(
                    data.message ||
                    "Availability changed successfully"
                );

                await getAllDoctors();
            } else {
                toast.error(
                    data.message ||
                    "Failed to change availability"
                );
            }
        } catch (error) {
            console.error(
                "Change availability error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to change doctor availability"
            );
        }
    };

    // =========================
    // GET ALL APPOINTMENTS
    // =========================
    const getAllAppointments = async () => {
        if (!aToken) {
            toast.error("Admin token is missing");
            return;
        }

        try {
            const { data } = await axios.get(
                `${backendUrl}/api/admin/appointments`,
                {
                    headers: {
                        aToken: aToken,
                    },
                }
            );

            console.log("Appointments response:", data);

            if (data.success) {
                setAppointments(
                    data.appointments || []
                );
            } else {
                toast.error(
                    data.message ||
                    "Unable to get appointments"
                );
            }
        } catch (error) {
            console.error(
                "Get appointments error:",
                error
            );

            console.error(
                "Server response:",
                error.response?.data
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to get appointments"
            );

            // If token is invalid/expired
            if (error.response?.status === 401) {
                localStorage.removeItem("adminToken");
                setAToken(null);

                toast.error(
                    "Admin session expired. Please login again."
                );
            }
        }
    };



    const getDashData = async () => {
        if (!aToken) {
            setDashboard(null);
            return;
        }

        try {
            const { data } = await axios.get(
                `${backendUrl}/api/admin/dashboard`,
                { headers: { aToken } }
            );

            if (data.success) {
                setDashboard(data.dashData || {});
            } else {
                toast.error(data.message || "Unable to load dashboard data");
            }
        } catch (error) {
            console.error("Dashboard data error:", error);
            toast.error(error.response?.data?.message || error.message || "Unable to load dashboard data");
        }
    };

    // =========================
    // CONTEXT VALUE
    // =========================
    const value = {
        aToken,
        setAToken,
        backendUrl,

        doctors,
        getAllDoctors,
        changeAvailability,

        appointments,
        getAllAppointments,

        dashboard,
        getDashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;