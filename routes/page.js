const express = require('express')
const router = express.Router();
const passport = require('passport')
// controller
const pageController = require('../controller/pageController');

// for signup/related
router.get('/mainPage',passport.checkAuthentication,pageController.main);
// for project page
router.get('/projectPage',pageController.project);
// router.get('/projectPage/searchby/',pageController.searchBy);


module.exports = router;