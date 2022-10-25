const router = require('express').Router();
let Drive = require('../models/drive.model');

router.route('/').get((req, res) => {
  Drive.find()
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
  const selected = req.body.selected;
  const routeIdPair = req.body.routeIdPair;

  const newRide = new Drive({ routename: routename, start: start, destination: destination, date: date, price: price, centroid: centroid, selected: selected, routeIdPair: routeIdPair});

  newRide.save()
    .then(response => res.json(response))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  Drive.findById(req.params.id)
    .then(driver => {
      driver.routename = req.body.routename;
      driver.start = req.body.start;
      driver.destination = req.body.destination;
      driver.date = req.body.date;
      driver.price = req.body.price;
      driver.centroid = req.body.centroid;
      driver.selected = req.body.selected;
      driver.routeIdPair = req.body.routeIdPair;


      driver.save()
        .then(() => res.json('ride updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
  Drive.findByIdAndDelete(req.params.id)
    .then(() => res.json('ride deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;