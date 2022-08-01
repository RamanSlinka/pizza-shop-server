const   mongoose = require ('mongoose');
const {Schema, model} = mongoose;

const Pizza = new Schema({
    imageUrl:  String,
    name: {type: String, required: true},
    types: [Number],
    sizes: [ Number],
    price:  Number,
    category:  String,
    rating: Number
})

module.exports = model('Pizza',  Pizza)

