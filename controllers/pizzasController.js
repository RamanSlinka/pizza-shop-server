const ApiError = require('../error/ApiError');
const Pizza = require('../models/Pizza')
const config = require("config");


class pizzasController {
    async create(req, res) {

        // const {imageUrl, name, types, sizes, price, category, rating} = req.body
        const pizza = new Pizza({
            imageUrl: req.body.imageUrl,
            name: req.body.name,
            types: req.body.types,
            sizes: req.body.sizes,
            price: req.body.price,
            category: req.body.category,
            rating: req.body.rating
        })

        await pizza.save()
        return res.json(pizza)
    }

    async getAll(req, res) {
        // try {
        //     const {sort} = req.query
        //     let pizzas
        //     switch (sort) {
        //         case "name":
        //             pizzas = await Pizza.find().sort({name: 1})
        //             break
        //         case "price":
        //             pizzas = await Pizza.find().sort({price: 1})
        //             break
        //         case "rating":
        //             pizzas = await Pizza.find().sort({rating: 1})
        //             break
        //     }
        //     return res.json(pizzas)
        // } catch (e) {
        //     console.log(e)
        //     return res.status(500).json({message: `Can't get pizzas... `})
        // }


        const pizzas = await Pizza.find()
        // const pizzas = await config.get('pizzas')
        return res.json(pizzas)
    }

    async getOne(req, res) {
        // const {id} = req.query
      Pizza
          .findById(req.params.id)
          .then(() => res.json(req.query))
          .catch((e) => {
              console.log(e);
              res.json ({message: 'Error'})
          })
    }

    async filterPizzas(req, res) {
        try {
            const searchName = req.query.search
            let files = await Pizza.find()
            files = files.filter(file => file.category.includes(searchName))
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Search error"})
        }
    }

}

module.exports = new pizzasController()