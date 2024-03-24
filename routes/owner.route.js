const express = require('express');
const app = express();
const ownerRoutes = express.Router();
let Owner = require('../models/owner');

// http://localhost:4000/owner/addOwner/ 
ownerRoutes.route('/addOwner').post((req, res) => {
  (new Owner({ 'name': req.body.name, 'phone': req.body.phone }))
    .save()
    .then((myclass) => res.send(myclass))
    .catch((error) => console.log(error))
})

// http://localhost:4000/owner/ 
ownerRoutes.route('/').get(function (req, res) {
  ;
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
    .then(myclass => res.send(myclass))
    .catch((error) => console.log(error))
})


ownerRoutes.route('/:ownerId').patch((req, res) => {
  Owner.findOneAndUpdate({ '_id': req.params.ownerId }, { $set: req.body })
    .then((myclass) => res.send(myclass))
    .catch((error) => console.log(error))
})

app.delete('/myclass/:myclassId/students/:studentId', (req, res) => {
  student.findOneAndDelete({ _id: req.params.studentId, _classId: req.params.myclassId }).then((student) => res.send(student))
    .catch((error) => console.log(error))
})

module.exports = ownerRoutes;
