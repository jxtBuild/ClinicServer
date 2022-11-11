//middleware to handle some errors
const {CustomAPIError}=require('../errors')
const {StatusCodes}=require('http-status-codes')

const errorHandle=(err,req,res,next)=>{
     let customError={
      statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      message:err.message || "Somemthing went wrong try again later"
     }
  //   if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).send({ msg: err.message })
  //}
   if(err.code && err.code ===11000){
    customError.msg=`Duplicate value enterd for ${Object.keys(err.keyValue)}`
    customError.statusCode=400
   }
  //res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again latter')
  res.status(customError.statusCode).json({msg:customError.message})
}

module.exports=errorHandle;