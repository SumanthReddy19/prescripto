import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

const app = express()
const port = process.env.PORT || 4005
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api end point
app.use('/api/admin',adminRouter)

app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port,()=>console.log("Server started", port))