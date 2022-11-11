const workers = require("../models/WorkerProfile")
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError}=require('../errors');
const crypto=require('crypto')
const sendVerificationEmail=require('../utils/sendVerificationEmail')
const sendResetPassswordEmail=require('../utils/sendResetPasswordEmail')





const workerLogin=async(req,res)=>{
  const {email,password}=req.body
   const user = await workers.findOne({email})
    if(!user){
       throw new UnauthenticatedError('User not found')
    }
     const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.firstname }, token })
}

const workerRegister=async(req,res)=>{
  const {email}=req.body
  const isExist = await workers.findOne({email})
  if(isExist){
     throw new BadRequestError('A user with this email already exist')
  }
  const user = await workers.create({...req.body})
   const OTP=user.GenerateOTP()
   const createOTP= await Verification.create({owner:user._id,OneTimePassword:OTP})
    user.createJWT()
     sendVerificationEmail({
      name:user.firstname,
      email:user.email,
      verificationToken:OTP
    })
   res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email account for a verification token'
  });

}

const VerifyEmail=async (req,res)=>{
   const {userId,OTP}=req.body
    if(!userId || !OTP){
      throw new BadRequestError("Please provide the details")
    }
    const user =await workers.findOne({userId})
       if (!user) {
    throw new UnauthenticatedError('User not found');
      }
   // const token =await Verification.findOne({owner:user._id})
    if(!token){
      throw new BadRequestError("token is not valid")
    }
    const isMatch = await token.compareToken(OTP)
    if(!isMatch){
      throw new UnauthenticatedError("token verification failed")
    }
    user.verified=true;
    await Verification.findOneAndDelete(token.id)
    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
  }

module.exports={
    workerLogin,
    workerRegister,
    VerifyEmail
}