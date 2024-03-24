const mongoose = require('mongoose');


const OwnerSchema = new mongoose.Schema({
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
const Classs = mongoose.model('owner', OwnerSchema)


module.exports = Classs

