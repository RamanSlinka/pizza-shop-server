const PizzasRouter = require ('express');
const pizzasController = require('../controllers/pizzasController');

const router = new PizzasRouter()

router.post('/pizza', pizzasController.create)
router.get('/pizzas', pizzasController.getAll)
// router.get('/pizzas/:id', pizzasController.getOne)

module.exports = router