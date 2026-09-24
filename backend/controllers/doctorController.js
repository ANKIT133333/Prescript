import doctorModel from "../models/doctorModel.js";

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");

        return res.status(200).json({
            success: true,
            doctors,
        });
    } catch (error) {
        console.error("Doctor list error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch doctors",
        });
    }
};

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body || {};

        if (!docId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID is required",
            });
        }

        const doctor = await doctorModel.findById(docId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        await doctorModel.findByIdAndUpdate(docId, {
            available: !doctor.available,
        });

        return res.status(200).json({
            success: true,
            message: "Availability changed successfully",
        });
    } catch (error) {
        console.error("Change availability error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to change availability",
        });
    }
};

export {
    doctorList,
    changeAvailability,
};


changeAvailability