const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');

const PasswordToken=new mongoose.Schema({
 owner:{
    type: mongoose.Types.ObjectId,
    ref:'Profile',
    required:true
  },
  resetToken:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    expires:'15m',
    default:Date.now()
  }
})

PasswordToken.pre("save",async function(){
    const salt = await bcrypt.genSalt(10)
  this.resetToken = await bcrypt.hash(this.resetToken, salt)
})

PasswordToken.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.firstname },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  )
}

PasswordToken.methods.compareToken= async function (canditateToken) {
  const isMatch = await bcrypt.compare(canditateToken, this.resetToken)
  return isMatch
}


module.exports=mongoose.model("PasswordToken",PasswordToken)