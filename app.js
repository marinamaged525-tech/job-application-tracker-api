require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const jobApplicationRoutes = require('./routes/jobApplicationRoutes')
const authRoutes = require('./routes/authRoutes')
const protect = require('./middleware/authMiddleware');

const app = express()

app.use(express.json())
app.use('/api/applications' , protect , jobApplicationRoutes)
app.use('/api/auth' , authRoutes)


app.get('/', (req, res) => {
    res.json({
        message: 'Job Application Tracker API is running!'
    })
})


const PORT = process.env.PORT || 4000
const startServer = async () => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}
startServer();