const jwt = require('jsonwebtoken')

checkPermission = async (req,res,next) => {
    const token = req.headers['x-access-token']
    if (!token)( res.status(202).json({ success: false, message: 'No token' }) )

    const { id } = await jwt.verify(token, process.env.JWT_SECRET)
    req.userID = id
    next()
}

module.exports = { checkPermission }