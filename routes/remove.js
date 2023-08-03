const express = require('express')
const router = express.Router();

// controller
const removeController = require('../controller/removeController');

// for user request
// to remove bug
router.get('/removebug/:id',removeController.removeBug);
// to delete project
router.delete('/removeproject/:id',removeController.removeProject);




module.exports = router;