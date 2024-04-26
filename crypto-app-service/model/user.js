const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    uName: {
        type: String,
        maxlength:50,
        unique: 1
    },

    uEmail: {
        type:String,
        trim: true,
        unique: 1
    },

    uPw: {
        type:String,
        minlength:5
    },

    date : {
        type:Date,
        default:Date.now()
    },

    token : {
        type: String
    }

});





const User = mongoose.model('Users', userSchema);
module.exports = {User};