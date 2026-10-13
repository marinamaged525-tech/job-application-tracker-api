const jwt = require('jsonwebtoken')

const protect = async (req , res , next) => {
    try {
        // 1. Get the Authorization header
        const authHeader = req.headers.authorization

        // 2. Check whether the token was provided
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Authentication required. Please provide a token.'
            })
        }

        // 3. Extract the token
        const token = authHeader.split(' ')[1]

        // 4. Verify the token
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        // 5. Store the user's ID on the request
        req.user = {userId: decoded.userId}

        // 6. Continue to the route
        next()
        
    } catch (error) {
        console.error('Authentication error:', error.message)
        return res.status(401).json({
            message: 'Invalid or Expired Token'
        })
    }
}

module.exports = protect