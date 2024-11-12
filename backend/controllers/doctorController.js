import doctorModel from "../models/doctorModel.js"

const changeAvailability = async(req,res)=>{
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({
            success:true,
            message:'Availability Changed'
        })
    } catch (error) {
        res.json({success:false,message:error})
        console.log(error)
    }
}

export {changeAvailability}