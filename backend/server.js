const express=require('express')
const app=express()
const connection=require('./db/connection')
const port=process.env.PORT || 5000
const errorHandle=require('./middleware/error_handle')
require('dotenv').config()
const {verifyUser}=require('./middleware/authentication')
const pusher =require("./utils/Pusher")





//security on packages
const helmet=require('helmet')
const xss=require('xss-clean')
const cors=require('cors')


app.use(cors())
app.use(helmet())
app.use(xss())


app.use(express.json());




//routers
const authRoute=require('./routers/authRoute')
const appointmentRoute=require('./routers/bookAppointmentRoute');
const DashboardRoute=require('./routers/DashboardRoute')
const { default: mongoose } = require('mongoose')
//routes
app.use("/authentication",authRoute)
app.use("/appointment",verifyUser,appointmentRoute)
app.use("/dashboard",DashboardRoute);

//error Handler middleware
app.use(errorHandle)

app.get("/",(req,res)=>{
  res.send("hello")
})

app.listen(port,()=>{
    console.log("connected")
})


const start=async(req,res)=>{
    try
    {
      await connection(process.env.MONGO_URI)
      const changeStream = mongoose.connection.collection("appointments").watch()
      changeStream.on('change',(change)=>{
        pusher.trigger('appointments','newAppointment',{
           'change':change
        })
      })
    }
    catch(error){
      console.log("an error occured")
    }
}
start()





