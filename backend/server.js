import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import connectDB from './configs/mongoConfig.js';
import userRoute from './routes/userRoute.js';
import subjectRoute from './routes/subjectRoute.js';
import topicRoute from './routes/topicRoute.js'

dotenv.config();
connectDB();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/', userRoute);
app.use('/', subjectRoute);
app.use('/', topicRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server running at http://localhost:3000');
});
