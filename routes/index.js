const express = require('express')
const router = express.Router();

// controller
const homeController = require('../controller/homeController');

// for user request
router.use('/user/',require('./user'));


router.get('/',homeController.home);


module.exports = router;