const JobApplication = require('../models/JobApplication')

const createJobApplication = async (req , res) => {
    try {
        
    const jobApplication = await JobApplication.create({
        ...req.body ,
        user: req.user.userId
    })
    res.status(201).json({
        message: 'Job Application Created Successfully' ,
        data: jobApplication
    })
    } catch(error) {

        console.error('Create Job Application Error:', error.message)

        // Invalid data or failed schema validation
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Invalid Job Application Data'
            })
        }

        // Invalid MongoDB ID format, if applicable
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid Data Format'
            })
        }

        // Unexpected server or database error
        return res.status(500).json({
            message: 'Failed to create job application'
        })
    }
}


const getAllJobApplications = async (req, res) => {
    try {
        const filter = {
            user: req.user.userId
        }

        // Filter by status
        if (req.query.status) {
           const allowedStatuses = [
            'Applied',
            'Not Applied',
            'Offer',
            'Interview',
            'Accepted',
            'Rejected'
        ]

           if (!allowedStatuses.includes(req.query.status)) {
             return res.status(400).json({
               message: 'Invalid status filter',
               allowedStatuses
            })
         }

         filter.status = req.query.status
}

        // Search by company name
        if (req.query.search) {
            filter.companyName = {
                $regex: req.query.search,
                $options: 'i'
            }
        }


// Sorting
let sortOption = { createdAt: -1 };

if (req.query.sort) {
    if (!['newest', 'oldest'].includes(req.query.sort)) {
        return res.status(400).json({
            message: 'Invalid sort option',
            allowedSortOptions: ['newest', 'oldest']
        });
    }

    if (req.query.sort === 'oldest') {
        sortOption = { createdAt: 1 };
    }
}

        // Pagination
// Pagination validation
const page = Number(req.query.page ?? 1);
const limit = Number(req.query.limit ?? 5);

if (
    !Number.isInteger(page) ||
    page < 1 ||
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 100
) {
    return res.status(400).json({
        message: 'Invalid pagination parameters',
        details: 'Page must be a positive integer, and limit must be an integer between 1 and 100.'
    });
}

const skip = (page - 1) * limit;
        // Retrieve results and total count
        const [jobApplications, total] = await Promise.all([
            JobApplication.find(filter)
                .sort(sortOption)
                .skip(skip)
                .limit(limit),
            JobApplication.countDocuments(filter)
        ])

        res.status(200).json({
            count: jobApplications.length,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data: jobApplications
        })
    } catch (error) {
        console.error('Get All Job Applications Error:', error.message)

        res.status(500).json({
            message: 'Failed To Retrieve Job Applications'
        })
    }
}

const getJobApplicationByID = async (req , res) => {
    try {
        const jobApplication = await JobApplication.findOne({
            _id: req.params.id ,
            user: req.user.userId
        })

        if(!jobApplication) {
            return res.status(404).json({
                message: "Job Application Not Found"
            })
        }

        res.status(200).json({
            data: jobApplication
        })
    } catch (error) {
        console.error('Get Job Application Error:', error.message)

        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid job application ID'
            })
        }

        res.status(500).json({
            message: 'Failed to retrieve job application'
        })
    }
}

const updateJobApplication = async (req , res) => {
    try {
        const jobApplication = await JobApplication.findOneAndUpdate({
            _id: req.params.id ,
            user: req.user.userId
            } ,
             req.body ,
              {
                new: true ,
                runValidators: true
            })

        if(!jobApplication) {
            return res.status(404).json({
                message: "Job Application Not Found"
            })
        }

        res.status(200).json({
            message: "Job Application Updated Successfully" ,
            data: jobApplication
        })
    } catch (error) {
    console.error('Update Job Application Error:', error.message)

    if (error.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid job application ID'
        })
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Invalid Job Application Data'
        })
    }

    return res.status(500).json({
        message: 'Failed to update job application'
    })
}}


const deleteJobApplication = async (req , res) => {
    try {
        const jobApplication = await JobApplication.findOneAndDelete({
            _id: req.params.id ,
            user: req.user.userId 
        })

        if(!jobApplication) {
            return res.status(404).json({
                message: "Job Application Not Found"
            })
        }

        res.status(200).json({
            message: "Job Application Deleted Successfully" ,
            data: jobApplication
        })
    } catch (error) {
    console.error('Delete Job Application Error:', error.message)

    if (error.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid job application ID'
        })
    }

    return res.status(500).json({
        message: 'Failed to delete job application'
    })
}
}


module.exports = {
    createJobApplication ,
    getAllJobApplications ,
    getJobApplicationByID ,
    updateJobApplication ,
    deleteJobApplication
}