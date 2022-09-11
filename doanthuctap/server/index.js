import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/users.js"
import videoRouter from "./routes/videos.js"
import commentRouter from "./routes/comments.js"
import authRouter from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
const connect = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connet to mongoose")
        })
        .catch((err) => {
            throw err;
        });
};

app.use(cors());
app.options('*',cors())

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/videos',videoRouter)
app.use('/api/comments',commentRouter)


app.listen(8080, () => {
    connect()
    console.log("conneted!a")
})

export default app;