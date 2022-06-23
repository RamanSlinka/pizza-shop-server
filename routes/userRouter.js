const UserRouter = require ('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')
const router = new UserRouter()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router