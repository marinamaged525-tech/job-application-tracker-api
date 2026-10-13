const express = require('express')
const router = express.Router()

const { createJobApplication , getAllJobApplications , getJobApplicationByID, updateJobApplication , deleteJobApplication} = require('../controllers/jobApplicationControllers')


router.post('/' , createJobApplication)
router.get('/' , getAllJobApplications)
router.get('/:id' , getJobApplicationByID)
router.put('/:id' , updateJobApplication)
router.delete('/:id' , deleteJobApplication)


module.exports = router