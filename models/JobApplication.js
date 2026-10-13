const mongoose = require('mongoose')

const jobApplicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        } ,
        companyName: {
            type: String ,
            required: [true, 'Company name is required'],
            trim: true ,
            minlength: [2, 'Company name must be at least 2 characters']
        } ,
        jobTitle: {
            type: String ,
            required: [true, 'Job title is required'],
            trim: true ,
            minlength: [2, 'Job title must be at least 2 characters']
        } ,
        status: {
            type: String ,
            enum: ['Applied' , 'Not Applied' , 'Offer' , 'Interview' , 'Accepted' , 'Rejected'] ,
            default: "Applied"
        } ,
        applicationDate: {
            type: Date ,
            default: Date.now
        } ,
        jobUrl: {
            type: String ,
            trim: true ,
            validate: {
              validator: function (value) {
                return !value || /^https?:\/\/.+\..+/.test(value)
              },
              message: 'Please provide a valid job URL'
    }
        } ,
        notes: {
            type: String ,
            trim: true
        } 
    },
        {
            timestamps: true
        }
)

const jobApplication = mongoose.model('jobApplication' , jobApplicationSchema)

module.exports = jobApplication