const express = require('express');
const app = express();
const businessRoutes = express.Router();
const path = require('path');


// Require Business model in our routes module
let Business = require('../models/Business');

// http://localhost:4000/business/add  
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);

  // other way
  // business.save()
  //   .then(business => {
  //     res.status(200).json({'business': 'business in added successfully'});
  //   })
  //   .catch(err => {
  //   res.status(400).send("unable to save to database");
  //   });

  business.save(function (err, savedJob) {
    if (err) {
      return res.status(400).send("unable to save to database" + err);
    } else {
      return res.status(200).json({ 'business': 'business in added successfully' });
    }
  })
});

// http://localhost:4000/business 
businessRoutes.route('/').get(function (req, res) {
  ;
  Business.find(function (err, businesses) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business) {
    res.json(business);
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
  Business.findById(req.params.id, function (err, business) {
    if (!business)
      return next(new Error('Could not load Document'));
    else {
      business.person_name = req.body.person_name;
      business.business_name = req.body.business_name;
      business.business_gst_number = req.body.business_gst_number;

      business.save().then(business => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
  Business.findByIdAndRemove({ _id: req.params.id }, function (err, business) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

// add through html form
// http://localhost:4000/business/addbusiness
businessRoutes.route('/addbusiness').get(function (req, res) {
  res.sendFile(path.join(__dirname, '../public/add-business.html'));  // back out one level first:
});


businessRoutes.route('/addbusiness/:ownerId/owner').post((req, res) => {
  (new Business({ 'person_name': req.body.person_name, 'business_name': req.body.business_name, '_ownerId': req.params.ownerId }))
    .save()
    .then((student) => res.send(student))
    .catch((error) => console.log(error))
})


businessRoutes.route('/myclass/:myclassId/students').get((req, res) => {
  Business.find({ _classId: req.params.myclassId })
    .then((student) => res.send(student))
    .catch((error) => console.log(error))
})

businessRoutes.route('/myclass/:myclassId/students/:studentId').get((req, res) => {
  Business.findOne({ _classId: req.params.myclassId, _id: req.params.studentId })
    .then((onestudent) => res.send(onestudent))
    .catch((error) => console.log(error))
})

app.patch('/myclass/:myclassId/students/:studentId', (req, res) => {
  student.findOneAndUpdate({ '_id': req.params.myclassId, _id: req.params.studentId }, { $set: req.body })
    .then((student) => res.send(student))
    .catch((error) => console.log(error))
})

app.delete('/myclass/:myclassId', (req, res) => {
  const deleteStudents = (myclass) => {
    student.deleteMany({ '_id': req.params.myclassId })
      .then(() => myclass)
      .catch((error) => console.log(error))
  }
  myclass.findByIdAndDelete({ '_id': req.params.myclassId })
    .then((myclass) => res.send(deleteStudents(myclass)))
    .catch((error) => console.log(error))
})

// This responds to a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function (req, res) {  
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
})

// This response to a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) { 
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})


module.exports = businessRoutes;
