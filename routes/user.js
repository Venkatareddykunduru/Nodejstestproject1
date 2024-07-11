const express = require('express');
const router = express.Router();

const usercontroller=require('../controllers/user.js');
router.post('/addreview',usercontroller.addreview);


module.exports=router;