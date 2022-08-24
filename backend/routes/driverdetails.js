const router = require('express').Router();
let DriverDetail = require('../models/driverdetails.model');

router.route('/').get((req, res) => {
    DriverDetail.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const nric = req.body.nric;
    const dateoflicense = req.body.dateoflicense;
    const yearsofdriving = req.body.yearsofdriving;

    const newDriDetails = new DriverDetail({username: username, nric: nric, dateoflicense: dateoflicense, yearsofdriving: yearsofdriving});

    newDriDetails.save()
        .then(() => res.json('driver added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    DriverDetail.findById(req.params.id)
      .then(driver => {
        driver.username = req.body.username;
        driver.nric = req.body.nric;
        driver.dateoflicense = req.body.dateoflicense;
        driver.yearsofdriving = req.body.yearsofdriving;
        // user.email = Number(req.body.duration);
        // user.date = Date.parse(req.body.date);
  
        driver.save()
          .then(() => res.json('driver updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    DriverDetail.findByIdAndDelete(req.params.id)
    .then(() => res.json('user deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;