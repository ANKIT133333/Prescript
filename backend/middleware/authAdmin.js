import jwt from "jsonwebtoken"

const authAdmin = async (req, res, next) => {
    try {

        const atoken = req.headers.atoken || req.headers.authorization?.replace(/^Bearer\s+/i, "");
        if (!atoken) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please log in again."
            })
        }


        const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);

        if (token_decoded.role !== "admin" || token_decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please log in again."
            })
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Invalid or expired admin token. Please log in again."
        })

    }
}

export default authAdmin