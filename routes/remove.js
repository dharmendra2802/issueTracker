const express = require('express')
const router = express.Router();

// controller
const removeController = require('../controller/removeController');

// for user request

router.get('/removebug/:id',removeController.removeBug);
router.delete('/removeproject/:id',removeController.removeProject);




module.exports = router;