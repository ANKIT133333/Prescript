// API for adding doctor

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      address1,
      address2,
    } = req.body;

    const imageFile = req.file;
    const addressValue = address ||
      (address1 || address2
        ? JSON.stringify({ line1: address1, line2: address2 })
        : "");

    // Check all required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      fees === undefined ||
      fees === null ||
      fees === "" ||
      !addressValue ||
      !imageFile
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const numericFees = Number(fees);
    if (!Number.isFinite(numericFees) || numericFees < 0) {
      return res.status(400).json({
        success: false,
        message: "Fees must be a valid number.",
      });
    }

    let parsedAddress;
    try {
      parsedAddress = JSON.parse(addressValue);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Address must be valid JSON.",
      });
    }

    if (!parsedAddress.line1 || !parsedAddress.line2) {
      return res.status(400).json({
        success: false,
        message: "Both address lines are required.",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      width: 300,
      height: 300,
      crop: "scale",
    });

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: numericFees,
      address: parsedAddress,
      image: imageUpload.secure_url,
      date: Date.now(),
      available: true,
    };

    const newDoctor = new doctorModel(doctorData);

    await newDoctor.save();

    return res.status(201).json({
      success: true,
      message: "Doctor added successfully.",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("Add Doctor Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// api for admin login 



const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;



    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          email: email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });

  } catch (error) {
    console.log("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export default loginAdmin;


const allDoctors = async (req, res) => {

  try {

    const doctors = await doctorModel.find({}).select("-password");
    res.json({
      success: true,
      message: "Doctors fetched successfully",
      doctors,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });

  }

}


// APi to get all appointment 

const appointmentsAdmin = async (req, res) => {

  try {

    const appointments = await appointmentModel.find({})
    res.json({
      success: true,
      message: "Appointments fetched successfully",
      appointments
    })

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })

  }

}


// API to get dashboard data for admin panel 


const adminDashboard = async (req, res) => {

  try {

    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointment: [...appointments].reverse().slice(0, 5)
    };
    res.json({
      success: true,
      message: "Dashboard data fetched successfully",
      dashData
    })

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })

  }

}

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, adminDashboard };