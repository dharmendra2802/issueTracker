const express = require('express')
const router = express.Router();

// controller
const addController = require('../controller/addController');

// to add project
router.post('/addProject',addController.addProject);
// to add bug
router.post('/addBug',addController.addBug);


module.exports = router;