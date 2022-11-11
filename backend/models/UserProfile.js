const mongoose=require('mongoose')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const ProfileSchema=new mongoose.Schema({
  firstname:{
    type:String,
    required:[true,'please provide a name']
  },
  lastname:{
    type:String,
    required:[true,'please provide your lastname'],
  },
  gender:{
    type:String,
    required:[true,'please provide your gender']
  },
 email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password:{
    type:String,
    required:[true,'please provide your password'],
    minlength:8,
    unique:true
  },
  verified:{
    type:Boolean,
    required:true,
    default:false
  },
  status:{
     type:String,
     required:[true,'Please provide your status'],
     enum:['Patient','worker'],
     default:'Patient'
  }
})
//hashing of the password is done here
ProfileSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})



ProfileSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  )
}

ProfileSchema.methods.GenerateOTP=function (){
    let otp=""
      for(i=0;i<=3;i++){
       let rand= Math.floor(Math.random()*9)
       otp+=rand
      }
      return otp
}

ProfileSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}



module.exports=mongoose.model('Profile',ProfileSchema)