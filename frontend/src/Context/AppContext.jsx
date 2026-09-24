import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "$";

    const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const [doctors, setDoctors] = useState([]);

    const [ token , setToken ] = useState(localStorage.getItem('token')? localStorage.getItem('token') : false)

    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(
                (backendUrl) + '/api/doctor/list'
            );

            console.log("Doctor API response:", data);

            if (data.success) {
                setDoctors(data.doctors || []);
            } else {
                toast.error(data.message || "Failed to fetch doctors");
            }
        } catch (error) {
            console.error(
                "Get doctors error:",
                error.response?.data || error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to fetch doctors"
            );
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(
                {backendUrl} + '/api/user/get-profile', 
                {
                    headers: {
                        token
                    }
                }
            );


            if (data.success) {
                setUserData(data.userData || {});
            } else {
                toast.error(data.message || "Failed to fetch profile");
            }
        } catch (error) {
            console.error(
                "Get profile error:",
                error.response?.data || error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to fetch profile"
            );
        }
    };





    
    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        backendUrl,
        getDoctorsData,
        token,
        setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData
    };

     
    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if(token){
            loadUserProfileData();
        }else{
            setUserData(false)
        }
       
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;


// 9:56