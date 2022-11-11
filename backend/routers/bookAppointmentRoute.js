const express=require('express');
const router=express.Router();
const {
    postAppointment,
    getAppointments,
    updateAppointment,
    cancelAppointment
}=require('../controllers/AppointmentBooking')




router.post('/page',postAppointment)
router.get('/',getAppointments)
router.patch("/:id",updateAppointment)
router.delete("/:id",cancelAppointment)





module.exports=router;