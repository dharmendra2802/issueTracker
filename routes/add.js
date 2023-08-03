const express = require('express')
const router = express.Router();

// controller
const addController = require('../controller/addController');

router.post('/addProject',addController.addProject);
router.post('/addBug',addController.addBug);


module.exports = router;