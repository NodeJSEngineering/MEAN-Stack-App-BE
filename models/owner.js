const mongoose = require('mongoose');


const Owner = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3
    },
    phone: {
        type: Number,
    },
},
    {
        collection: 'owner'
    })
const OwnerSchema = mongoose.model('owner', Owner);

module.exports = OwnerSchema
