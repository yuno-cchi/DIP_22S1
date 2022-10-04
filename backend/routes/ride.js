const router = require('express').Router();
let Ride = require('../models/ride.model');

router.route('/').get((req, res) => {
  Ride.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const routename = req.body.routename;
  const start = req.body.start;
  const destination = req.body.destination;
  const date = req.body.date;
  const price = req.body.price;
  const centroid = req.body.centroid;

  const newRide = new Ride({ routename: routename, start: start, destination: destination, date: date, price: price, centroid: centroid });

  newRide.save()
    .then(() => res.json('ride added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  Ride.findById(req.params.id)
    .then(driver => {
      driver.routename = req.body.routename;
      driver.start = req.body.start;
      driver.destination = req.body.destination;
      driver.date = req.body.date;
      driver.price = req.body.price;
      driver.centroid = req.body.centroid;


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