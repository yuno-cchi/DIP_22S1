const router = require('express').Router();
let Ride = require('../models/driverdetails.model');

router.route('/').get((req, res) => {
    Ride.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const from = req.body.from;
    const destination = req.body.destination;
    const numpassengers = req.body.numpassengers;
    const price = req.body.price;

    const newRide = new Ride({username: username, from: from, destination: destination, numpassengers: numpassengers, price: price});

    newRide.save()
        .then(() => res.json('ride added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    Ride.findById(req.params.id)
      .then(driver => {
        driver.username = req.body.username;
        driver.from = req.body.from;
        driver.destination = req.body.destination;
        driver.numpassengers = req.body.numpassengers;
        driver.price = req.body.price;
        
  
        driver.save()
          .then(() => res.json('ride updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    Ride.findByIdAndDelete(req.params.id)
    .then(() => res.json('ride deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;