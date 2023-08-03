const express = require('express')
const router = express.Router();
const passport = require('passport')
// controller
const userController = require('../controller/userController');

// page redirect
router.use('/page',require('./page'))
router.use('/add',require('./add'))
router.use('/remove',require('./remove'));

// for signup/related
router.get('/signup',userController.signup);
router.post('/createUser',userController.createUser);

// destroy session
router.get('/destroy',userController.destroy);


// signin related/ local auth
router.get('/signin',userController.signin);
router.post('/createSession',passport.authenticate(
    'local',
    {
        failureRedirect: '/user/signin'
    }
),userController.createSession);


module.exports = router;