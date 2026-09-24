import express from "express";
import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointments,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/signup", registerUser);
userRoute.post("/login", loginUser);

userRoute.post('/update-profile', upload.single("image"), authUser, updateProfile)


userRoute.get("/get-profile", authUser, getProfile);
userRoute.post(
    "/book-appointment",
    authUser,
    bookAppointment
);


userRoute.get("/appointments", authUser, listAppointments)
userRoute.post(
    "/cancel-appointment",
    authUser,
    cancelAppointment
);

userRoute.post(
    "/payment-razorpay",
    authUser,
    paymentRazorpay
);

userRoute.post(
    '/verifyRazorpay',
    authUser,
    verifyRazorpay
)

export default userRoute;


