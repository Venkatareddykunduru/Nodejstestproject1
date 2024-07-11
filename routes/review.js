const express = require('express');
const router = express.Router();

const reviewcontroller=require('../controllers/review.js');
router.get('/getreviews/:companyname',reviewcontroller.getreviews);

module.exports=router;