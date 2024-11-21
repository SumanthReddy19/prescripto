import validator from "validator";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
//API for adding doctor

const addDoctor = async(req,res)=>{
    try{
        const {name,email,password,speciality,degree,experience, about,fees,address} = req.body;
        const imageFile = req.file

        //checking all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({
                success:false,
                message:'Missing data'
            })
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:'Pls enter a valid email'
            })
        }

        // validating strong password
        if(password.length < 8){
            return res.json({
                success:false,
                message:'Pls enter a strong password of more than 8 characters'
            })
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url;

        const doctordData = {
            name,email,image:imageUrl,password:hashedPassword,speciality,degree,experience,about,fees,address:JSON.parse(address),date:Date.now()
        }

        const newDoctor = new doctorModel(doctordData)
        await newDoctor.save()
        res.json({success:true,message:"Doctor Added"})
        }
    catch(error){
       res.json({success:false,message:error.message})
    }
}

const loginAdmin = async (req,res) => {
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({
                success:true,
                token
            })
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//API to get all doctors list to admin panel

const allDoctors = async(req,res)=>{
try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({success:true,length:doctors.length,doctors})
} catch (error) {
    res.json({success:false,message:error})
    console.log(error)
}
}

//API to get all appointments list
const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({
            success:true,appointments
        })
    } catch (error) {
        res.json({success:false,message:error})
        console.log(error)
    }
}

//API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get dashboard data for admin panel
const adminDashboard = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({
            success:true,
            dashData
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}