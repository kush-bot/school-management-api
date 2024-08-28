const express=require('express');
const {insertSchool,listSchool} = require('../contoller/schoolController.js');
const router=express.Router();

router.post('/addSchool',insertSchool);
router.get('/listSchool',listSchools);

module.exports=router;

