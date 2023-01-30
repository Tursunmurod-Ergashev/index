const {Schema, model} = require('mongoose');
const user =  new Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true 
    },
    email: String,
    password: { type: String },
})
module.exports = model('users', user)