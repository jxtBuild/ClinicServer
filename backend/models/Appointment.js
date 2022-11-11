//creating the appointment model
const mongoose=require('mongoose');
const { v4: uuidv4 } = require('uuid');

const appointmentId=uuidv4().split('-')[0]

const appointmentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,   
    },
    email:{
        type:String
    },
    service:{
        type:String
    },
    phone:{
        type:String,
        minlength:10,
        maxlength:10,
    },
    date:{
        type:String,
        required:true,
        trim:true
    },
    time:{
        type:String,
        trim:true
    },
    doctor:{
        type:String
    },
    status:{
        type:String,
        enum:['pending','canceled','attended'],
        default:'pending'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please provide user'],
    },
    appointmentId:{
        type:String,
        default:appointmentId
    }
},{timestamps:true});

module.exports=mongoose.model('appointments',appointmentSchema);