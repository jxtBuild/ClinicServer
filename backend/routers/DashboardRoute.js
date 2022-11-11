const express =require("express")
const {
    getAllAppointment, searchAppointment
 } = require("../controllers/AdminControllers")
const router = express.Router()




router.get("/appointment",getAllAppointment);
router.post("/appointment:search",searchAppointment)


module.exports=router