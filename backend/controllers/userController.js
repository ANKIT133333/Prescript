import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Razorpay from "razorpay";


// API to create new user
const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            address,
            gender,
            phone,
            dob
        } = req.body;

        const normalizedEmail = String(email || "").trim().toLowerCase();

        // Check required fields
        if (!name || !normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        // Allow optional address fields for the current signup form
        const safeAddress = address || {
            line1: "",
            line2: ""
        };

        // Validate email
        if (!validator.isEmail(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await userModel.create({
            name,
            email: normalizedEmail,
            password: hashpassword,
            address: safeAddress,
            gender,
            phone,
            dob
        });

        // Create token
        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.JWT_SECRET
        );

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// API to login user


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // Find user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                _id: user._id.toString()
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// Api to get user profile data
const getProfile = async (req, res) => {
    try {
        const userData = await userModel
            .findById(req.userId)
            .select("-password");

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            userData
        });

    } catch (error) {
        console.log("PROFILE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Api to update user profiles data

const updateProfile = async (req, res) => {
    try {
        const { userId, name, address, dob, gender, phone } = req.body;
        const imageFile = req.file;

        // Required fields
        if (!userId || !name || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Required data is missing"
            });
        }

        // Parse address safely
        let parsedAddress = {};

        if (address) {
            try {
                parsedAddress =
                    typeof address === "string"
                        ? JSON.parse(address)
                        : address;
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid address format"
                });
            }
        }

        // Update basic profile information
        await userModel.findByIdAndUpdate(
            userId,
            {
                name,
                address: parsedAddress,
                dob,
                gender,
                phone
            },
            { new: true }
        );

        // Upload profile image if provided
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(
                imageFile.path,
                {
                    resource_type: "image"
                }
            );

            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(
                userId,
                {
                    image: imageUrl
                },
                { new: true }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.log("PROFILE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// book the appointment of doctor 


const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { docId, slotDate, slotTime } = req.body;

        console.log("userId:", userId);
        console.log("docId:", docId);
        console.log("slotDate:", slotDate);
        console.log("slotTime:", slotTime);

        if (!userId || !docId || !slotDate || !slotTime) {
            return res.status(400).json({
                success: false,
                message: "Missing required appointment details",
            });
        }

        const docData = await doctorModel
            .findById(docId)
            .select("-password");

        if (!docData) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        if (!docData.available) {
            return res.status(400).json({
                success: false,
                message: "Doctor is not available",
            });
        }

        const slots_booked = docData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({
                    success: false,
                    message: "This time slot is already booked",
                });
            }

            slots_booked[slotDate].push(slotTime);
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel
            .findById(userId)
            .select("-password");

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            slotDate,
            slotTime,
            amount: docData.fees,
            date: Date.now(),
        };

        const newAppointment =
            new appointmentModel(appointmentData);

        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, {
            slots_booked,
        });

        return res.status(200).json({
            success: true,
            message: "Appointment booked successfully",
        });

    } catch (error) {
        console.log("Book Appointment Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// API to get appointment profile data from frontend page 


const listAppointments = async (req, res) => {
    try {
        // Get user ID from authUser middleware
        const userId = req.userId;

        console.log("List Appointments User ID:", userId);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        // Find all appointments of logged-in user
        const appointments = await appointmentModel
            .find({ userId })
            .sort({ date: -1 });

        console.log("Appointments:", appointments);

        return res.status(200).json({
            success: true,
            appointments,
        });

    } catch (error) {
        console.error("List Appointments Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// APi to cancel the appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        // Get logged-in user from auth middleware
        const userId = req.userId;

        console.log("Cancel Appointment Request:");
        console.log("userId:", userId);
        console.log("appointmentId:", appointmentId);

        // Check required data
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        if (!appointmentId) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID is required",
            });
        }

        // Find appointment
        const appointmentData = await appointmentModel.findById(
            appointmentId
        );

        // Check appointment exists
        if (!appointmentData) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        // Verify appointment belongs to logged-in user
        if (
            appointmentData.userId.toString() !==
            userId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to cancel this appointment",
            });
        }

        // Check if already cancelled
        if (appointmentData.cancelled) {
            return res.status(400).json({
                success: false,
                message: "Appointment is already cancelled",
            });
        }

        // Mark appointment as cancelled
        appointmentData.cancelled = true;

        await appointmentData.save();

        // Release doctor slot
        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        if (doctorData) {
            let slots_booked = doctorData.slots_booked || {};

            if (slots_booked[slotDate]) {
                slots_booked[slotDate] =
                    slots_booked[slotDate].filter(
                        (time) => time !== slotTime
                    );
            }

            await doctorModel.findByIdAndUpdate(
                docId,
                {
                    slots_booked: slots_booked,
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
        });

    } catch (error) {
        console.log("Cancel Appointment Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// razary payment

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        console.log("Appointment ID:", appointmentId);

        if (!appointmentId) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID is required",
            });
        }

        const appointmentData =
            await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        if (appointmentData.cancelled) {
            return res.status(400).json({
                success: false,
                message: "Appointment is cancelled",
            });
        }

        if (!appointmentData.amount || appointmentData.amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment amount",
            });
        }

        const options = {
            amount: Math.round(appointmentData.amount * 100),
            currency: process.env.CURRENCY || "INR",
            receipt: appointmentId.toString(),
        };

        console.log("Razorpay Options:", options);

        const order = await razorpayInstance.orders.create(options);

        console.log("Razorpay Order:", order);

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        console.error("Razorpay Payment Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Payment order creation failed",
        });
    }
};


// Api to verify razorpay payment

const verifyRazorpay = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        } = req.body;

        console.log("Payment ID:", razorpay_payment_id);
        console.log("Order ID:", razorpay_order_id);
        console.log("Signature:", razorpay_signature);

        // Check required payment details
        if (
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment details are missing",
            });
        }

        // Verify Razorpay signature
        const secret = process.env.RAZORPAY_KEY_SECRET;

        const payload =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(payload)
            .digest("hex");

        if (razorpay_signature !== expectedSignature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

        // Get Razorpay order
        const orderInfo =
            await razorpayInstance.orders.fetch(razorpay_order_id);

        console.log("Razorpay Order:", orderInfo);

        // Get appointment ID from receipt
        const appointmentId = orderInfo.receipt;

        console.log("Appointment ID:", appointmentId);

        if (!appointmentId) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID not found in Razorpay order",
            });
        }

        // Find appointment
        const appointmentData =
            await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        // Check cancelled appointment
        if (appointmentData.cancelled) {
            return res.status(400).json({
                success: false,
                message: "Appointment is cancelled",
            });
        }

        // Mark payment as completed
        await appointmentModel.findByIdAndUpdate(
            appointmentId,
            {
                payment: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        });

    } catch (error) {
        console.error("Razorpay Verification Error:", error);

        return res.status(500).json({
            success: false,
            message:
                error.message || "Payment verification failed",
        });
    }
};
export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointments,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay


};