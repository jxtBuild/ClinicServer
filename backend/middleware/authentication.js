//authentiction middleware
const Profile=require('../models/UserProfile');
const jwt=require('jsonwebtoken')
const { UnauthenticatedError,BadRequestError}=require('../errors')
const PasswordToken=require('../models/PasswordResetToken')


const verifyUser=async (req,res,next)=>{
   const authToken=req.headers.authorization
   if( !authToken || !authToken.startsWith('Bearer')){
    throw new UnauthenticatedError('Authentication Invalid')
   }
   const token=authToken.split(' ')[1]
    try {
      const payload=jwt.verify(token,process.env.JWT_SECRET)
       req.user={userId:payload.userId,firstname:payload.firstname}
       next()
    } catch (error) {
     // throw new UnauthenticatedError('Authentication Invalid')
      console.log(error);
    }
}



const VerifyReset=async (req,res,next)=>{
  console.log(req.query);
  //const {email,token}=req.query
  //if(!email || !token){
  //  throw new UnauthenticatedError('Please provide the details')
  //}
  //const user = await Profile.findOne({email})
  // if(!user){
  //      throw new UnauthenticatedError('User not available')
  // }
  // const resetToken = await PasswordToken.findOne({owner:user._id})
  // if(!resetToken){
  //   throw new Error ("Authentication Invalid")
  // }
  // const isMatch=await resetToken.compareToken(token)
  // if(!isMatch){
  //  throw new UnauthenticatedError('credentials invalid')
  // }
  // req.user=user
   next()
}

module.exports={
  verifyUser,
  VerifyReset,
};