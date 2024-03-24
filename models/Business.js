const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Business = new Schema({
  person_name: {
    type: String
  },
  business_name: {
    type: String
  },
  business_gst_number: {
    type: Number
  },

  // _ownerId:{
  //   type: mongoose.Types.ObjectId,
  //   required: true
  //   }
},{
    collection: 'business'
});

module.exports = mongoose.model('Business', Business);