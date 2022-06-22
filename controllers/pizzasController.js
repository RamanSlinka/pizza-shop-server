const ApiError = require('../error/ApiError');
const Pizza = require('../models/Pizza')
const config = require("config");


class pizzasController {
    async create(req, res) {

        // const {imageUrl, name, types, sizes, price, category, rating} = req.body
        const pizza = new Pizza ({imageUrl : req.body.imageUrl,
            name: req.body.name,
            types: req.body.types,
            sizes: req.body.sizes,
            price: req.body.price,
            category: req.body.category,
            rating: req.body.rating})

         await pizza.save()
        return res.json(pizza)
    }

    async getAll(req, res) {
      const pizzas =await config.get('pizzas')
        return res.json(pizzas)
    }

    // async getOne(req, res, next) {
    //     const {id} = req.query
    //     if (!id) {
    //         return next(ApiError.bedRequest('not ID'))
    //     }
    //     res.json(id)
    // }
}

module.exports = new pizzasController()