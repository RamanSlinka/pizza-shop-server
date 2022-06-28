const PizzasRouter = require ('express');
const pizzasController = require('../controllers/pizzasController');
const router = new PizzasRouter();
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/pizza',checkRole('ADMIN'), pizzasController.create)
router.get('/pizzas', pizzasController.getAll)
// router.get('/pizzas/:id', pizzasController.getOne)

module.exports = router