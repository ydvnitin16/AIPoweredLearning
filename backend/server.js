import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configs/mongoConfig.js';
import userRoute from './routes/userRoute.js';
import subjectRoute from './routes/subjectRoute.js';
import topicRoute from './routes/topicRoute.js';

dotenv.config();
connectDB();
const app = express();
app.use(
    cors({
        origin: process.env.CLIENTSERVER,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoute);
app.use('/', subjectRoute);
app.use('/', topicRoute);
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server running at http://localhost:3000');
});