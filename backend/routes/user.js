const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const address = req.body.address;

    const newUser = new User({username: username, password: password, email: email, address: address});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.address = req.body.address;
        // user.email = Number(req.body.duration);
        // user.date = Date.parse(req.body.date);
  
        user.save()
          .then(() => res.json('user updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('user deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;