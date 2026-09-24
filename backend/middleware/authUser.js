// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//     try {
//         // Get token from headers
//         const token = req.headers.token;

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Not authorized. Please login again."
//             });
//         }

//         // Verify token
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         // Save user ID for next controller
//         req.userId = decoded._id;

//         next();

//     } catch (error) {
//         console.log("AUTH ERROR:", error);

//         return res.status(401).json({
//             success: false,
//             message: "Invalid or expired token. Please login again."
//         });
//     }
// };

// export default authUser;


// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//     try {
//         const { token } = req.headers;

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "No token provided. Please login again",
//             });
//         }

//         const token_decode = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         console.log("Decoded Token:", token_decode);

//         // Get user ID from token
//         const userId = token_decode._id;

//         if (!userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid token: user ID not found",
//             });
//         }

//         req.userId = userId;

//         console.log("Authenticated User ID:", req.userId);

//         next();

//     } catch (error) {
//         console.log("AUTH ERROR:", error.message);

//         return res.status(401).json({
//             success: false,
//             message: "Invalid token",
//         });
//     }
// };

// export default authUser;

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Login Again",
            });
        }

        const token_decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = token_decode._id;

        next();

    } catch (error) {
        console.log("Auth Error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};

export default authUser;