const mongoose = require('mongoose');
const validator = require('validator');

delete mongoose.connection.models['Customers'];

const users = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
        trim: true
    },
    email : {
        type : String,
        required : true,
        lowercase: true,
        unique : true,
        validate : {
            validator : function(value){
                return validator.isEmail(value)
            },
            message : 'Email is not valid!!'
        }
    },
    password : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validator.isStrongPassword(value);
            },
            message : 'password is not strong!!'
        }
    },
    gender : {
        type : String,
        enum : {
            values : ['male', 'female', 'others'],
            message : 'gender is not valid'
        }
    },
    photoURL : {
        type : String,
        default : 'https://cdn.pixabay.com/photo/2013/07/12/14/36/man-148582_1280.png'
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clothes'
    }]
},{timestamps: true});

const user = mongoose.model('Customers', users);
module.exports = user;