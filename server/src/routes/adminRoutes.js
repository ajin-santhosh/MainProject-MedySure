const express = require('express');
const router = express.Router();
const adminController = require("../controller/adminController")

router.post('/createAdmin', adminController.createAdmin)  
router.put('/updateAdmin/:userId',adminController.updateAdmin)
router.get('/getAdmins',adminController.getAdmins)
router.delete('/deleteAdmin/:userId',adminController.deleteAdmin)
router.get('/export-adminData',adminController.exportCsvAdmin)
router.get('/export-doctorData',adminController.exportCsvDoctors)
router.get('/export-patientData',adminController.exportCsvPatient)
router.get('/export-patientData',adminController.exportCsvPatient)
router.get('/export-appointmentData',adminController.exportCsvAppointments)
router.get('/export-reportData',adminController.exportCsvReports)
router.get('/export-feedbackData',adminController.exportCsvFeedbacks)
router.get('/export-paymentData',adminController.exportCsvPayments)

module.exports = router