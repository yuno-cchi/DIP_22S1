const router = require('express').Router();
let Drive = require('../models/drive.model');

router.route('/').get((req, res) => {
  Drive.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const routeUserID = req.body.routeUserID;
  const startName = req.body.startName;
  const start = req.body.start;
  const destination = req.body.destination;
  const destinationName = req.body.destinationName;
  const date = req.body.date;
  const price = req.body.price;
  const centroid = req.body.centroid;
  const selected = req.body.selected;
  const routeIdPair = req.body.routeIdPair;

  const newRide = new Drive({ routeUserID: routeUserID, startName: startName, start: start, destinationName: destinationName, destination: destination, date: date, price: price, centroid: centroid, selected: selected, routeIdPair: routeIdPair});

  newRide.save()
    .then(response => res.json(response))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  Drive.findById(req.params.id)
    .then(driver => {
      driver.routeUserID = req.body.routeUserID;
      driver.startName = req.body.startName;
      driver.start = req.body.start;
      driver.destinationName = req.body.destinationName;
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