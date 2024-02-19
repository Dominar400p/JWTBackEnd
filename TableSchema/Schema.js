let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true
    },

    email: {
        type: String,
        unique: true,
        required : true
    },

    password: {
        type: String,
        required : true
    },

    confirmpassword: {
        type: String,
        required : true

    }
})

module.exports = mongoose.model('user', userSchema)