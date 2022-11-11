const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');

const VerifyToken=new mongoose.Schema({
 owner:{
    type: mongoose.Types.ObjectId,
    ref:'Profile',
    required:true
  },
  OneTimePassword:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    expires:'5m',
    default:Date.now()
  }
})

VerifyToken.pre("save",async function(){
    const salt = await bcrypt.genSalt(10)
  this.OneTimePassword = await bcrypt.hash(this.OneTimePassword, salt)
})


VerifyToken.methods.compareToken = async function (canditateToken) {
  const isMatch = await bcrypt.compare(canditateToken, this.OneTimePassword)
  return isMatch
}


module.exports=mongoose.model("Verification",VerifyToken)