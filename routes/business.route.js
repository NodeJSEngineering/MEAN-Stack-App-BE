const express = require('express');
const businessRoutes = express.Router();
const path = require('path');

// Require Business model in our routes module
let Business = require('../models/Business');

businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);

  // Another way
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

businessRoutes.route('/').get(function (req, res) {
  Business.find(function (err, businesses) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business) {
    res.json(business);
  });
});

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

businessRoutes.route('/delete/:id').get(function (req, res) {
  Business.findByIdAndRemove({ _id: req.params.id }, function (err, business) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

businessRoutes.route('/addbusiness').get(function (req, res) {
  res.sendFile(path.join(__dirname, '../public/add-business.html'));  // path:back out one level first
});

businessRoutes.route('/addbusiness/:ownerId/owner').post((req, res) => {
  (new Business({ 'person_name': req.body.person_name, 'business_name': req.body.business_name, '_ownerId': req.params.ownerId }))
    .save()
    .then((newBuzz) => res.send(newBuzz))
    .catch((error) => console.log(error))
})

// Get data of all businesses on the basis of ownerID
businessRoutes.route('/owner/:ownerId/business').get(async (req, res) => {

  // To check JSON data of Business
  // const items = await Business.find().lean().exec(); // .exec() returns a true Promise
  // res.json({items});
  // console.log(req.params.ownerId, items)

  Business.find({ _ownerId: req.params.ownerId })
    .then((buzz) => res.send(buzz))
    .catch((error) => console.log(error))
})

// Get specific business on the basis of ownerID and businessID
businessRoutes.route('/owner/:ownerId/business/:businessId').get((req, res) => {
  Business.findOne({ _ownerId: req.params.ownerId, _id: req.params.businessId })
    .then((res) => res.send(res))
    .catch((error) => console.log(error))
})

// update specific business on the basis of ownerID and businessID
businessRoutes.patch('/owner/:ownerId/business/:businessId', (req, res) => {
  Business.findOneAndUpdate({ _ownerId: req.params.ownerId, _id: req.params.businessId }, { $set: req.body })
    .then((buzz) => res.send(buzz))
    .catch((error) => console.log(error))
})

// delete specific business of owner
businessRoutes.delete('/owner/:ownerId/business/:businessId', (req, res) => {
  Business.findOneAndDelete({ _id: req.params.businessId, _ownerId: req.params.ownerId }).then((buzz) => res.send(buzz))
    .catch((error) => console.log(error))
})

// This responds to a GET request for abcd, abxcd, ab123cd, and so on
businessRoutes.get('/ab*cd', function (req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send('Page Pattern Match');
})

businessRoutes.delete('/del_user', function (req, res) {
  console.log("Got a DELETE request for /del_user");
  res.send('Hello DELETE');
})


module.exports = businessRoutes;
