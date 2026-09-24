import express from 'express';

import connectDB from './config/mongodb.js';
import cors from 'cors';
import 'dotenv/config';
import connectCloudinary from './config/cloudinary.js';
import adminRoute from './routes/adminRoute.js';
import doctorRoute from './routes/doctorRoute.js';
import userRoute from './routes/userRoute.js';

// app config 

const app = express()
const port = process.env.PORT || 4000

// middlewares

app.use(express.json())
app.use(cors())

// api endpoint

app.use('/api/admin',adminRoute)
app.use('/api/doctor',doctorRoute)
app.use('/api/user',userRoute)



// app listen 

connectDB()
connectCloudinary()
    .then(() => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });