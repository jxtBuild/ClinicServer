const Profile=require('../models/UserProfile');
const Verification=require('../models/UserVerification')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError}=require('../errors');
const PasswordToken=require('../models/PasswordResetToken')
const crypto=require('crypto')
const sendVerificationEmail=require('../utils/sendVerificationEmail')
const sendResetPassswordEmail=require('../utils/sendResetPasswordEmail')




const register=async (req,res)=>{
   const {email}=req.body.email
    const search=await Profile.findOne({email})
    if(search){
      throw new BadRequestError('A user with this email already exist')
    } 
   const user = await Profile.create(req.body)
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
    const user =await Profile.findOne({userId})
       if (!user) {
    throw new UnauthenticatedError('User not found');
      }
    const token =await Verification.findOne({owner:user._id})
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


const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await Profile.findOne({email})
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  //compare password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
   
  const token = user.createJWT()
 // req.session.isAuth=true
  res.status(StatusCodes.OK).json({ user: { name: user.firstname }, token })
}





//const PasswordRecovery= async (req,res)=>{
//  const {email}=req.body
//  if(!email){
//    throw new BadRequestError('Invalid Credentials')
//  }
//  const userAccount= await Profile.findOne({email:email})
//   if(!userAccount){
//    throw new UnauthenticatedError('Invalid Credentials')
//   }
//   if(userAccount){
//    const passwordToken = crypto.randomBytes(30).toString('hex');
//    const origin="https://starclinc.firebaseapp.com/PasswordReset.html"
//    sendResetPassswordEmail({
//      name:userAccount.firstname,
//      email:userAccount.email,
//      token:passwordToken,
//      origin
//    })
//  await PasswordToken.create({owner:userAccount._id,resetToken:passwordToken})
//   }
//   res.json({msg:"Please check your email account for a Password reset link"})
//}


const resetPassword=async(req,res)=>{
   res.json({msg:"change password"})
}

module.exports={
    register,
    login,
    //PasswordRecovery,
    VerifyEmail,
    resetPassword
}