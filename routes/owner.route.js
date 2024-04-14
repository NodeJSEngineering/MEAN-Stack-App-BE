const express = require('express');
const ownerRoutes = express.Router();
let Owner = require('../models/owner');
let Business = require('../models/Business');

ownerRoutes.route('/addOwner').post((req, res) => {
  (new Owner({ 'name': req.body.name, 'phone': req.body.phone }))
    .save()
    .then((owner) => res.send(owner))
    .catch((error) => console.log(error))
})

ownerRoutes.route('/').get(function (req, res) {
  Owner.find(function (err, businesses) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

ownerRoutes.route('/:ownersId').get((req, res) => {
  Owner.findOne({ _id: req.params.ownersId })
    .then(owner => res.send(owner))
    .catch((error) => console.log(error))
})


ownerRoutes.route('/:ownerId').patch((req, res) => {
  Owner.findOneAndUpdate({ '_id': req.params.ownerId }, { $set: req.body })
    .then((owner) => res.send(owner))
    .catch((error) => console.log(error))
})

// delete owner and there businesses
ownerRoutes.delete('/:ownerId', (req, res) => {
  const deleteStudents = () => {
    Business.deleteMany({ _ownerId: req.params.ownerId })
      .then(() =>{  res.send('deleted')})
      .catch((error) => console.log(error))
  }

  Owner.findByIdAndDelete({ '_id': req.params.ownerId })
    .then((resp) => res.send(deleteStudents()))
    .catch((error) => console.log(error))
})

module.exports = ownerRoutes;
