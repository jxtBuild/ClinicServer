const express=require('express');
const router=express.Router();
const {
    register,
    login,
    PasswordRecovery,
    VerifyEmail,
    resetPassword,
}=require('../controllers/authentication');
const { workerRegister, workerLogin } = require('../controllers/workersAuthentication');
const {
    VerifyReset,
}=require("../middleware/authentication");


router.post("/register",register);
router.post("/login",login);
router.post("/worker-login",workerLogin)
router.post("/worker-register",workerRegister)
//router.post("/passwordchange",PasswordRecovery)
router.post("/reset-Password",VerifyReset,resetPassword)
router.post("/verification",VerifyEmail);










module.exports=router;