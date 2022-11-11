const { StatusCodes } = require('http-status-codes');
const appointments=require('../models/Appointment');

const getAllAppointment=async(req,res)=>{
    const appointment = await appointments.find()
    res.status(StatusCodes.OK).json({total:appointment.length,appointment})
}


const searchAppointment =async(req,res)=>{
  const {search} = req.params
 // const appointment = await appointments.find(search)
 // res.json({msg:appointment})
 res.json({search})
}

module.exports={
  getAllAppointment,
  searchAppointment
}