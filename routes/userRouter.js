const UserRouter = require ('express');
const userController = require('../controllers/userController');

const router = new UserRouter()

router.post('/user', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)

module.exports = router