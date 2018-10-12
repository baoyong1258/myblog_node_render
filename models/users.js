const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    avator: String,
    gender: {
        type: String,
        default: 'x'
    },
    bio: String
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;