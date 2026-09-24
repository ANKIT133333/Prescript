import express from "express";
import { addDoctor , adminDashboard, allDoctors, appointmentsAdmin, loginAdmin} from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import {changeAvailability} from "../controllers/doctorController.js";


const adminRoute = express.Router();

adminRoute.post("/add-doctor",authAdmin,upload.single("image"),addDoctor)
adminRoute.post("/login",loginAdmin)
adminRoute.post("/all-doctors",authAdmin,allDoctors)
// adminRoute.post("/change-availability",authAdmin,changeAvailability)
adminRoute.post("/change-availability", changeAvailability);
adminRoute.get("/appointments",authAdmin,appointmentsAdmin)


adminRoute.get("/dashboard",authAdmin,adminDashboard)

export default adminRoute;