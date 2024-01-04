const express = require('express');
const category = express.Router();

const { addnewcategory ,categorylist,updatecategory} = require('../../controller/category/category')

category.post('/addnewcategory',addnewcategory)
category.get('/categorylist',categorylist)
category.put('/updatecategory',updatecategory)

module.exports = category; 