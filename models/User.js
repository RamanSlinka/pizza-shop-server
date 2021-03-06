const   mongoose = require ('mongoose');
const {Schema, model} = mongoose;

const User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, defaultValue: 'USER'},
})

module.exports = model('User',  User)

