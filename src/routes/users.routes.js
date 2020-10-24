const { Router } = require('express')
const router = Router()

const { register, login, logout, changePassword } = require('../controllers/users.cosntroller')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/change-password', changePassword)

module.exports = router