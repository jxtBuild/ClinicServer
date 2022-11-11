/*
    This notifies client that they have an 
    appointment on particular day
 */
const cron=require("cron").CronJob
const sendEmail = require('./sendEmail');
const appointments = require("../models/Appointment")
const Profile =require("../models/UserProfile")

const sendMessage =async({name,email,date,time})=>{
        return sendEmail({
    to: email,
    subject: 'Appointment Remainder',
    html: `<h4> Hello, ${name}</h4>
     You have a scheduled appointment
     on ${date} at ${time}
    `,
    });
}

const DateFunction =()=>{
const Month =new Date().getMonth()+1
const Year = new Date().getFullYear()
let Day = new Date().getDate()
let days;
  if(Day<10){
    days = "0"+Day
  }
    const F_Date = Year+"-"+Month+"-"+days
    return F_Date
}

const AppointmentNotify=async()=>{
  const notifyDay=DateFunction()
  const found=await appointments.find({
  date:notifyDay
 })
   sendNotification(found)
}

const sendNotification =async(details)=>{
details.forEach(async(element)  => {
    if(element.status != "canceled"){
 sendMessage({
   name:element.name,
   email:element.email,
   date:element.date,
   time:element.time
 })
    }
  });
}
;

const Month = new Date().getDate();
const Day = new Date().getDate();

  var job=new cron(
    	`00 00 01 ${Day} ${Month} *`,
      AppointmentNotify(),
      null,
      true  
  )

  job.start()




