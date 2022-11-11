
const appointments=require('../models/Appointment');
const Profile =require("../models/UserProfile")
const { StatusCodes } = require('http-status-codes');
const sendMessageNotification =require("../utils/MessageNotification")
const {BadRequestError,UnauthenticatedError,NotFoundError}=require('../errors');
const {
  DateFunction,
  sendMessage
} =require("../utils/Notification")
const cron=require("cron").CronJob




const postAppointment=async(req,res)=>{
    req.body.createdBy=req.user.userId
    const appointment=await appointments.create(
      req.body
    )
    res.status(StatusCodes.CREATED).json({appointment})
}
    

const getAppointments=async(req,res)=>{
   const appointment=await appointments.find({createdBy:req.user.userId})
   res.status(StatusCodes.OK).json({total:appointment.length,appointment:appointment})
}


const updateAppointment=async(req,res)=>{
    const {
    user: { userId },
    params: { id: appointmentId },
    } = req
    const appointment=await appointments.findOne({
      _id:appointmentId,
      createdBy:userId
    })
      res.json({msg:"update appointment",appointment})
}

const cancelAppointment=async(req,res)=>{
    const {
    user: { userId },
    params: { id: appointmentId },
    } = req
   const appointment = await appointments.findOne({
    _id: appointmentId,
    createdBy: userId,
  })
  const user = await Profile.findOne({userId})
    sendMessageNotification({
      name:user.firstname,
      email:user.email,
      date:appointment.date
    })
  if(!appointment){
    throw new NotFoundError(`No appointment was found`)
  }
   appointment.status="canceled"
   await appointment.save()
  res.status(StatusCodes.OK).json({msg:"appointment has been canceled"})
}


 

module.exports={
    postAppointment,
    getAppointments,
    updateAppointment,
    cancelAppointment,
}
